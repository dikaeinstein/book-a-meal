module.exports = {
  verbose: false,
  testPathIgnorePatterns: [
    '/server/test',
    '/node_modules/',
    '/dist/',
    '/client/__mocks__',
    '/client/src/store/',
    '/client/src/helpers/',
    '/e2e-tests/',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}', '!webpack.*.js', '!jest.config.js',
    '!**/index.js',
  ],
  coveragePathIgnorePatterns: [
    '/server/', '/UI/', '/coverage/', '/dist/', '/node_modules/',
    '/client/src/store/', '/client/src/helpers/', '/e2e-tests/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: './client/src/test/setupTests.js',
  setupFiles: ['jest-localstorage-mock'],
  testURL: 'http://localhost',
};
