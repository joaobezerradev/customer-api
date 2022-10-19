module.exports = {
  collectCoverageFrom: ['<rootDir>/src/core/**/*.ts', '!<rootDir>/src/core/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '~/test/(.+)': '<rootDir>/test/$1',
    '@domain/(.+)': '<rootDir>/src/core/domain/$1',
    '@application/(.+)': '<rootDir>/src/core/application/$1',
    '@infra/(.+)': '<rootDir>/src/core/infra/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
