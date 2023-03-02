/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/integration/**/*.[jt]s?(x)"

  ],
};