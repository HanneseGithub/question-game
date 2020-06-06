const path = require('path');
const fs = require('fs');

class TSConfigGenerator {

    constructor(options) {
        this.options = {
            fileName: null,
            fractal: null,
            tsConfig: null,
            ...options,
        };
    }

    generate() {
        TSConfigGenerator.generate(this.options.tsConfig, this.options.fractal, this.options.fileName);
    }

    apply(compiler) {
        this.options.fractal.components.on('updated', (event) => {
            if (event && event.isTemplate && ['add', 'unlink'].includes(event.event)) {
                this.generate();
            }
        });

        // write initial file so that initial tsconfig resolution would not fail
        fs.writeFile(this.options.fileName, JSON.stringify({}, null, 2) + '\n', (err) => {
            if (err) {
                return console.log(err);
            }
        });

        compiler.hooks.entryOption.tap('TSConfigGenerator', () => {
            this.generate();
        });
    }

    static generate(tsconfig, fractal, fileName, callback = null) {
        const baseUrl = tsconfig.compilerOptions.baseUrl.replace('./', '') + '/';

        fractal.components.load().then((components) => {
            const map = {};

            components.flattenDeep().each((item) => {
                const handle = item.handle.replace('--default', '');
                const basePath = path.relative(__dirname, path.resolve(path.parse(item.viewPath).dir, path.parse(item.viewPath).name)).replace(/\\/g, '/').replace('../../', '').replace(baseUrl, '');

                if (handle.endsWith(path.parse(item.view).name)) {
                    map[`@${handle}`] = [basePath];
                }
            });

            const pathsConfig = { compilerOptions: { paths: map } };

            fs.writeFile(fileName, JSON.stringify(pathsConfig, null, 2) + '\n', (err) => {
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
