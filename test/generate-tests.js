const path = require('path');
const fs = require('fs');
const fractal = require('../fractal.config.js');
const tsconfig = require('../tsconfig.json');
const TsConfigGenerator = require('../packages/tsconfig-generator-plugin');

TsConfigGenerator.generate(tsconfig, fractal, './tsconfig.paths.json', () => {
    const baseUrl = tsconfig.compilerOptions.baseUrl.replace('./', '') + '/';

    fractal.components.load().then((components) => {
        const arr = [];
        const map = {};

        components.flattenDeep().each((item) => {
            const handle = item.handle.replace('--default', '');

            arr.push(`@${handle}`);

            const basePath = path.relative(__dirname, path.resolve(path.parse(item.viewPath).dir, path.parse(item.viewPath).name)).replace(/\\/g, '/').replace('../../', '').replace(baseUrl, '');

            if (handle.endsWith(path.parse(item.view).name)) {
                map[`^@${handle}$`] = '<rootDir>/' + baseUrl + basePath.replace('../', '');
            }
        });

        const componentsObject = {
            components: arr,
        };
        const pathsObject = {
            paths: map,
        };

        fs.mkdir('./temp', { recursive: true }, (e) => {
            if (e) {
                return console.error(e);
            }

            fs.writeFile('./temp/components.json', JSON.stringify(componentsObject, null, 2) + '\n', (err) => {
                if (err) {
                    return console.error(err);
                }
            });

            fs.writeFile('./temp/paths.json', JSON.stringify(pathsObject, null, 2) + '\n', (err) => {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });
});
