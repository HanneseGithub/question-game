const path = require('path');

const webpack               = require('webpack');
const StyleLintPlugin       = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const SvgStorePlugin        = require('external-svg-sprite-loader');
const FractalModuleResolver = require('@gotoandplay/fractal-module-resolver-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

const fractal           = require('./fractal.config.js');
const tsconfig          = require('./tsconfig.json');
const pkg               = require('./package.json');
const FractalPlugin     = require('./packages/fractal-webpack-plugin');
const TSConfigGenerator = require('./packages/tsconfig-generator-plugin');

/**
 * gotoAndReact class
 */
class gotoAndReact {
    constructor(env) {
        this.options = Object.assign({}, {
            production: false,
            styleguide: false,
            app: false,
            path: '/',
        }, env);

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
                webpack: true
            })
        ];

        switch (name) {
            case 'app':
                plugins.push(new HtmlWebpackPlugin({
                    title: pkg.title,
                    template: './src/app/index.html',
                    hash: this.options.production,
                }));
                break;

            case 'styleguide':
                plugins.push(new TSConfigGenerator({
                    fractal: fractal,
                    tsConfig: tsconfig,
                    fileName: path.resolve(__dirname, path.join('tsconfig.paths.json')),
                }));
                plugins.push(new FractalPlugin({
                    fractal: fractal,
                    isProduction: this.options.production,
                    chunksOrder: ['vendor', 'global'],
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
                        port: 9000,
                        historyApiFallback: true,
                        contentBase: './src/app/',
                        open: true,
                        https: true,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
                        },
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
                    global: ['./src/patterns/index.fractal.ts']
                };
                break;

            case 'app':
                entry = {
                    app: ['./src/app/index.tsx']
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
                    path: path.resolve(__dirname, 'temp/public/inc'),
                    publicPath: this.options.production ? '../../inc/' : '/inc/',
                    library: 'components',
                    libraryTarget: 'var'
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
            watch: !this.options.production,
            mode: this.options.production ? 'production' : 'development',
            devtool: 'source-map',
            devServer: this.getDevServer(name),
            entry: this.getEntry(name),
            output: this.getOutput(name),
            plugins: this.getPlugins(name),
            resolve: {
                plugins: [
                    new FractalModuleResolver({
                        fractal: fractal,
                    }),
                ],
                extensions: ['.tsx', '.jsx', '.ts', '.js'],
            },
            optimization: {
                splitChunks: {
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            chunks: 'all',
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                        }
                    }
                }
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        enforce: 'pre',
                        loader: 'tslint-loader'
                    },
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: require.resolve('react'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'React'
                        }]
                    },
                    {
                        test: require.resolve('react-dom'),
                        use: [{
                            loader: 'expose-loader',
                            options: 'ReactDOM'
                        }]
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
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: [
                                        require('autoprefixer')()
                                    ]
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [
                                        './src/patterns/core/variables.scss',
                                        './src/patterns/core/mixins.scss'
                                    ]
                                }
                            }
                        ],
                    },
                    {
                        test: /\.(svg)$/,
                        include: path.resolve(__dirname, 'src/patterns/components/icon/icon/import/svg/'),
                        use: [{
                            loader: SvgStorePlugin.loader,
                            options: {
                                name: 'svg/icons.svg',
                                iconName: '[name]'
                            }
                        },
                            {
                                loader: 'svgo-loader',
                                options: {
                                    plugins: [
                                        {
                                            removeViewBox: false
                                        }
                                    ]
                                }
                            }]
                    },
                    {
                        test: /\.(woff|woff2)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }]
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        exclude: path.resolve(__dirname, 'src/patterns/components/icon/icon/import/svg/'),
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }]
                    },
                ]
            },
            stats: {
                modules: false,
                children: false,
            },
        };
    }

}

/**
 * Export config
 */
module.exports = (env) => {
    return new gotoAndReact(env);
};
