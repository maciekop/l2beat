module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  maxWorkers: 4,
  verbose: true,
  detectOpenHandles: true,
  passWithNoTests: true,
  forceExit: true,
};