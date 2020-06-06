const paths = require('./temp/paths.json').paths;

const reporters = [
    'default',
];

if (process.env.CI) {
    reporters.push([
        'jest-junit',
        {
            output: './test-reports/jest-junit.xml',
        },
    ]);
}

module.exports = {
    moduleNameMapper: {
        ...paths,
    },
    reporters,
    setupFilesAfterEnv: ['jest-expect-message'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/vendor/',
        '/app/',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
