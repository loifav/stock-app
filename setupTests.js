require("@testing-library/jest-dom");

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }) => children || null,
}));

global.alert = jest.fn();

// mock navigator.clipboard.writeText used in Ai component
Object.defineProperty(global.navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  configurable: true,
});
