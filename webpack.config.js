const webpack                     = require('webpack');
const path                        = require('path');
const FractalModuleResolverPlugin = require('./packages/fractal-module-resolver-webpack-plugin');
const FractalPlugin               = require('./packages/fractal-webpack-plugin');
const StyleLintPlugin             = require('stylelint-webpack-plugin');
const ExtractTextPlugin           = require("extract-text-webpack-plugin");
const SvgStorePlugin              = require('external-svg-sprite-loader/lib/SvgStorePlugin');

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

module.exports = function(env) {
    return {
        watch: true,
        devtool: 'source-map',
        entry: {
            vendor: ['react-dom'],
            global: ['./src/index.ts']
        },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'app/styleguide/public/inc'),
            publicPath: env && env.production ? '../../inc/' : '/inc/',
            library: '[name]',
            libraryTarget: 'window'
        },
        plugins: [
            extractSass,
            new SvgStorePlugin(),
            new FractalPlugin(env ? env : {}),
            new StyleLintPlugin(),
            new webpack.EnvironmentPlugin({
                webpack: true
            })
        ],
        resolve: {
            plugins: [
                new FractalModuleResolverPlugin()
            ]
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
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [
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
                                        './src/core/variables.scss',
                                        './src/core/mixins.scss'
                                    ]
                                }
                            }
                        ],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(svg)$/,
                    include: path.resolve(__dirname, 'src/components/icon/import/svg/'),
                    use: [{
                        loader: 'external-svg-sprite-loader',
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
                }
            ]
        }
    }
};
