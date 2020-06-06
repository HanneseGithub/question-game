const path = require('path');

const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SvgStorePlugin = require('external-svg-sprite-loader');
const FractalModuleResolver = require('@gotoandplay/fractal-module-resolver-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fractal = require('./fractal.config.js');
const tsconfig = require('./tsconfig.json');
const pkg = require('./package.json');
const FractalPlugin = require('./packages/fractal-webpack-plugin');
const TSConfigGenerator = require('./packages/tsconfig-generator-plugin');

/**
 * gotoAndReact class
 */
class gotoAndReact {
    constructor(env) {
        this.options = {
            app: false,
            path: '/',
            production: false,
            styleguide: false,
            ...env,
        };

        return this.getCompilers();
    }

    getCompilers() {
        const compilers = [];

        if (this.options.styleguide) {
            compilers.push(this.getConfig('styleguide'));
        }

        if (this.options.app) {
            compilers.push(this.getConfig('app'));
        }

        return compilers;
    }

    getPlugins(name) {
        const plugins = [
            new MiniCssExtractPlugin({
                filename: this.options.app && this.options.production ? 'css/[name].[chunkhash].css' : 'css/[name].css',
            }),
            new SvgStorePlugin(),
            new StyleLintPlugin(),
            new webpack.EnvironmentPlugin({
                webpack: true,
            }),
        ];

        switch (name) {
            case 'app':
                plugins.push(new HtmlWebpackPlugin({
                    hash: this.options.production,
                    template: './src/app/index.html',
                    title: pkg.title,
                }));
                break;

            case 'styleguide':
                plugins.push(new TSConfigGenerator({
                    fileName: path.resolve(__dirname, path.join('tsconfig.paths.json')),
                    fractal,
                    tsConfig: tsconfig,
                }));
                plugins.push(new FractalPlugin({
                    chunksOrder: ['vendor', 'global'],
                    fractal,
                    isProduction: this.options.production,
                }));
                break;
        }

        return plugins;
    }

    getDevServer(name) {
        let server = {};

        if (!this.options.production) {
            switch (name) {
                case 'app':
                    server = {
                        contentBase: './src/app/',
                        headers: {
                            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                            'Access-Control-Allow-Origin': '*',
                        },
                        historyApiFallback: true,
                        https: true,
                        open: true,
                        port: 9000,
                    };
                    break;
            }
        }

        return server;
    }

    getEntry(name) {
        let entry = {};

        switch (name) {
            case 'styleguide':
                entry = {
                    global: ['./src/patterns/index.fractal.ts'],
                };
                break;

            case 'app':
                entry = {
                    app: ['./src/app/index.tsx'],
                };
                break;
        }

        return entry;
    }

    getOutput(name) {
        let output = {};

        switch (name) {
            case 'styleguide':
                output = {
                    filename: 'js/[name].js',
                    library: 'components',
                    libraryTarget: 'var',
                    path: path.resolve(__dirname, 'temp/public/inc'),
                    publicPath: this.options.production ? '../../inc/' : '/inc/',
                };
                break;

            case 'app':
                output = {
                    filename: this.options.production ? 'js/[name].[chunkhash].js' : 'js/[name].js',
                    path: path.resolve(__dirname, './build/app/'),
                    publicPath: this.options.path,
                };
                break;
        }

        return output;
    }

    getConfig(name) {
        return {
            devServer: this.getDevServer(name),
            devtool: 'source-map',
            entry: this.getEntry(name),
            mode: this.options.production ? 'production' : 'development',
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        loader: 'eslint-loader',
                        test: /\.tsx?$/,
                    },
                    {
                        exclude: /node_modules/,
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                    },
                    {
                        test: require.resolve('react'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'React',
                        }],
                    },
                    {
                        test: require.resolve('react-dom'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'ReactDOM',
                        }],
                    },
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('autoprefixer')(),
                                    ],
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [
                                        './src/patterns/core/variables.scss',
                                        './src/patterns/core/mixins.scss',
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        include: path.resolve(__dirname, 'src/patterns/components/icon/icon/import/svg/'),
                        test: /\.(svg)$/,
                        use: [
                            {
                                loader: SvgStorePlugin.loader,
                                options: {
                                    iconName: '[name]',
                                    name: 'svg/icons.svg',
                                },
                            },
                            {
                                loader: 'svgo-loader',
                                options: {
                                    plugins: [
                                        {
                                            removeViewBox: false,
                                        },
                                    ],
                                },
                            },
                        ],

                    },
                    {
                        test: /\.(woff|woff2)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]',
                            },
                        }],
                    },
                    {
                        exclude: path.resolve(__dirname, 'src/patterns/components/icon/icon/import/svg/'),
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]',
                            },
                        }],
                    },
                ],
            },
            optimization: {
                splitChunks: {
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                        vendor: {
                            chunks: 'all',
                            priority: -10,
                            test: /[\\/]node_modules[\\/]/,
                        },
                    },
                },
            },
            output: this.getOutput(name),
            plugins: this.getPlugins(name),
            resolve: {
                extensions: ['.tsx', '.jsx', '.ts', '.js'],
                plugins: [
                    new FractalModuleResolver({
                        fractal,
                    }),
                ],
            },
            stats: {
                children: false,
                modules: false,
            },
            watch: !this.options.production,
        };
    }

}

module.exports = (env) => new gotoAndReact(env);
