const { defineConfig } = require("eslint/config");

module.exports = defineConfig({
  root: true,
  env: { browser: true, node: true, es2021: true },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  settings: { react: { version: "detect" } },
  rules: {
    semi: ["error", "always"],
    "prefer-const": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    eqeqeq: "error",
    "react/react-in-jsx-scope": "off",
  },
});
