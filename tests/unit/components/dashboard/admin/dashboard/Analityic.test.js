/**
 * @file Analityic.test.js
 * @description Unit tests for the Home component in the admin dashboard
 */

import { render, screen } from "@testing-library/react";
import Home from "@/components/dashboard/admin/dashboard/Analityic";

// Mock the icons from @mui/icons-material
jest.mock("@mui/icons-material", () => ({
  Dashboard: () => <span data-testid="Dashboard-icon" />,
  Inventory: () => <span data-testid="Inventory-icon" />,
  Add: () => <span data-testid="Add-icon" />,
  ListAlt: () => <span data-testid="ListAlt-icon" />,
  Assessment: () => <span data-testid="Assessment-icon" />,
  ShoppingCart: () => <span data-testid="ShoppingCart-icon" />,
  People: () => <span data-testid="People-icon" />,
  Settings: () => <span data-testid="Settings-icon" />,
  BarChart: () => <span data-testid="BarChart-icon" />,
}));

describe("Home Dashboard", () => {
  test("renders heading and description", () => {
    render(<Home />);

    // Check heading
    expect(
      screen.getByRole("heading", { name: /Welcome to Your Dashboard/i })
    ).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        /Manage your products, inventory, and orders efficiently/i
      )
    ).toBeInTheDocument();
  });

  test("renders all dashboard cards", () => {
    render(<Home />);

    // List of card names
    const cardNames = [
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

    cardNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`Go to ${name} section`)).toBeInTheDocument();
    });
  });

  test("renders all icons", () => {
    render(<Home />);

    const iconTestIds = [
      "Dashboard-icon",
      "Inventory-icon",
      "Add-icon",
      "ListAlt-icon",
      "ShoppingCart-icon",
      "Assessment-icon",
      "People-icon",
      "Settings-icon",
      "BarChart-icon",
    ];

    iconTestIds.forEach((id) => {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });
  });
});
