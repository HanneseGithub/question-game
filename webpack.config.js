const path                        = require('path');
const FractalModuleResolverPlugin = require('./packages/fractal-module-resolver-webpack-plugin');
const StartFractalPlugin          = require('./packages/start-fractal-webpack-plugin');

module.exports = function(env) {
    return {
        watch: true,
        entry: {
            vendor: ['react-dom'],
            global: ['./src/index.ts']
        },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'app/styleguide/public/inc'),
            library: 'gotoAndPlay',
            libraryTarget: 'umd'
        },
        plugins: [
            new StartFractalPlugin()
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
                }
            ]
        }
    }
};
