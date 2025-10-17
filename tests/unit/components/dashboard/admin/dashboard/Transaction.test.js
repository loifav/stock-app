/**
 * @file Transaction.test.js
 * @description Unit tests for Transaction (LatestTransactions) component
 */

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import LatestTransactions from "@/components/dashboard/admin/dashboard/Transaction";
import * as MUI from "@mui/material";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe("LatestTransactions component", () => {
  const mockThemeOptions = {
    palette: {
      action: {
        hover: "#f0f0f0",
      },
    },
  };

  test("renders table headers and rows on large screens", () => {
    MUI.useMediaQuery.mockImplementation(() => false); // not small

    render(
      <MUI.ThemeProvider theme={MUI.createTheme(mockThemeOptions)}>
        <LatestTransactions />
      </MUI.ThemeProvider>
    );

    // Headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();

    // Known data from component (4 transactions + 1 header row)
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(5);

    // Check some cell contents
    expect(screen.getByText("Charles Casey")).toBeInTheDocument();
    expect(screen.getByText("$42,450")).toBeInTheDocument();
    expect(screen.getByText("Alex Adams")).toBeInTheDocument();
    expect(screen.getByText("$25,060")).toBeInTheDocument();
  });

  test("hides responsive columns on small screens", () => {
    MUI.useMediaQuery.mockImplementation(() => true); // small

    render(
      <MUI.ThemeProvider theme={MUI.createTheme(mockThemeOptions)}>
        <LatestTransactions />
      </MUI.ThemeProvider>
    );

    // Hidden headers on small screens
    expect(screen.queryByText("Position")).toBeNull();
    expect(screen.queryByText("Age")).toBeNull();
    expect(screen.queryByText("Start Date")).toBeNull();

    // Visible headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
  });

  test("renders correct counts for status values", () => {
    MUI.useMediaQuery.mockImplementation(() => false);

    render(
      <MUI.ThemeProvider theme={MUI.createTheme(mockThemeOptions)}>
        <LatestTransactions />
      </MUI.ThemeProvider>
    );

    const activeItems = screen.getAllByText("Active");
    const deactivateItems = screen.getAllByText("Deactivate");

    expect(activeItems.length).toBe(3);
    expect(deactivateItems.length).toBe(1);
  });
});
