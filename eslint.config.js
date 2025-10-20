import { defineConfig, globalIgnores } from "eslint/config";
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
  globalIgnores([".next/", "node_modules/"]),

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // browser
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        Headers: "readonly",
        Request: "readonly",
        Response: "readonly",
        // node
        process: "readonly",
        global: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        // jest / testing
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        // web / util
        TextEncoder: "readonly",
        TextDecoder: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      semi: ["error", "always"],
      "prefer-const": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: "error",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
