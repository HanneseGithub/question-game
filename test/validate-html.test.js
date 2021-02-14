const HtmlValidate = require('html-validate').HtmlValidate;
const format = require('html-validate/dist/formatters/stylish').default;

const fractal = require('../fractal.config.js');
const { components } = require('../temp/components.json');
const validationConfig = require('../.htmlvalidate.json');

const htmlvalidate = new HtmlValidate(validationConfig);

describe('validate html', () => {
    components.forEach((handle) => {
        if (handle.startsWith('@preview')) {
            return;
        }

        test('validate ' + handle, async (done) => {
            const fractalComponents = await fractal.components.load();
            const component = fractalComponents.find(handle);

            if (component) {
                const html = await component.render(null, null, {
                    preview: true,
                });
                const report = htmlvalidate.validateString(html);

                expect(report.valid, format(report.results)).toBe(true);
                done();
            } else {
                console.error('component missing:' + handle);
            }
        }, 10000);
    });
});
