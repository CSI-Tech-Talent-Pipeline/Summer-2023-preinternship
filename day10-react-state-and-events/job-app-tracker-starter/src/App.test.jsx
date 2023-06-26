import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders button groups correctly", () => {
  render(<App />);

  expect(
    screen.getByRole("button", { name: "Bookmarked" })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Applying" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Applied" })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Interviewing" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Negotiating" })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Accepted" })).toBeInTheDocument();
});

test("clicking a button makes its filter active and changes its background", () => {
  render(<App />);

  const applyingButton = screen.getByRole("button", { name: "Applying" });
  expect(applyingButton).not.toHaveClass("bg-blue-500")
  fireEvent.click(applyingButton);
  expect(applyingButton).toHaveClass("bg-blue-500")
})