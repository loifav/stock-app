/**
 * @file Pages.test.js
 * @description Unit tests for the Pages (dashboard index) component
 */

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// mock child components to keep the test focused and fast
jest.mock("@/components/ai/Ai", () => () => (
  <div data-testid="ai-mock">AI Component</div>
));
jest.mock("@/components/dashboard/user/dashboard/Analityic", () => () => (
  <div data-testid="analityic-mock">Analityic Component</div>
));
jest.mock("@/components/dashboard/user/dashboard/Transaction", () => () => (
  <div data-testid="transaction-mock">Transaction Component</div>
));

import Pages from "@/components/dashboard/user/dashboard/Pages";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

describe("Pages (dashboard index) component", () => {
  it("renders main heading", () => {
    renderWithTheme(<Pages />);
    expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  });

  it("renders Ai, Analityic and Transaction sections (mocks)", () => {
    renderWithTheme(<Pages />);
    expect(screen.getByTestId("ai-mock")).toBeInTheDocument();
    expect(screen.getByTestId("analityic-mock")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-mock")).toBeInTheDocument();
  });
});
