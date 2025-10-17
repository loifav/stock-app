const { TextEncoder, TextDecoder } = require("util");

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}

require("@testing-library/jest-dom");

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }) => children || null,
}));

global.alert = jest.fn();

// ensure a navigator object exists (some tests run with node env)
if (typeof global.navigator === "undefined") {
  global.navigator = {};
}

// mock navigator.clipboard.writeText used in Ai component (guard if already present)
if (!global.navigator.clipboard) {
  Object.defineProperty(global.navigator, "clipboard", {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
    configurable: true,
  });
}
