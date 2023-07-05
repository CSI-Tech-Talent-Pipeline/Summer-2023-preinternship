import { useLoaderData } from "react-router-dom";
import { statusIdByText } from "./utils";
import JobCard from "./JobCard";

export async function loader({ params }) {
  let url = "http://localhost:3000/jobs";
  if (params.status) {
    url += `?status=${statusIdByText[params.status]}`;
  }
  const response = await fetch(url);
  const jobs = await response.json();
  return { jobs };
}

function JobList() {
  const { jobs } = useLoaderData();

  const filteredJobs = jobs.filter((job) => true);

  const jobCards = filteredJobs.map((job) => {
    return <JobCard job={job} key={job.id} />;
  });

  return (
    <>
      {jobCards}
    </>
  )
}

export default JobList;