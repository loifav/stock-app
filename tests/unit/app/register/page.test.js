/**
 * @file page.test.js
 * @description Unit tests for the RegisterPage component.
 */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterPage from "@/app/register/page";

jest.mock("@/components/nav/SnapPos", () => () => <div>SnapPOS</div>);

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

afterEach(() => {
  if (global.fetch && global.fetch.mockRestore) {
    global.fetch.mockRestore();
  }
});

test("renders inputs, register button and login link", () => {
  render(<RegisterPage />);

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  expect(
    screen.getByText(/already have an account\? login/i)
  ).toBeInTheDocument();
});

test("shows error when submitting with empty fields", async () => {
  render(<RegisterPage />);

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText(/please fill in all fields/i)
  ).toBeInTheDocument();
});

test("toggles password visibility when icon button clicked", () => {
  const { container } = render(<RegisterPage />);

  const passwordInput = container.querySelector('input[type="password"]');
  expect(passwordInput).toBeInTheDocument();

  const allButtons = screen.getAllByRole("button");
  const iconButton = allButtons.find(
    (b) => b.getAttribute("type") !== "submit"
  );
  expect(iconButton).toBeDefined();

  fireEvent.click(iconButton);

  // after clicking the visibility toggle, there should be an input of type text
  const passwordInputText = container.querySelector('input[type="text"]');
  expect(passwordInputText).toBeInTheDocument();
});

test("successful registration shows success snackbar", async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({ msg: "Registered successfully" }),
  };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<RegisterPage />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "securepass" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText(/registered successfully/i)
  ).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
});

test("failed registration shows server error message", async () => {
  const mockResponse = {
    ok: false,
    json: async () => ({ err: "Registration failed reason" }),
  };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<RegisterPage />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "securepass" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText(/registration failed reason/i)
  ).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
});

test("network error during registration shows generic error message", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("network error"));

  render(<RegisterPage />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "securepass" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText(/an error occurred, please try again/i)
  ).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
});
