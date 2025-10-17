/**
 * @file Transaction.test.js
 * @description Unit tests for the LatestTransactions component
 */

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Ensure matchMedia exists so useMediaQuery works in tests
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // desktop layout (shows Position, Age, Start Date)
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

import Transaction from "@/components/dashboard/user/dashboard/Transaction";

describe("LatestTransactions component", () => {
  it("renders table headers", () => {
    renderWithTheme(<Transaction />);

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Position/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
  });

  it("renders all transaction rows (names & salaries)", () => {
    renderWithTheme(<Transaction />);

    const names = [
      "Charles Casey",
      "Alex Adams",
      "Prezy Kelsey",
      "Ruhi Fancher",
    ];
    names.forEach((name) => {
      expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
    });

    // check salaries are present
    expect(screen.getByText("$42,450")).toBeInTheDocument();
    expect(screen.getByText("$25,060")).toBeInTheDocument();
    expect(screen.getByText("$59,350")).toBeInTheDocument();
    expect(screen.getByText("$23,700")).toBeInTheDocument();
  });

  it("renders status icons (svgs) for rows", () => {
    renderWithTheme(<Transaction />);

    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(4);
  });
});
