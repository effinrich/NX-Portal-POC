const { getJestProjects } = require('@nrwl/jest')

module.exports = {
  projects: getJestProjects(),
  moduleDirectories: [],
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/setupTests.js'
  ],
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(.*|(\\.|/)(test|spec))\\.{ts,tsx,js,jxs}?$',
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
