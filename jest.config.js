module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };