const validator = require('html-validator');

const fractal    = require('../fractal.config.js');
const components = require('../temp/components.json');

describe('validate html', () => {
    components.components.forEach((component) => {
        if (component.startsWith('@preview')) {
            return;
        }

        test('validate ' + component, (done) => {
            fractal.components.load().then((comps) => {
                const comp = comps.find(component);

                comp.render(null, null, {
                    preview: true,
                }).then(async (html) => {
                    const options = {
                        data: html,
                        format: 'text'
                    };

                    try {
                        const result = await validator(options);

                        expect(result).toBe('The document validates according to the specified schema(s).\n');
                        done();
                    } catch (error) {
                        expect(error).toBe('The document validates according to the specified schema(s).\n');
                        done();
                    }
                });
            })
        }, 10000);
    });
});
