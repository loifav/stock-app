/**
 * @file Admin.test.js
 * Unit tests for the Admin Sidenav component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: jest.fn(),
  }),
}));

// Stub SnapPOS to avoid rendering the real component
jest.mock("@/components/nav/SnapPos", () => () => <div>SnapPOS</div>);

import Sidenav from "@/components/dashboard/admin/Admin";

const renderWithTheme = (ui) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("Sidenav (Admin) component", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders AppBar title, SnapPOS and children", () => {
    renderWithTheme(
      <Sidenav>
        <div>Children Content</div>
      </Sidenav>
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText("SnapPOS")).toBeInTheDocument();
    expect(screen.getByText("Children Content")).toBeInTheDocument();
  });

  it("does not show collapsed category items initially", () => {
    renderWithTheme(<Sidenav />);
    expect(screen.queryByText("All Category")).not.toBeInTheDocument();
  });

  it("navigates to /dashboard/user when Dashboard is clicked", () => {
    renderWithTheme(<Sidenav />);

    const dashboardButton = screen.getByRole("button", { name: /dashboard/i });
    expect(dashboardButton).toBeTruthy();

    fireEvent.click(dashboardButton);
    expect(mockPush).toHaveBeenCalledWith("/dashboard/user");
  });

  it("expands Manage Category and shows All Category, then navigates to /dashboard/category when clicked", () => {
    renderWithTheme(<Sidenav />);

    const manageButton = screen.getByRole("button", {
      name: /manage category/i,
    });
    expect(manageButton).toBeTruthy();

    fireEvent.click(manageButton);

    const allCategoryButton = screen.getByRole("button", {
      name: /all category/i,
    });
    expect(allCategoryButton).toBeTruthy();

    fireEvent.click(allCategoryButton);
    expect(mockPush).toHaveBeenCalledWith("/dashboard/category");
  });
});
