const config = {
  setupFilesAfterEnv: ['mock-local-storage'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./src/setupTests.js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};

module.exports = config;
