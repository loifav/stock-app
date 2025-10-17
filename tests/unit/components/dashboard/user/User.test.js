/**
 * @file User.test.js
 * @description Unit tests for the UserSidenav component
 */

import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockPush = jest.fn();

// mock next/navigation before importing component
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// mock SnapPos used in the Drawer header
jest.mock("@/components/nav/SnapPos", () => () => (
  <div data-testid="snappos">SnapPos</div>
));

import UserSidenav from "@/components/dashboard/user/User";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

describe("UserSidenav component", () => {
  it("renders AppBar title and SnapPos", () => {
    renderWithTheme(<UserSidenav>Content</UserSidenav>);
    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
    expect(screen.getByTestId("snappos")).toBeInTheDocument();
  });

  it("navigates to /dashboard/user when Dashboard button is clicked", () => {
    renderWithTheme(<UserSidenav>Content</UserSidenav>);
    const dashboardBtn = screen.getByRole("button", { name: /Dashboard/i });
    fireEvent.click(dashboardBtn);
    expect(mockPush).toHaveBeenCalledWith("/dashboard/user");
  });

  it("expands Transactions and navigates to a nested transaction route", async () => {
    renderWithTheme(<UserSidenav>Content</UserSidenav>);

    const transactionsBtn = screen.getByRole("button", {
      name: /Transactions/i,
    });
    fireEvent.click(transactionsBtn); // open collapse

    const allTransactionsItem = await screen.findByText(/All Transactions/i);
    fireEvent.click(allTransactionsItem);
    expect(mockPush).toHaveBeenCalledWith(
      "/dashboard/transactions/all-transactions"
    );
  });

  it("toggles Manage Category and navigates to the category route", async () => {
    renderWithTheme(<UserSidenav>Content</UserSidenav>);

    const manageBtn = screen.getByRole("button", { name: /Manage Category/i });
    fireEvent.click(manageBtn); // open collapse

    const allCatItem = await screen.findByText(/all-category/i);
    fireEvent.click(allCatItem);
    expect(mockPush).toHaveBeenCalledWith("/dashboard/user/all-category");
  });
});
