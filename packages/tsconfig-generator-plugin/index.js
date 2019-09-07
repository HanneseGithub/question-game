const path = require('path');
const fs   = require('fs');

class TSConfigGenerator {

    constructor(options) {
        options       = Object.assign({
            fractal: null,
            tsConfig: null,
            fileName: null
        }, options);
        this.fractal  = options.fractal;
        this.tsconfig = options.tsConfig;
        this.fileName = options.fileName;
    }

    generate() {
        TSConfigGenerator.generate(this.tsconfig, this.fractal, this.fileName);
    }

    apply(compiler) {
        this.fractal.components.on('updated', (event) => {
            if (event && event.isTemplate && ['add', 'unlink'].includes(event.event)) {
                this.generate();
            }
        });

        // write initial file so that initial tsconfig resolution would not fail
        fs.writeFile(this.fileName, JSON.stringify({}, null, 2) + '\n', (err) => {
            if (err) {
                return console.log(err);
            }
        });

        compiler.hooks.entryOption.tap('TSConfigGenerator', (context, entry) => {
            this.generate();
        });
    }

    static generate(tsconfig, fractal, fileName, callback = null) {
        const baseUrl = tsconfig.compilerOptions.baseUrl.replace('./', '') + '/';

        fractal.components.load().then((components) => {
            let map = {};
            components.flattenDeep().each((item) => {
                const handle   = item.handle.replace('--default', '');
                const basePath = path.relative(__dirname, path.resolve(path.parse(item.viewPath).dir, path.parse(item.viewPath).name)).replace(/\\/g, '/').replace('../../', '').replace(baseUrl, '');

                if (handle.endsWith(path.parse(item.view).name)) {
                    map[`@${handle}`] = [basePath];
                }
            });

            tsconfig.extends = undefined;
            tsconfig.compilerOptions.paths = map;

            fs.writeFile(fileName, JSON.stringify(tsconfig, null, 2) + '\n', (err) => {
                if (err) {
                    return console.log(err);
                }

                if (typeof callback === 'function') {
                    callback();
                }

                fractal.components.emit('updated');
            });
        });
    }

}

module.exports = TSConfigGenerator;
