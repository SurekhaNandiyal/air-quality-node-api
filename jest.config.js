module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transpile TypeScript files
      '^.+\\.[jt]sx?$': 'babel-jest', // Transpile JS/TS using Babel
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  };
  