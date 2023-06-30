# Implementing React Router in the Job Application Tracker

After you've gone through the first half of the [React Router v6 tutorial from official docs](https://reactrouter.com/en/main/start/tutorial) you should be prepared to follow along with these changes.

## Todos for Job Application Tracker

- install react-router dom: `npm install react-router-dom`
- decide what our routes are going to be
- make our `statusButtons` into `<NavLink>`s
- create a src/routes directory
- create src/routes/root.jsx
  - it should have our navigation bar and an outlet for
- 👉 Set <Root> as the root route's element
- handle not found errors (create src/not-found.jsx)
- set the not found component as the errorElement for the root route
- Create the Jobs route module
- Import the Jobs component and create a new route
- consider data loading
- Export a loader from root.jsx
- Configure the loader on the route
- Access and render the data
- Data Writes & HTML Forms
- Creating Jobs (using a form and an action function)
- Import and set the action on the route
- URL Params in Loaders
- Add a loader to the job page and access data with useLoaderData
- Configure the loader on the route

## Decide what our routes are going to be

|  Route | Element  |  Description |
|---|---|---|
| /  | `<Root />`  | lists all jobs  |
| `/jobs/new`  | `<AddJobForm>`  | form to add a new job  |
|  `/jobs/:jobId` | `<Job>`  |  show details about a job and a form for adding notes |
|  `/jobs/filterBy/:status` |  `<Root>` |  list all jobs that match the `:status` |


## create src/routes/root.jsx

```jsx
const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

function Root() {
  const statusButtons = Object.keys(statuses).map((statusId) => {
    const buttonClass = "px-4 py-2 border";
    return (
      <button
        key={statusId}
        className={buttonClass}
      >
        {statuses[statusId]}
      </button>
    );
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Job Application Tracker</h1>
      <div className="grid grid-cols-6 my-4">{statusButtons}</div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <button
            className="bg-blue-500 px-4 py-2 hover:bg-blue-600 transition"
          >
            + Add Job
          </button>
        </div>
      </div>


    </div>
  );
}

export default Root;
```


## Set <Root> as the root route's element

```jsx
// src/main.jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Make our statusButtons NavLinks

React Router provides a special comopnent called [`<NavLink>`](https://reactrouter.com/en/main/components/nav-link) that lets us assign an active class to the active route.

```jsx
// src/root.jsx

// up top:
import { NavLink } from "react-router-dom";

// inside function Root()
const statusLinks = Object.keys(statuses).map((statusId) => {
  const buttonClass = "px-4 py-2 border";
  return (
    <NavLink
      to={`/jobs/byStatus/${statuses[statusId]}`}
      key={statusId}
      className={({ isActive }) =>
isActive ? `bg-blue-500 text-white ${buttonClass}` : buttonClass
}
    >
      {statuses[statusId]}
    </NavLink>
  );
});

// in the returned jsx:
<div className="grid grid-cols-3 sm:grid-cols-6 my-4">
  {statusLinks}
</div>
```

Now, when we try to click on one of the buttons we get a React Router generated error. Let's fix it more gracefully,

## Handle not found errors

```jsx
// src/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="px-8 flex flex-col items-center h-screen justify-center"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

This doesn't quite work yet, so let's continue.

## Set the ErrorPage component as the errorElement for the root route

```jsx
/* previous imports */
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
```

## Create the Job module

```jsx
// src/routes/job.jsx
function Job() {
  return (
    <h1>A Job</h1>
  )
}

export default Job;
```

## Import the Job component and create a new route

```jsx
import Job from "./routes/Job";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
  },
]);
```

## Loading Data

Loading Data
URL segments, layouts, and data are more often than not coupled (tripled?) together. We can see it in this app already:

| URL Segment | Component | Data               |
| :---------- | :-------- | :----------------- |
| /           | `<Root>`    | list of jobs       |
| jobs/:id    | `<Job>`     | individual job |

## Export a loader from `root.jsx`

```jsx
export async function loader() {
  const response = await fetch("http://localhost:3000/jobs"); 
  const jobs = await response.json(); 
  return { jobs };
}
```

## Configure the loader on the route

```jsx
// src/main.jsx
import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
  },
]);
```

## Access and render the data

```jsx
// src/JobList.jsx
// up top import useLoaderData
import { useLoaderData } from "react-router-dom";
import JobCard from "./JobCard";

function JobList() {
  // implement useLoaderData() to access the jobs from the loader function
  const { jobs } = useLoaderData();

  // return true for now so we see all jobs
  const filteredJobs = jobs.filter((job) => true);
  // when we implement the routes for bookmarked, applying, applied, etc. we'll update this callback to work appropriately

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
```

This works okay, but we're going to want to have nested routes in the root component and this loader won't be necessary for all of them. The `JobList` component is the one that will use this loader. So, let's move it from `src/root.jsx` to `src/JobList.jsx` and then change the import in main.jsx.

```jsx
// src/JobList.jsx
import { useLoaderData } from "react-router-dom";
import JobCard from "./JobCard";

export async function loader() {
  const response = await fetch("http://localhost:3000/jobs");
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
```

## Add nested routes to root to allow for the form to take the place of the JobList

```jsx
// in src/main.jsx
// change the import:
import JobList, { loader as jobLoader } from "./JobList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <JobList />,
        loader: jobLoader
      }
    ]
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
  },
]);
```

Add an `<Outlet />` to the `<Root/>` component that will allow the JobList to be rendered.

```jsx
// src/root.jsx 
function Root() {
  // ...
  return (
    <div className="mx-auto max-w-4xl sm:px-12 px-4">
      <h1>Job Application Tracker</h1>
      <div className="grid grid-cols-3 sm:grid-cols-6 my-4">{statusLinks}</div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <Link to="/jobs/new" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:text-white transition">
            + Add Job
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
```

## Data Writes & HTML Forms

## Creating Jobs

### Make the Add Job Button a `<Link>`

```jsx
// src/root.jsx
// this is what the button looked like before
<button className="bg-blue-500 px-4 py-2 hover:bg-blue-600 transition">
  + Add Job
</button>
// replace it with this:
<Link to="/jobs/new" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:text-white transition">
  + Add Job
</Link>
```

Also, we'll need to make sure we add the `import { Link }` from react-router-dom.  Now try clicking on the link. Notice that it's actually currently pointing at our dummy `Job` component/route. So, let's add another nested route here to root so that the `'/jobs/new'` route can point to the form and display it within the `<Outlet />` in root rather than matching our other `'/jobs/:id'` route.

```jsx
// src/main.jsx
// add import for AddJobForm
import AddJobForm from "./AddJobForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <JobList />,
        loader: rootLoader
      },
      {
        path: "/jobs/new", 
        element: <AddJobForm />
      }
    ]
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
  },
]);
```

Here's what our form component looks like now:

```jsx
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

  const handleAddJobFormSubmit = async (e) => {
    e.preventDefault();
    // modal should close
    // form should clear
    setJobFormState(initialJobFormState);
    // new job should be added to the DOM
    const preparedJob = {
      ...jobFormState,
      minSalary: parseInt(jobFormState.minSalary),
      maxSalary: parseInt(jobFormState.maxSalary),
      status: 1,
    };
    // send request to save job to db and get response
    const response = await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedJob),
    });
    console.log("response", response);
    const savedJob = await response.json();
    console.log("savedJob", savedJob);
    onAddJob(savedJob);
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
```

incorporating react router, it'll be this:
```jsx
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jobData)
  })
  return redirect('/');
}

function AddJobForm() {
  
  return (
    <Form
      method="post"
      className="selection:bg-blue-200 flex flex-col gap-2"
    >
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

export default AddJobForm;
```

For this to work, we need to connect the action to the route.


## Import and set the action on the route

```jsx
// src/main.jsx
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import Job from "./routes/job";
import JobList, { loader as jobLoader } from "./JobList";
import AddJobForm, { action as addJobAction} from "./AddJobForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <JobList />,
        loader: jobLoader
      },
      {
        path: "jobs/new", 
        element: <AddJobForm />,
        action: addJobAction
      }
    ]
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
  },
]);
```

## URL Params in Loaders

## We wnat to add a link to each job within the JobCard component

```jsx
// src/JobCard.jsx
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  // pull data from argument
  const {
    id,
    image,
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
  } = job;

  return (
    <div data-testid="job-card" className="flex items-start gap-4 my-13">
      {image ? <img src={image.src} alt={image.alt} /> : <img src="https://placehold.co/100x100" alt="No company logo available" />}
      <div>
        <h2 className="text-xl font-bold relative -top-1.5" data-testid={id}>{title}</h2>
        <p className="text-gray-400 italic mb-2">{company}</p>
        <ul className="text-sm">
          <li>{location}</li>
          <li>{`$${minSalary} - $${maxSalary}`}</li>
          <li>{postDate}</li>
        </ul>
      </div>
      <Link to={`/jobs/${id}`}>Details</Link>
    </div>
  );
}

// ...
```

## Add a loader to the Job page and access data with useLoaderData

```jsx
// src/routes/job.jsx
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await response.json();
  return { job };
}

function Job() {
  const { job } = useLoaderData();
  return (
    <h1>A Job</h1>
  )
}

export default Job;
```


## Configure the loader on the route

```jsx
// src/main.jsx
// other imports
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import Job, { loader as jobDetailLoader } from "./routes/job";
import JobList, { loader as jobLoader } from "./JobList";
import AddJobForm, { action as addJobAction} from "./AddJobForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <JobList />,
        loader: jobLoader
      },
      {
        path: "jobs/new", 
        element: <AddJobForm />,
        action: addJobAction
      }
    ]
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
    loader: jobDetailLoader
  },
]);

// ...
```

Now, let's fill in the Job component with relevant details. For this, we're going to need access to the job statuses, so I'm going to create a file called `src/utils.js` where we can store important constants and functions that will be reused in multiple components.

```jsx
// src/utils.js
export const statusTextById = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

export const statusIdByText = Object.keys(statusTextById).reduce((obj, id) => {
  obj[statusTextById[id]] = id;
  return obj;
}, {})

const mediumTime = new Intl.DateTimeFormat("en", {
  timeStyle: "medium",
  dateStyle: "short",
});

export const formatTime = (timeString) => {
  return mediumTime.format(new Date(timeString))
}
```

```jsx
import { useLoaderData } from "react-router-dom";
import { statusTextById } from "../utils";

export async function loader({ params }) {
  const jobResponse = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  return { job };
}

function Job() {
  const { job } = useLoaderData();
  const {
    id,
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
    applicationDate,
    lastContactDate,
    companyContact,
    status,
  } = job;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1>{title}</h1>
      <p>
        <i>{company}</i>
      </p>
      <p>{location}</p>
      <p>{`$${minSalary} - $${maxSalary}`}</p>
      <p>Job posted on: {postDate}</p>
      <div className="overflow-auto">
        <table className="mt-4 stripe hover table-auto border-slate-700 text-center overflow-scroll w-full">
          <thead>
            <tr className="overflow-x-scroll border">
              <th className="p-4">Current Status</th>
              <th className="p-4">Application Date</th>
              <th className="p-4">Last Contact Date</th>
              <th className="p-4">Company Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="overflow-x-scroll border">
              <td className="p-4">{statusTextById[status]}</td>
              <td className="p-4">{applicationDate || "N/A"}</td>
              <td className="p-4">{lastContactDate || "N/A"}</td>
              <td className="p-4">{companyContact || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Job;
```

We also want to add a link from this page back to the previous route. For this, we can use the `Link` component from React Router.

```jsx
import { Link, useLoaderData } from "react-router-dom";

function Job() {
  // ...
  return (
      <div className="max-w-4xl mx-auto p-8">
        <Link to="/">{'<'} Back</Link>
}
```

## Finally, let's get our NavLinks working for filtering jobs by status

```jsx
// src/main.jsx

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <JobList />,
        loader: jobLoader
      },
      {
        path: "jobs/new", 
        element: <AddJobForm />,
        action: addJobAction
      },
      // add this
      {
        path: "jobs/byStatus/:status",
        element: <JobList />,
        loader: jobLoader
      }
    ]
  },
  {
    path: "jobs/:jobId",
    element: <Job />,
    errorElement: <ErrorPage />,
    loader: jobDetailLoader,
    action: notesAction
  },
]);
```

In the root CSS, let's remove the styles for `a` tags:

```css
/* a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
} */
```

Now, inside of the `loader` in `JobList`, we want to add a reference to `params` so we can filter by jobs. This is what the loader currently looks like

```jsx
// src/JobList.jsx
export async function loader() {
  const response = await fetch("http://localhost:3000/jobs");
  const jobs = await response.json();
  return { jobs };
}
```

We want to make a reference to the url params in the loader:

```jsx
// src/JobList.jsx
import { statusIdByText } from "./utils";
export async function loader({ params }) {
  let url = "http://localhost:3000/jobs";
  if(params.status) {
    url += `?status=${statusIdByText[params.status]}`;
  }
  const response = await fetch(url);
  const jobs = await response.json();
  return { jobs };
}
```

Just doing this allows us to change which jobs are visible based on which url we have active. The `status` in the browser url is going to affect which url we fetch to in our `loader`. The `useLoaderData` hook will be refreshed with the new value for `jobs` when the browser url changes.

Last todo here is to make our Job Application Tracker header a link to the main page where all jobs are visible.

```jsx
// src/routes/root.jsx
<h1>
  <Link to="/">Job Application Tracker</Link>
</h1>
```

## Resources

- [React Router v6 guide](https://blog.logrocket.com/react-router-v6-guide/)
- [React Router v6 tutorial from official docs](https://reactrouter.com/en/main/start/tutorial)
- [Building a React modal module with React Router](https://blog.logrocket.com/building-react-modal-module-with-react-router/)
- [Another approach to modal routes in React Router v6](https://stackoverflow.com/questions/75447901/modal-at-different-route-in-react-router-v6-that-uses-the-navigate-component)
- [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)