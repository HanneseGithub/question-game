const HtmlValidate = require('html-validate').HtmlValidate;
const format = require('html-validate/dist/formatters/stylish').default;

const fractal = require('../fractal.config.js');
const componentHandles = require('../temp/components.json').components.filter((h) => !h.startsWith('@preview'));
const validationConfig = require('../.htmlvalidate.json');

const htmlvalidate = new HtmlValidate(validationConfig);

describe('validate html', () => {
    let components;

    beforeAll(async () => {
        components = await fractal.components.load();
    });

    test.each(componentHandles)('validate %s', async (handle) => {
        expect.assertions(1);
        const component = components.find(handle);

        if (component) {
            const html = await component.render(null, null, {
                preview: true,
            });
            const report = htmlvalidate.validateString(html);

            expect(report.valid, format(report.results)).toBe(true);
        } else {
            console.error('component missing:' + handle);
        }
    }, 10000);
});
