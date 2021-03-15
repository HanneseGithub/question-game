const fs = require('fs');

const fractal = require('../fractal.config.js');

fractal.components.load().then((components) => {
    const arr = [];

    components.flattenDeep().each((item) => {
        const handle = item.handle.endsWith('--default') ? item.handle.replace('--default', '') : item.handle;

        arr.push(`@${handle}`);
    });

    const obj = {
        components: arr,
    };

    fs.mkdir('./temp', { recursive: true }, (e) => {
        if (e) {
            return console.error(e);
        }

        fs.writeFile('./temp/components.json', JSON.stringify(obj, null, 2) + '\n', (err) => {
            if (err) {
                return console.error(err);
            }
        });
    });
});
