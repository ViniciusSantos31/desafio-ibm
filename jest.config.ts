/* eslint-disable import/no-anonymous-default-export */
export default {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/*.test.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReports: ["lcov", "json"],
};
