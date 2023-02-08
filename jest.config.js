module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
  },
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/unit-tests/setup.ts",
    "<rootDir>/__tests__/e2e-tests/",
  ],
};
