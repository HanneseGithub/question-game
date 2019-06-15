const path = require('path');
const fs   = require('fs');

const fractal = require('../fractal.config.js');

fractal.components.load().then((components) => {
    const arr = [];

    components.flattenDeep().each((item) => {
        const handle = item.handle.replace('--default', '');
        arr.push(`@${handle}`);
    });

    const obj = {
        components: arr,
    };

    fs.mkdir('./temp', { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }

        fs.writeFile('./temp/components.json', JSON.stringify(obj, null, 2) + '\n', (err) => {
            if (err) {
                return console.error(err);
            }

            if (typeof callback === 'function') {
                callback();
            }
        });
    });
});
