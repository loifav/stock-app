/**
 * @file Ai.test.js
 * @description Unit tests for the Ai component
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ai from "@/components/ai/Ai";
import { runAi } from "@/ai/ai";

jest.mock("@/ai/ai", () => ({
  runAi: jest.fn(),
}));

if (typeof navigator !== "undefined") {
  if (!("clipboard" in navigator)) {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn(() => Promise.resolve()) },
      configurable: true,
    });
  } else {
    try {
      navigator.clipboard.writeText = jest.fn(() => Promise.resolve());
    } catch {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: jest.fn(() => Promise.resolve()) },
        configurable: true,
      });
    }
  }
}

describe("Ai Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main title", () => {
    render(<Ai />);
    expect(screen.getByText(/Generate Content with AI/i)).toBeInTheDocument();
  });

  it("updates the input value when typing", () => {
    render(<Ai />);
    const input = screen.getByLabelText(/Enter your prompt/i);
    fireEvent.change(input, { target: { value: "Hello AI" } });
    expect(input.value).toBe("Hello AI");
  });

  it("does nothing if the prompt is empty on click", async () => {
    render(<Ai />);
    const button = screen.getByRole("button", { name: /Generate/i });
    fireEvent.click(button);
    expect(runAi).not.toHaveBeenCalled();
  });

  it("calls runAi and opens the modal after a valid submit", async () => {
    runAi.mockResolvedValueOnce({ text: "AI generated text" });

    render(<Ai />);
    const input = screen.getByLabelText(/Enter your prompt/i);
    fireEvent.change(input, { target: { value: "Write a poem" } });

    const button = screen.getByRole("button", { name: /Generate/i });
    fireEvent.click(button);

    expect(runAi).toHaveBeenCalledWith("Write a poem");

    await waitFor(() => {
      expect(screen.getByText(/AI Response/i)).toBeInTheDocument();
      expect(screen.getByText(/AI generated text/i)).toBeInTheDocument();
    });
  });

  it("shows the spinner while loading", async () => {
    runAi.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ text: "Done" }), 200)
        )
    );

    render(<Ai />);
    const input = screen.getByLabelText(/Enter your prompt/i);
    fireEvent.change(input, { target: { value: "test loading" } });

    const button = screen.getByRole("button", { name: /Generate/i });
    fireEvent.click(button);

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });

  it("copies the response to the clipboard", async () => {
    runAi.mockResolvedValueOnce({ text: "Copy me" });

    render(<Ai />);
    const input = screen.getByLabelText(/Enter your prompt/i);
    fireEvent.change(input, { target: { value: "test copy" } });

    const button = screen.getByRole("button", { name: /Generate/i });
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/Copy to Clipboard/i));

    const copyButton = screen.getByText(/Copy to Clipboard/i);
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Copy me");
  });

  it("closes the modal when clicking Close", async () => {
    runAi.mockResolvedValueOnce({ text: "Close me" });

    render(<Ai />);
    const input = screen.getByLabelText(/Enter your prompt/i);
    fireEvent.change(input, { target: { value: "close modal" } });

    const button = screen.getByRole("button", { name: /Generate/i });
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/AI Response/i));

    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/AI Response/i)).not.toBeInTheDocument();
    });
  });
});
