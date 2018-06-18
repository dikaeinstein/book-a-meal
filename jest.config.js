module.exports = {
  verbose: false,
  testPathIgnorePatterns: [
    './server/test',
    './node_modules/',
    'client/__tests__/__mocks__',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
