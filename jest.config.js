module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: 1,
  verbose: false,
  roots: [
    '<rootDir>/src',
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest',
  },
  'moduleNameMapper': {
    'database/(.*)': '<rootDir>/src/database/$1',
    'dto/(.*)': '<rootDir>/src/dto/$1',
    'exception/(.*)': '<rootDir>/src/exception/$1',
    'httpServer/(.*)': '<rootDir>/src/httpServer/$1',
    'test/(.*)': '<rootDir>/src/test/$1',
    'util/(.*)': '<rootDir>/src/util/$1',
  }
};
