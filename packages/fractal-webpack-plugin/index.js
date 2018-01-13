const fractal  = require('../../fractal.config.js');
const path     = require('path');
const fs       = require('fs');
const tsconfig = require('../../tsconfig.json');
const fileName = 'tsconfig.json';

const builder = fractal.web.builder();
const logger  = fractal.cli.console;
const server  = fractal.web.server({
    sync: true
});

function FractalPlugin(env) {
    this.defaultEnv = {
        production: false
    }
    this.env = Object.assign(this.defaultEnv, env);
}

FractalPlugin.prototype.generateTsConfig = function() {
    fractal.components.load().then(function(components) {
        let map = {};
        components.flatten().each(function(item) {
            map[`@${item.handle}`] = [path.relative(__dirname, path.resolve(path.parse(item.viewPath).dir, path.parse(item.viewPath).name)).replace(/\\/g, '/').replace('../../', '')];
        });

        tsconfig.compilerOptions.paths = map;

        fs.writeFile(fileName, JSON.stringify(tsconfig, null, 2), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}

FractalPlugin.prototype.apply = function(compiler) {
    let runningServer = false;

    fractal.components.on('updated', (event) => {
        if (event.isTemplate && ['add', 'unlink'].includes(event.event)) {
            this.generateTsConfig();
        }
    });

    compiler.plugin('compilation', (compilation) => {
        this.generateTsConfig();
    });

    compiler.plugin('done', (stats) => {
        const assets = stats.toJson().assetsByChunkName;
        const jsAssets = [];
        const cssAssets = [];

        let addAsset = function (asset) {
            if(asset.search('.map') === -1) {
                if(asset.search('.js') !== -1) {
                    jsAssets.push(asset);
                } else if(asset.search('.css') !== -1) {
                    cssAssets.push(asset);
                }
            }
        }
        for (let asset in assets) {
            if (Array.isArray(assets[asset])) {
                assets[asset].forEach(addAsset);
            } else {
                addAsset(assets[asset]);
            }
        }

        fractal.set('jsAssets', jsAssets);
        fractal.set('cssAssets', cssAssets);

        if (this.env.production) {
            builder.build().then(function() {
                console.log('build complete!');
                process.exit();
            });
        } else {
            if (!runningServer) {
                server.on('error', function(err) {
                    return logger.error(err.message);
                });

                server.start().then(function() {
                    runningServer = true;
                    logger.success('Fractal server is now running at ' + server.url);
                });
            }
        }
    });
};

module.exports = FractalPlugin;
