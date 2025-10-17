const path = require("path");

module.exports = {
  // default test environment (can be overridden per test file)
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      { configFile: path.resolve(__dirname, "babel.jest.config.js") },
    ],
    "^.+\\.mjs$": "babel-jest",
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(bson|mongodb|mongoose)/)", // only needed for Node tests
  ],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
  },

  setupFilesAfterEnv: [path.resolve(__dirname, "setupTests.js")],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
