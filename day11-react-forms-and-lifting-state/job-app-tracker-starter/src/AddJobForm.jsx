import { useState } from "react";

const initialJobFormState = {
  title: "",
  company: "",
  location: "",
  minSalary: 0,
  maxSalary: 0,
  postDate: "",
  jobPostURL: "",
};

function AddJobForm({ onAddJob }) {
  const [jobFormState, setJobFormState] = useState(initialJobFormState);

  const handleInputChange = (e) => {
    setJobFormState((jobFormState) => {
      return {
        ...jobFormState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddJobFormSubmit = (e) => {
    e.preventDefault();
    // modal should close
    // form should clear
    setJobFormState(initialJobFormState);
    // new job should be added to the DOM
    onAddJob({
      ...jobFormState,
      minSalary: parseInt(jobFormState.minSalary),
      maxSalary: parseInt(jobFormState.maxSalary),
      status: 1,
    });
  };

  return (
    <form
      onSubmit={handleAddJobFormSubmit}
      className="selection:bg-blue-200 flex flex-col gap-2"
    >
      <h1>Add Job Posting</h1>

      <fieldset className="flex flex-col">
        <label htmlFor="title">Job Title</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.title}
          type="text"
          name="title"
          id="title"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Company</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.company}
          type="text"
          name="company"
          id="company"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="location">Location</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.location}
          type="text"
          name="location"
          id="location"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="minSalary">Salary Range</label>
        <div className="flex gap-2 items-center">
          <input
            onChange={handleInputChange}
            value={jobFormState.minSalary}
            type="number"
            name="minSalary"
            id="minSalary"
            className="bg-white border-4 focus:outline-none p-2"
          />{" "}
          -
          <input
            onChange={handleInputChange}
            value={jobFormState.maxSalary}
            type="number"
            name="maxSalary"
            id="maxSalary"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="postDate">postDate</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.postDate}
          type="date"
          name="postDate"
          id="postDate"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="jobPostURL">Original Job Post URL</label>
        <input
          onChange={handleInputChange}
          value={jobFormState.jobPostURL}
          type="url"
          name="jobPostURL"
          id="jobPostURL"
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
        type="submit"
      ></input>
    </form>
  );
}

export default AddJobForm;
