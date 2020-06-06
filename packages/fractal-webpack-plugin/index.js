const path = require('path');

class FractalPlugin {

    constructor(options) {
        this.options = {
            chunksOrder: [],
            fractal: null,
            isProduction: false,
            ...options,
        };
        this.runningServer = false;
        this.builder = this.options.fractal.web.builder();
        this.logger = this.options.fractal.cli.console;
        this.server = this.options.fractal.web.server({
            sync: true,
        });
    }

    apply(compiler) {
        compiler.hooks.done.tap('FractalPlugin', (stats) => {
            if (stats.toJson().errors.length) {
                return;
            }

            const assets = stats.toJson().assets;
            const jsAssets = [];
            const cssAssets = [];

            assets.forEach((asset) => {
                if (path.extname(asset.name) === '.js' && asset.name.startsWith('js/')) {
                    jsAssets.push(asset);
                } else if (path.extname(asset.name) === '.css' && asset.name.startsWith('css/')) {
                    cssAssets.push(asset);
                }
            });
            jsAssets.sort(this.sortAssets.bind(this));
            cssAssets.sort(this.sortAssets.bind(this));

            this.options.fractal.set('jsAssets', jsAssets.map((asset) => asset.name));
            this.options.fractal.set('cssAssets', cssAssets.map((asset) => asset.name));

            if (this.options.isProduction) {
                this.builder.on('start', () => {
                    this.logger.success('Fractal build started...');
                });

                this.builder.on('progress', (completed, total) => {
                    this.logger.update(`Exported ${completed} of ${total} items`, 'info');
                });

                this.builder.start().then((data) => {
                    const e = data.errorCount;

                    this.logger.persist();
                    this.logger[e ? 'warn' : 'success'](`Build finished with ${e === 0 ? 'no' : e} error${e === 1 ? '' : 's'}.`).unslog();
                });
            } else {
                if (!this.runningServer) {
                    this.server.on('error', (err) => this.logger.error(err.message));

                    this.server.start().then(() => {
                        this.runningServer = true;
                        this.logger.success('Fractal server is now running at ' + this.server.url);
                    });
                }
            }
        });
    }

    sortAssets(a, b) {
        return this.options.chunksOrder.indexOf(a.chunkNames.length ? a.chunkNames[0] : '') - this.options.chunksOrder.indexOf(b.chunkNames.length ? b.chunkNames[0] : '');
    }

}

module.exports = FractalPlugin;
