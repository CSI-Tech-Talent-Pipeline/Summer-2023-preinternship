import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import jobs from "./jobs";

test("renders button group correctly", () => {
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
  expect(applyingButton).not.toHaveClass("bg-blue-500");
  fireEvent.click(applyingButton);
  expect(applyingButton).toHaveClass("bg-blue-500");

  //   expect(bookmarkedButton.classList.contains("active")).toBe(true);
});

test("renders only jobs that match the selected status filter", async () => {
  render(<App />);

  const bookmarkButton = screen.getByRole("button", { name: "Bookmarked" });
  fireEvent.click(bookmarkButton);

  const bookmarkedJobs = jobs.filter((job) => job.status === 1);

  const foundJobs = await screen.findAllByTestId("job-card");
  //   expect(bookmarkedJobs.length).toEqual(foundJobs.length);
  let filteredJobTitles = bookmarkedJobs.map((job) => job.title);
  filteredJobTitles.forEach((jobTitle) => {
    expect(screen.getByRole("heading", { name: jobTitle })).toBeInTheDocument();
  });
  let nonVisibleJobs = jobs.filter((job) => job.status !== 1);
  let nonVisibleJobTitles = nonVisibleJobs.map((job) => job.title);
  nonVisibleJobs.forEach((jobTitle) => {
    expect(
      screen.getByRole("heading", { name: jobTitle })
    ).not.toBeInTheDocument();
  });
});
