const glob = require('glob');
const path = require('path');

const variants = [
    {
        hidden: true,
        name: 'default',
    },
];

const files = glob.sync('./**/*.svg', { cwd: __dirname });

for (const file of files) {
    const iconName = path.basename(file, '.svg');

    variants.push({
        context: {
            name: iconName,
        },
        name: iconName,
    });
}

module.exports = {
    collated: true,
    meta: {
        cache: true,
        ssr: true,
    },
    variants,
};
