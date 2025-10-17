/**
 * @file Analityic.test.js
 * @description Unit tests for the Analityic component in components/dashboard/user/dashboard/Analityic.js
 */

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Stub framer-motion to avoid animation-related issues in tests
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      // simple passthrough component for motion.div
      div: ({ children, ...props }) =>
        React.createElement(
          "div",
          { ...props, "data-motion": "div" },
          children
        ),
    },
  };
});

import Analityic from "@/components/dashboard/user/dashboard/Analityic";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

describe("Analityic (Home) component", () => {
  it("renders heading and description", () => {
    renderWithTheme(<Analityic />);

    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Explore your account, manage your orders/i)
    ).toBeInTheDocument();
  });

  it("renders all page cards with titles and 'Go to' text", () => {
    renderWithTheme(<Analityic />);

    // There are 9 pages defined in the component
    const titles = [
      "Dashboard",
      "Products",
      "Add Product",
      "Inventory",
      "Orders",
      "Reports",
      "Customers",
      "Settings",
      "Analytics",
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Go to ${title}`, "i"))
      ).toBeInTheDocument();
    });

    // Ensure count of "Go to" labels equals number of pages
    const goToItems = screen.getAllByText(/Go to/i);
    expect(goToItems.length).toBe(titles.length);
  });

  it("renders icons inside cards (svg elements present)", () => {
    renderWithTheme(<Analityic />);

    // icons are rendered as svgs — expect at least one svg in the document
    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });
});
