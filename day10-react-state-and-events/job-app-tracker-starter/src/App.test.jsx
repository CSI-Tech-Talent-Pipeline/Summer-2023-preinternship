import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import jobs from "./jobs";

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
  expect(applyingButton).not.toHaveClass("bg-blue-500");
  fireEvent.click(applyingButton);
  expect(applyingButton).toHaveClass("bg-blue-500");
});

test("renders only jobs that match the selected status filter", async () => {
  render(<App />);

  const bookmarkButton = screen.getByRole("button", { name: "Bookmarked" });
  await fireEvent.click(bookmarkButton);
  testFilter(1);

  const applyingButton = screen.getByRole("button", { name: "Applying" });
  await fireEvent.click(applyingButton);
  testFilter(2);

  
});

async function testFilter(selectedStatusId) {
  const displayedJobCards = screen.getAllByTestId("job-card");
  const displayedJobTitles = displayedJobCards.map((card) => {
    return within(card).getByRole("heading").textContent;
  });

  // jobs that match the selected status should be displayed
  jobs
    .filter((job) => job.status === selectedStatusId)
    .forEach((job) => {
      expect(displayedJobTitles).toContain(job.title);
    });

  // Check that no jobs with a different status are displayed
  jobs
    .filter((job) => job.status !== selectedStatusId)
    .forEach((job) => {
      expect(displayedJobTitles).not.toContain(job.title);
    });
}
