module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  coverageProvider: 'babel',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(svg)$': '<rootDir>/file-transformer.js'

  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(svg|css)$': 'identity-obj-proxy'
  }
}
