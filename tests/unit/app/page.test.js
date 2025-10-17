/**
 * @file page.test.js
 * @description Unit tests for the Home component with additional coverage.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/components/nav/SnapPos", () => () => <div>SnapPOS</div>);

const { useRouter } = require("next/navigation");

let pushMock;

beforeEach(() => {
  jest.clearAllMocks();
  pushMock = jest.fn();
  useRouter.mockReturnValue({ push: pushMock });
});

test("renders hero, Get Started button and plan info", () => {
  render(<Home />);

  expect(screen.getByText(/Product Inventory Management/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /get started/i })
  ).toBeInTheDocument();
  // default price should be monthly
  expect(screen.getByText(/\$10 \/ month/i)).toBeInTheDocument();
});

test("renders SnapPOS header", () => {
  render(<Home />);
  expect(screen.getByText(/SnapPOS/i)).toBeInTheDocument();
});

test("Get Started button navigates to /login", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: /get started/i }));
  expect(pushMock).toHaveBeenCalledWith("/login");
});

test("toggle switch changes price to annual (uses role 'switch')", () => {
  render(<Home />);

  // MUI Switch uses role 'switch'
  const toggle = screen.getByRole("switch");
  expect(toggle).toBeInTheDocument();

  fireEvent.click(toggle);

  expect(screen.getByText(/\$99 \/ year/i)).toBeInTheDocument();
});

test("renders correct number of navigation cards", () => {
  render(<Home />);

  // card descriptions contain "Go to <Name>"
  const goToElems = screen.getAllByText(/Go to/i);
  // pages array in component contains 9 entries
  expect(goToElems.length).toBe(9);
});

test.each([
  ["Dashboard", "/dashboard"],
  ["Products", "/products"],
  ["Add Product", "/add-product"],
  ["Inventory", "/inventory"],
  ["Orders", "/orders"],
  ["Reports", "/reports"],
  ["Customers", "/customers"],
  ["Settings", "/settings"],
  ["Analytics", "/analytics"],
])("clicking the %s card navigates to %s", (name, path) => {
  render(<Home />);

  // CardActionArea button accessible name includes both title and "Go to <Title>"
  const btn = screen.getByRole("button", {
    name: new RegExp(`${name}\\s+Go to\\s+${name}`, "i"),
  });
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(pushMock).toHaveBeenCalledWith(path);
});
