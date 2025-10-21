/**
 * @file AllCategory.test.js
 * @description Unit tests for the AllCategory component.
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CategoryTable from "@/components/allcategory/AllCategory";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@/reduxslice/categorySlice", () => ({
  addCategory: jest.fn(() => ({ type: "category/add" })),
  fetchCategories: jest.fn(() => ({ type: "category/fetch" })),
  deleteCategory: jest.fn(() => ({ type: "category/delete" })),
  updateCategory: jest.fn(() => ({ type: "category/update" })),
}));

const { useSelector, useDispatch } = require("react-redux");

describe("CategoryTable component", () => {
  let mockDispatch;

  const setSelectorState = ({
    categories = [],
    loading = false,
    error = null,
  } = {}) => {
    useSelector.mockImplementation((selector) =>
      selector({ categories: { categories, loading, error } })
    );
  };

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReset();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("shows loading state when loading is true", () => {
    setSelectorState({ categories: [], loading: true, error: null });
    render(<CategoryTable />);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });

  test("renders categories list", () => {
    const cats = [
      { _id: "1", name: "Foo" },
      { _id: "2", name: "Bar" },
    ];
    setSelectorState({ categories: cats, loading: false, error: null });
    render(<CategoryTable />);

    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText("Bar")).toBeInTheDocument();
  });

  test("filters categories based on search input", () => {
    const cats = [
      { _id: "1", name: "Apple" },
      { _id: "2", name: "Banana" },
    ];
    setSelectorState({ categories: cats, loading: false, error: null });
    render(<CategoryTable />);

    const input = screen.getByPlaceholderText(/Search categories/i);
    fireEvent.change(input, { target: { value: "ban" } });

    expect(screen.queryByText("Apple")).toBeNull();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  test("opens add modal when Add Category button clicked", () => {
    setSelectorState({ categories: [], loading: false, error: null });
    render(<CategoryTable />);

    const addButton = screen.getByRole("button", { name: /Add Category/i });
    fireEvent.click(addButton);

    expect(screen.getByText(/Add New Category/i)).toBeInTheDocument();
  });
});
