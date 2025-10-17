/**
 * @file Pages.test.js
 * @description Unit tests for Pages (HomePage) component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/components/dashboard/admin/dashboard/Pages";

// Mock child components to keep tests focused and avoid MUI/Grid warnings
jest.mock("@/components/ai/Ai", () => () => <div data-testid="Ai-mock" />);
jest.mock("@/components/dashboard/admin/dashboard/Analityic", () => () => (
  <div data-testid="Analityic-mock" />
));
jest.mock("@/components/dashboard/admin/dashboard/Transaction", () => () => (
  <div data-testid="Transaction-mock" />
));

describe("Pages (HomePage)", () => {
  test("renders main headings and sections", () => {
    render(<HomePage />);

    // Main dashboard heading
    expect(
      screen.getByRole("heading", { name: /Dashboard Overview/i })
    ).toBeInTheDocument();

    // Recent Transactions heading
    expect(
      screen.getByRole("heading", { name: /Recent Transactions/i })
    ).toBeInTheDocument();
  });

  test("renders AI, Analytics and Transaction sections (mocks)", () => {
    render(<HomePage />);

    expect(screen.getByTestId("Ai-mock")).toBeInTheDocument();
    expect(screen.getByTestId("Analityic-mock")).toBeInTheDocument();
    expect(screen.getByTestId("Transaction-mock")).toBeInTheDocument();
  });
});
