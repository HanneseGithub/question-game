const path = require('path');

const webpack               = require('webpack');
const StyleLintPlugin       = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const SvgStorePlugin        = require('external-svg-sprite-loader');
const FractalModuleResolver = require('@gotoandplay/fractal-module-resolver-webpack-plugin');

const fractal           = require('./fractal.config.js');
const tsconfig          = require('./tsconfig.json');
const FractalPlugin     = require('./packages/fractal-webpack-plugin');
const TSConfigGenerator = require('./packages/tsconfig-generator-plugin');

module.exports = function(env) {
    const options = Object.assign({}, {
        production: false,
    }, env);
    const chunksOrder   = ['vendor', 'global'];

    return {
        watch: !options.production,
        mode: options.production ? 'production' : 'development',
        devtool: 'source-map',
        entry: {
            vendor: ['react-dom'],
            global: ['./src/patterns/index.fractal.ts']
        },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'app/styleguide/public/inc'),
            publicPath: options.production ? '../../inc/' : '/inc/',
            library: '[name]',
            libraryTarget: 'window'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new SvgStorePlugin(),
            new FractalPlugin({
                fractal: fractal,
                isProduction: options.production,
                chunksOrder: chunksOrder,
            }),
            new StyleLintPlugin(),
            new webpack.EnvironmentPlugin({
                webpack: true
            }),
            new TSConfigGenerator({
                fractal: fractal,
                tsConfig: tsconfig,
                fileName: path.resolve(__dirname, path.join('tsconfig.json')),
            }),
        ],
        resolve: {
            plugins: [
                new FractalModuleResolver({
                    fractal: fractal,
                }),
            ],
            extensions: ['.tsx', '.jsx', '.ts', '.js'],
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
                    include: path.resolve(__dirname, 'src/patterns/components/icon/import/svg/'),
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
                    exclude: path.resolve(__dirname, 'src/patterns/components/icon/import/svg/'),
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }]
                },
            ]
        }
    }
};
