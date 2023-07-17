import { Form, redirect } from "react-router-dom";

export async function action({ request, params }) {
  let formData = await request.formData();
  let jobData = Object.fromEntries(formData);
  jobData.minSalary = parseInt(jobData.minSalary);
  jobData.maxSalary = parseInt(jobData.maxSalary);
  jobData.status = 1;
  const response = await fetch("http://localhost:3000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return redirect("/");
}

function AddJob() {
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Add Job Posting</h1>

      <fieldset className="flex flex-col">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="minSalary">Salary Range</label>
        <div className="flex gap-2 items-center justify-between">
          <input
            type="number"
            name="minSalary"
            id="minSalary"
            className="w-[47%] border-4 focus:outline-none p-2"
          />{" "}
          -
          <input
            type="number"
            name="maxSalary"
            id="maxSalary"
            className="w-[47%] border-4 focus:outline-none p-2"
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="postDate">postDate</label>
        <input
          type="date"
          name="postDate"
          id="postDate"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="jobPostURL">Original Job Post URL</label>
        <input
          type="url"
          name="jobPostURL"
          id="jobPostURL"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
        type="submit"
      ></input>
    </Form>
  );
}

export default AddJob;
