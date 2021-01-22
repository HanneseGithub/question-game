/* eslint-disable jsdoc/no-undefined-types */

const { argv } = require('yargs');

module.exports = () => {
    /** @type {string} */
    const mode = argv.mode || 'production';

    /** @type {string[]} */
    const rawEnv = Array.isArray(argv.env) ? argv.env : [argv.env];

    /** @type {Record<string, string | true>} */
    const env = rawEnv.filter((i) => !!i).reduce((acc, val) => {
        const splitVal = val.split('=');
        const key = splitVal[0];
        const value = splitVal[1] || true;

        return {
            ...acc,
            [key]: value,
        };
    }, {});

    return { env, mode };
};
