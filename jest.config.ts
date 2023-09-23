/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/assets/images/(.*)$': '<rootDir>/src/assets/images/$1',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/generated/images/images.ts',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|native-base|react))/',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'android.js',
    'ios.js',
  ],
  globals: {
    __DEV__: true,
  },
};
