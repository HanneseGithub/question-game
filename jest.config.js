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
    reporters,
    setupFilesAfterEnv: ['jest-expect-message'],
    testEnvironment: 'node', // Do not use jsdom
    testPathIgnorePatterns: [
        '/node_modules/',
        '/vendor/',
        '/app/',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
