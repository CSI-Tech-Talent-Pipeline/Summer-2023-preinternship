import { Form, useLoaderData, Link, redirect } from "react-router-dom";
import { statusTextById } from "../utils";

export async function loader({ params }) {
  const jobResponse = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  return { job };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const preparedJob = {
    ...updates,
    minSalary: parseInt(updates.minSalary),
    maxSalary: parseInt(updates.maxSalary)
  }
  const response = await fetch(`http://localhost:3000/jobs/${params.jobId}`, { 
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preparedJob)
  })
  
  return redirect(`/jobs/${params.jobId}`)
}

function EditJob() {
  const { job } = useLoaderData();

  const statusOptions = Object.keys(statusTextById).map((id) => {
    return (
      <option key={id} value={id}>
        {statusTextById[id]}
      </option>
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to={`/jobs/${job.id}`}>{"<"} Back</Link>
      <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
        <h1 className="text-white">Edit Job Posting</h1>
        <div className="sm:flex gap-2 items-center justify-between">
          <fieldset className="sm:w-1/3 flex flex-col">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              className="border-4 focus:outline-none p-2 h-12"
              defaultValue={job.status}
            >
              {statusOptions}
            </select>
          </fieldset>
          <fieldset className="sm:w-2/3 flex flex-col">
            <label htmlFor="CompanyContact">Company Contact</label>
            <input
              type="email"
              name="companyContact"
              id="CompanyContact"
              className="border-4 focus:outline-none p-2"
              defaultValue={job.companyContact}
            />
          </fieldset>
        </div>
        <div className="sm:flex gap-2 items-center justify-between">
          <fieldset className="sm:w-1/3">
            <label htmlFor="applicationDate">Application Date</label>
            <input
              type="date"
              name="applicationDate"
              id="applicationDate"
              className="border-4 focus:outline-none p-2 w-full"
              defaultValue={job.applicationDate}
            />{" "}
          </fieldset>
          <fieldset className="sm:w-1/3">
            <label htmlFor="lastContactDate">Last Contact Date</label>
            <input
              type="date"
              name="lastContactDate"
              id="lastContactDate"
              className="border-4 focus:outline-none p-2 w-full"
              defaultValue={job.lastContactDate}
            />
          </fieldset>
          <fieldset className="sm:w-1/3 flex flex-col">
            <label htmlFor="postDate">Posting Date</label>
            <input
              type="date"
              name="postDate"
              id="postDate"
              className="border-4 focus:outline-none p-2"
              defaultValue={job.postDate}
            />
          </fieldset>
        </div>

        <fieldset className="flex flex-col">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-4 focus:outline-none p-2"
            defaultValue={job.title}
          />
        </fieldset>
        <div className="sm:flex gap-2 items-center justify-between">
          <fieldset className="sm:w-[47%] flex flex-col">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              className="border-4 focus:outline-none p-2"
              defaultValue={job.company}
            />
          </fieldset>
          <fieldset className="sm:w-[47%] flex flex-col">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              className="border-4 focus:outline-none p-2"
              defaultValue={job.location}
            />
          </fieldset>
        </div>
        <fieldset className="flex flex-col">
          <label htmlFor="minSalary">Salary Range</label>
          <div className="flex gap-2 items-center justify-between">
            <input
              type="number"
              name="minSalary"
              id="minSalary"
              className="w-[47%] border-4 focus:outline-none p-2"
              defaultValue={job.minSalary}
            />{" "}
            -
            <input
              type="number"
              name="maxSalary"
              id="maxSalary"
              className="w-[47%] border-4 focus:outline-none p-2"
              defaultValue={job.maxSalary}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="jobPostUrl">Original Job Post URL</label>
          <input
            type="url"
            name="jobPostUrl"
            id="jobPostUrl"
            className="border-4 focus:outline-none p-2"
            defaultValue={job.jobPostUrl}
          />
        </fieldset>
        <input
          className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
          type="submit"
        ></input>
      </Form>
    </div>
  );
}

export default EditJob;
