import { render, screen } from '@testing-library/react'
import JobCard from './JobCard';

test("renders without crashing", () => {
  const job = {
    image: { src: "image.jpg", alt: "job image" },
    company: "Google",
    title: "Software Engineer",
    salary: "100k",
    location: "New York",
    postDate: "2022-06-20",
  };

  render(<JobCard job={job} />);
});

test("renders the correct job information", () => {
  const job = {
    image: { src: "image.jpg", alt: "job image" },
    company: "Google",
    title: "Software Engineer",
    salary: "100k",
    location: "New York",
    postDate: "2022-06-20",
  };

  render(<JobCard job={job} />);

  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  expect(screen.getByText('Google')).toBeInTheDocument();
  expect(screen.getByText('100k')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('2022-06-20')).toBeInTheDocument();
});

test("renders an image with the correct src and alt", () => {
  const job = {
    image: { src: "image.jpg", alt: "job image" },
    company: "Google",
    title: "Software Engineer",
    salary: "100k",
    location: "New York",
    postDate: "2022-06-20",
  };

  render(<JobCard job={job} />);

  const image = screen.getByAltText("job image");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "image.jpg");
});