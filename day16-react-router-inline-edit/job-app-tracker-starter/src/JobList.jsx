import { NavLink, Link, useLoaderData } from "react-router-dom";
import { statusTextById, statusIdByText } from "./utils";
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
  
  const statusLinks = Object.keys(statusTextById).map((statusId) => {
    const buttonClass = "px-4 py-2 border";
    return (
      <NavLink
        to={`/jobs/byStatus/${statusTextById[statusId]}`}
        key={statusId}
        className={({ isActive }) =>
          isActive ? `bg-blue-500 ${buttonClass}` : buttonClass
        }
      >
        {statusTextById[statusId]}
      </NavLink>
    );
  });

  const filteredJobs = jobs.filter((job) => true);

  const jobCards = filteredJobs.map((job) => {
    return <JobCard job={job} key={job.id} />;
  });

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 my-4">{statusLinks}</div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <Link
            to="/jobs/new"
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:text-white transition"
          >
            + Add Job
          </Link>
        </div>
      </div>
      {jobCards}
    </>
  );
}

export default JobList;