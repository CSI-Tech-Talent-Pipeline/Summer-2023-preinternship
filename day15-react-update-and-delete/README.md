# Day 15 React - Update & Delete

Today's lesson will focus on integrating update and delete functionality to the Job Application tracker using React Router. We'll be applying `loaders` and `actions` to implement the functionality and also discussing `redirects` and handling loading states.
## Tasks for Update and Delete

- Add the `react-icons` library for edit/delete UI elements
- Update our `Root` component
- Add a `Link` to edit a job to the `job` component
- Create the editJob component and add the edit page UI
- Add a job loader
- Add the new editJob route
- Add a link to the new editJob route to the `job` component
- Updating jobs with form data
  - Add an action to the edit module
- Add the ability to Delete Notes
  - Adding a delete button to notes 
  - Adding a route for deleting notes


## Add the `react-icons` library for edit/delete UI elements

Install the package with the following command.
```bash
npm install react-icons
```

Now, we can import icons from popular icon libaries directly into our project as react components. [See the docs](https://react-icons.github.io/react-icons/) for examples and to search the available icons.

Before we get into the content for today, let's add a couple of icons! 

- Add a Home icon to the `Root` component
- Add a paper icon to the `JobCard` details link

```jsx
// src/routes/root.jsx
import { FaHome } from "react-icons/fa";

// ...
<Link className="text-2xl flex items-center gap-1 px-2" to="/">
  <FaHome />
  Job Application Tracker
</Link>
```

```jsx
// src/JobCard.jsx
// ...
import { BiDetail } from "react-icons/bi";

// ...
<Link 
  to={`/jobs/${id}`}
  className="flex items-center gap-2 p-5 text-xl relative -top-6"
>
  <BiDetail /> Details
</Link>
```

## Add a `Link` to edit a job to the `job` component
We'll want a pencil icon for our edit link 

```jsx
import { FaPencilAlt } from "react-icons/fa";
```

> Note when importing icons from this library, the first portion of the component name indicates the library from which the icon is taken. These first two letters must match the end of the import path. In this case, we import from `"react-icons/fa"` because our Icon component begins with `Fa`.


```jsx
// src/routes/job.jsx
// ...
<p>Job posted on: {postDate}</p>
<div className="flex my-2">
  <Link
    to={`/jobs/${id}/edit`}
    className="flex items-center gap-2 bg-blue-400 p-2 rounded-sm"
  >
    <FaPencilAlt /> Edit
  </Link>
</div>
// ...
```

### Create the edit component and loader

This will be the form to edit a job application. We'll need to load the job from our API in order to populate the default values for our form inputs. The form will also include some more inputs that

```jsx
// src/routes/editJob.jsx
import { Form, useLoaderData, Link } from "react-router-dom";
import { statusTextById } from "../utils";

export async function loader({ params }) {
  const jobResponse = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  return { job };
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
```


### Add the new edit route and configure the loader

```jsx
// src/main.jsx

/* existing code */
import EditJob, { loader as editJobLoader } from "./routes/editJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <JobList />,
        loader: jobLoader,
      },
      {
        path: "jobs/new",
        element: <AddJobForm />,
        action: addJobAction,
      },
      {
        path: "jobs/byStatus/:status",
        element: <JobList />,
        loader: jobLoader,
      },
      {
        path: "jobs/:jobId",
        element: <Job />,
        errorElement: <ErrorPage />,
        loader: jobDetailLoader,
        action: notesAction,
      },
      {
        path: "jobs/:jobId/edit",
        element: <EditJob />,
        errorElement: <ErrorPage />,
        loader: editJobLoader
      },
    ],
  },
]);
```

## Updating jobs with form data

Now that we've configured the route, loader and component, we need to add an action to describe what should happen when this form gets submitted.

### Add an action to the edit module

When we add the action, we're also going to want to add a `redirect` so that the form submission results in a client side navigation to our job detail route (`/jobs/:id`).

```jsx
// src/routes/editJob.jsx
import { Form, useLoaderData, redirect } from "react-router-dom";

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
```

If we try to submit the form now, we get a *Method Not Allowed* error message. This is because we haven't imported the action and hooked it up to React Router yet.

### Wire up the action to the edit route

```jsx
// src/main.jsx

/* existing code */
import EditJob, { 
  loader as editJobLoader,
  action as editJobAction } from "./routes/editJob";

const routes = createBrowserRouter([
  // ...
  {
    path: "jobs/:jobId/edit",
    element: <EditJob />,
    errorElement: <ErrorPage />,
    loader: editJobLoader,
    action: editJobAction
  },
])

```

### Adding a Global Pending state

React Router will wait to udpate the DOM to the new component until after the data in the loader is available. If we're on a slower connection, this can take a noticeable amount of time. To indicate loading to our users, we can add a global pending state in our root component and adjust some styling appropriately. 

We could do a loading spinner or a progress bar, but in this case we're just going to adjust the opacity of our main content area. When we're navigating to a new route and haven't arrived yet, we'll set the opacity to 50%, and when we're not in a loading state, we'll set it back to 100%. We're adding a transition to the opacity property here so that it will fade in and out.

```jsx
// src/routes/root.jsx
...
<div className="mx-auto max-w-4xl sm:px-12 px-4 transition-opacity opacity-100">
  <Outlet />
</div>
```

Let's add the `classNames` function to this component to make this conditional styling easier to manage. We'll also need the `useNavigation` hook from `react-router-dom`. The [`useNavgiation`](https://reactrouter.com/en/main/hooks/use-navigation) hook will allow us to see if we're currently navigating between routes via its state property.

```jsx
// src/routes/root.jsx
import {
  // existing code
  useNavigation,
} from "react-router-dom";
import classNames from "classnames"

function Root() {
  // ...
  const navigation = useNavigation();
  // add this
  const outletClasses = classNames(
    "mx-auto max-w-4xl sm:px-12 px-4 transition-opacity", 
    {
      "opacity-100": navigation.state !== "loading",
      "opacity-50": navigation.state === "loading"
    }
  )
  // ...
  // and use it in the JSX
  <div className={outletClasses}>
    <Outlet />
  </div>
}
```

Turn on Network Throttling and try navigating betweeen different selected job statuses and you'll see this in action!

## Add the ability to Delete Notes

This is what our job component looks like at the moment.

```jsx
// src/routes/job.jsx
import {
  Form,
  useLoaderData,
  Link,
} from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { statusTextById, formatTime } from "../utils";

export async function loader({ params }) {
  const jobResponse = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  const notesResponse = await fetch(
    `http://localhost:3000/notes?jobId=${params.jobId}`
  );
  const notes = await notesResponse.json();
  return { job, notes };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const preparedNote = {
    ...Object.fromEntries(formData),
    timestamp: new Date(),
    jobId: parseInt(params.jobId),
  };
  const response = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedNote),
  });
  const note = await response.json();
  return { note };
}

function Job() {
  const { job, notes, } = useLoaderData();
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

  const renderedNotes = notes.map((note) => {
    return (
      <div className="relative p-4 pb-10 bg-slate-700 text-slate-50 rounded-md my-2">
        {note.content}
        <div className="absolute bottom-0 left-0 pb-2 pl-4">
          <i className="text-slate-300">{formatTime(note.timestamp)}</i>
        </div>
      </div>
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/">{"<"} Back</Link>
      <h1>{title}</h1>
      <p>
        <i>{company}</i>
      </p>
      <p>{location}</p>
      <p>{`$${minSalary} - $${maxSalary}`}</p>
      <p>Job posted on: {postDate}</p>
      <div className="flex my-2">
        <Link
          to={`/jobs/${id}/edit`}
          className="flex items-center gap-2 bg-blue-400 p-2 rounded-sm"
        >
          <FaPencilAlt /> Edit
        </Link>
      </div>
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
      <h2 className="text-xl my-2">Notes</h2>
      <Form className="my-4 flex gap-2" method="post">
        <input
          placeholder="add a note..."
          className="flex-1 p-2"
          name="content"
        />
        <button className="bg-blue-500 px-3 text-2xl rounded-sm" type="submit">
          +
        </button>
      </Form>
      <div>{renderedNotes}</div>
    </div>
  );
}

export default Job;
```

In order to add the ability to delete a note, we'll want to add a UI element for the user to interact with. In this case, we'll want a button containing a TrashCan icon. 

```jsx
// src/routes/job.jsx
import { FaPencilAlt, FaTrash } from "react-icons/fa";
// ...
const renderedNotes = notes.map((note) => {
  return (
    <div className="relative p-4 pb-10 bg-slate-700 text-slate-50 rounded-md my-2">
      {note.content}
      <div className="absolute bottom-0 left-0 w-full pb-2 px-4 flex justify-between">
        <i className="text-slate-300">{formatTime(note.timestamp)}</i>
        <button><FaTrash /></button>
      </div>
    </div>
  );
});

```

Next, we'll want to wrap the button in a `Form` element that will send a request to destroy this note:

```jsx
<Form
  method="post"
  action={`/notes/${note.id}/destroy?jobId=${id}`}
  onSubmit={(event) => {
    if (!confirm("Please confirm you want to delete this record.")) {
      event.preventDefault();
    }
  }}
>
  <button>
    <FaTrash />
  </button>
</Form>
```

Notice this time that we're including an `action` and `onSubmit` attribute. 

- The `action` indicates where the request should be sent when the form is submitted (we're including the jobId as a query parameter so we can redirect back upon completion)
- The `onSubmit` opens a confirm dialog to ensure that the user wants to go ahead with deleting the record before proceeding.
  - If the user presses cancel, `event.preventDefault()` will stop the action request from going through.

If we submit now, we'll get a 404 error, because we haven't configured this route yet.

### Adding a route to destroy a note

This route won't actually be displaying a component, it's main purpose is handling a user behavior. We can think of this behavior as an action, so let's add an action to the file!

```jsx
// src/routes/destroyNote.jsx
import { redirect } from "react-router-dom";

export async function action({ params }) {
  const response = await fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "DELETE"
  })
  const jobId = new URL(request.url).searchParams.get("jobId");
  return redirect(`/jobs/${jobId}`)
}
```

And now we need to hook that up to our router:

```jsx
{
  path: "notes/:noteId/destroy",
  action: destroyNoteAction,
},
```

This is the approach we'd want to take if we were redirecting to another route after deleting a record. For example, if we wanted to implement delete functionality for the `Job` record as well, and then redirect back to the root route, this would be a good approach.

## Handling multiple actions in the same route without redirects

In the case where we have multiple actions that can be taken on the same route and they shouldn't result in navigation, we can use another hook provided by react router called `useFetcher()`. This hook will allow us to trigger an action (and then the loader) without a redirect.

```jsx
// src/routes/job.jsx
import {
  // ...
  useFetcher
} from "react-router-dom";
```

Then we replace our `Form` with `fetcher.Form`
```jsx
<fetcher.Form
  method="post"
  onSubmit={(event) => {
    if (!confirm("Please confirm you want to delete this record.")) {
      event.preventDefault();
    }
  }}
>
  <input type="hidden" name="action" value="deleteNote" />
  <input type="hidden" name="noteId" value={note.id} />
  <button>
    <FaTrash />
  </button>
</fetcher.Form>
```

and remove the `action` pointing to the `notes/:id/destroy` route. This form will use the existing `action` and `loader` configured on the `jobs/:id` route which renders this component. The last step is to ensure that our `action` function has conditional logic applied so we're able to delete notes as well as add them!

```jsx
// src/routes/job.jsx
// ...
export async function action({ request, params }) {
  const formData = await request.formData();
  if (formData.get("action") === "deleteNote") {
    const response = await fetch(`http://localhost:3000/notes/${formData.get("noteId")}`, { method: "DELETE" })
    return { ok: true };
  }
  // ...
}
```


## Resources 
- [React Icons](https://react-icons.github.io/react-icons/)
- [New Features In React Router 6.4 (video)](https://www.youtube.com/watch?v=L2kzUg6IzxM)
- [React Router Tutorial](https://beta.reactrouter.com/en/main/start/tutorial)
- [useFetcher](https://beta.reactrouter.com/en/main/hooks/use-fetcher)
- [useNavigation](https://beta.reactrouter.com/en/main/hooks/use-navigation)
- [actions](https://beta.reactrouter.com/en/main/route/action)
- [loaders](https://beta.reactrouter.com/en/main/route/loader)
