const fractal = require('../../fractal.config.js');
const path = require('path');
const fs = require('fs');
const tsconfig = require('../../tsconfig.json');
const fileName = 'tsconfig.json';

const logger = fractal.cli.console;
const server = fractal.web.server({
    sync: true
});

function StartFractalPlugin() {}

StartFractalPlugin.prototype.generateTsConfig = function() {
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

StartFractalPlugin.prototype.apply = function(compiler) {
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
        for (let asset in assets) {
            jsAssets.push(assets[asset]);
        }

        fractal.set('jsAssets', jsAssets);

        if (!runningServer) {
            server.on('error', function(err) {
                return logger.error(err.message);
            });

            server.start().then(function() {
                runningServer = true;
                logger.success('Fractal server is now running at ' + server.url);
            });
        }
    });
};

module.exports = StartFractalPlugin;
