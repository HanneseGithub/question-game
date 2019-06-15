const tsconfig = require('./tsconfig.json');
const baseUrl  = tsconfig.compilerOptions.baseUrl;
const paths    = tsconfig.compilerOptions.paths;

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

Object.keys(paths).map(function(key, index) {
   paths[key] = '<rootDir>' + baseUrl.replace('./', '/') + '/' + paths[key][0];
});

module.exports = {
    reporters: reporters,
    testPathIgnorePatterns: [
        '/node_modules/',
        '/vendor/',
        '/app/',
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        ...paths,
    }
};
