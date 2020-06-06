const glob = require('glob');
const path = require('path');

const variants = [
    {
        name: 'default',
        hidden: true,
    },
];

const files = glob.sync('./**/*.svg', { cwd: __dirname });

for (const file of files) {
    const iconName = path.basename(file, '.svg');

    variants.push({
        name: iconName,
        context: {
            name: iconName,
        },
    });
}

module.exports = {
    collated: true,
    meta: {
        cache: true,
    },
    variants: variants,
};
