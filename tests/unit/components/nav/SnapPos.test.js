import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import SnapPOS from "@/components/nav/SnapPos";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

describe("SnapPOS component", () => {
  it("renders the logo text", () => {
    renderWithTheme(<SnapPOS />);
    expect(screen.getByText(/Inventra/i)).toBeInTheDocument();
  });

  it("applies the expected primary color to the logo", () => {
    renderWithTheme(<SnapPOS />);
    const el = screen.getByText(/Inventra/i);
    // #1976d2 -> rgb(25, 118, 210)
    expect(getComputedStyle(el).color).toBe("rgb(25, 118, 210)");
  });
});
