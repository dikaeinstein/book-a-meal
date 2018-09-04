module.exports = {
  verbose: false,
  testPathIgnorePatterns: [
    '/server/test',
    '/node_modules/',
    '/dist/',
    '/client/__tests__/__mocks__',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}', '!webpack.*.js', '!jest.config.js',
  ],
  coveragePathIgnorePatterns: [
    '/server/', '/UI/', '/coverage/', '/dist/', '/node_modules/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: './client/src/test/setupTests.js',
  setupFiles: ['jest-localstorage-mock'],
  testURL: 'http://localhost',
};
