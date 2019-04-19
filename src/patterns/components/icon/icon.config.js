const glob = require('glob');
const path = require('path');

const variants = [
    {
        name: 'default',
        hidden: true,
    },
];

glob('./**/*.svg', { cwd: __dirname }, (err, files) => {
    for (const file of files) {
        const iconName = path.basename(file, '.svg');

        variants.push({
            name: iconName,
            context: {
                name: iconName,
            },
        });
    }
});

module.exports = {
    collated: true,
    variants: variants,
};
