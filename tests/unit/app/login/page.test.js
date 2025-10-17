/**
 * @file page.test.js
 * @description Unit tests for the LoginComponent in app/login/page.js
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginComponent from "@/app/login/page";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/nav/SnapPos", () => () => <div>SnapPOS</div>);

const { signIn, useSession } = require("next-auth/react");
const { useRouter } = require("next/navigation");

beforeEach(() => {
  jest.clearAllMocks();
  // default useSession returns null data
  useSession.mockReturnValue({ data: null });
  // default router
  useRouter.mockReturnValue({ push: jest.fn() });
});

test("renders email, password, login button and sign up link", () => {
  render(<LoginComponent />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  // partial text match for Sign Up link
  expect(screen.getByText(/sign up/i)).toBeInTheDocument();
});

test("shows error when submitting with empty fields", async () => {
  render(<LoginComponent />);

  const loginBtn = screen.getByRole("button", { name: /login/i });
  fireEvent.click(loginBtn);

  expect(
    await screen.findByText(/please fill in both fields/i)
  ).toBeInTheDocument();
});

test("toggles password visibility when icon button clicked", () => {
  const { container } = render(<LoginComponent />);

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toHaveAttribute("type", "password");

  // find the non-submit button (IconButton) among buttons
  const buttons = screen.getAllByRole("button");
  const iconButton = buttons.find((b) => b.getAttribute("type") !== "submit");
  expect(iconButton).toBeDefined();

  fireEvent.click(iconButton);

  // after click the password input type should change to text
  const passwordInputAfter = container.querySelector(
    'input[name="password"], input[type="text"], input[type="password"]'
  );
  // ensure it is text
  expect(passwordInput).toHaveAttribute("type", "text");
});

test("successful signIn shows success snackbar and navigates to dashboard", async () => {
  const pushMock = jest.fn();
  useRouter.mockReturnValue({ push: pushMock });

  // signIn resolves with no error (success)
  signIn.mockResolvedValueOnce({});

  // simulate that user session data exists with role 'admin'
  useSession.mockReturnValue({ data: { user: { role: "admin" } } });

  render(<LoginComponent />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // wait for snackbar success message
  expect(await screen.findByText(/login successful!/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith("/dashboard/admin");
  });
});

test("failed signIn shows error message from signIn result", async () => {
  // signIn resolves with an error message
  signIn.mockResolvedValueOnce({ error: "Invalid credentials" });

  render(<LoginComponent />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrongpass" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
});
