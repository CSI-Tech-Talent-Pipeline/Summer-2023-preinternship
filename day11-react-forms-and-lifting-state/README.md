# Day 11: React Forms & Lifting State

## Overview

In this session, we will continue our journey through React concepts by focusing on handling form inputs and submitting form data. We will learn how to lift the state up and down between components, create modal components, and manage their visibility.

## Agenda

1. Learn how to handle form inputs and their state.
2. Understand how to prevent the default form submission and handle it in JavaScript.
3. Learn to create a Modal component and control its visibility.
4. Understand the process of lifting state up and down between components.


## Tasks for the day:

- move `jobs` to state in the `App` component
- add a button to add a job
- create a modal component for displaying content
- create a form inside the modal with inputs for:
  - Title
  - Company
  - Location
  - minSalary
  - maxSalary
  - postDate
  - jobPostUrl
- When the form to add a job is submitted it should:
  - prevent the default behavior of sending a request to the same url and reloading the page
  - add the job data in the form to `jobs` in state variable
  - hide the modal so the page is visible again
  - clear the form state so that when we add a new job the form starts off empty
- Create separate a separate component for the `AddJobForm` and use callbacks to update parent component state

### Task 1: Move `jobs` to State in the `App` Component

To begin with, we need to move our `jobs` data to state in the `App` component:

```jsx
import jobsData from "./jobs";

function App() {
  const [jobs, setJobs] = useState(jobsData);
}
```

### Task 2: Add a Button to Add a Job

We're going to add a button for adding a new job. This button will eventually trigger our modal:

```jsx
<div className="flex justify-between mb-4">
  <div></div>
  <div><button className="bg-blue-500 px-4 py-2" onClick={() => setIsModalVisible(true)}>+ Add Job</button></div>
</div>
```

### Task 3: Create a Modal Component

We will create a new `Modal` component that we can use to display content. The visibility of the `Modal` will be controlled by passing in a `isVisible` prop:

```jsx
// ui/Modal.jsx
function Modal({ children, isVisible, hideModal }) {
  if (!isVisible) return null;
  return (
    <div onClick={hideModal} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-items-center items-center">
      <div onClick={e => e.stopPropagation()} className="max-w-xl w-144 mx-auto flex flex-col h-2/3">
        <button onClick={hideModal} className="text-white text-xl place-self-end">X</button>
        <div className="bg-white text-gray-800 p-8">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
```

### Task 4: Create a Form Inside the Modal

We will create a form inside the modal with inputs for `Title`, `Company`, `Location`, `minSalary`, `maxSalary`, `postDate`, and `jobPostUrl`.

The `Modal` component will look something like this:

```jsx
<Modal isVisible={isModalVisible} hideModal={() => setIsModalVisible(false)}>
  {/* form will go here */}
</Modal>
```

The form will look something like this:

```jsx
<form
  onSubmit={handleAddJobSubmit}
  className="selection:bg-blue-200 flex flex-col gap-2"
>
  {/* Form inputs will go here */}
</form>
```



And here's the form code we'll have

```jsx
<Modal
  isVisible={isModalVisible}
  hideModal={() => setIsModalVisible(false)}
>
  <form
    onSubmit={handleAddJobSubmit}
    className="selection:bg-blue-200 flex flex-col gap-2"
  >
    <h1>Add Job Posting</h1>
    <fieldset className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className="bg-white border-4 focus:outline-none p-2"
      />
    </fieldset>
    <fieldset className="flex flex-col">
      <label htmlFor="company">Company</label>
      <input
        type="text"
        name="company"
        id="company"
        className="bg-white border-4 focus:outline-none p-2"
      />
    </fieldset>
    <fieldset className="flex flex-col">
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        className="bg-white border-4 focus:outline-none p-2"
      />
    </fieldset>
    <fieldset className="flex flex-col">
      <label htmlFor="minSalary">Salary Range</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          name="minSalary"
          id="minSalary"
          className="bg-white border-4 focus:outline-none p-2"
        />{" "}
        -
        <input
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
        type="date"
        name="postDate"
        id="postDate"
        className="bg-white border-4 focus:outline-none p-2"
      />
    </fieldset>
    <fieldset className="flex flex-col">
      <label htmlFor="jobPostURL">Original Job Post URL</label>
      <input
        type="text"
        name="jobPostURL"
        id="jobPostURL"
        className="bg-white border-4 focus:outline-none p-2"
      />
    </fieldset>
    <input
      className="mt-4 bg-blue-500 hover:bg-blue-600 transition cursor-pointer py-2 text-white"
      type="submit"
    />
  </form>
</Modal>
```

Then, we need to add the event listeners and handlers for handling the form inputs as they update and also one to handle the form submit event. 

```jsx
// near the top of the App component
const [jobFormState, setJobFormState] = useState({
  title: "",
  company: "",
  location: "",
  minSalary: 0,
  maxSalary: 0,
  postDate: "",
  jobPostURL: "",
});

// farther down closer to the jsx
const {
  title,
  company,
  location,
  minSalary,
  maxSalary,
  postDate,
  jobPostURL,
} = jobFormState;

const handleInputChange = (e) => {
  setJobFormState(jobFormState => {
    return {
      ...jobFormState,
      [e.target.name]: e.target.value
    }
  })
}
// the idea with this handler is that we can update the formState object
// with the same function when any of our inputs change because the 
// name attributes of our input elements match exactly the keys in the formState
// we use the spread operator here to make sure that all of the existing
// formState remains when we do the update and only the changed input's state
// is updated.
```

### Task 5: Implement Form Submission

When the form to add a job is submitted, it should prevent the default behavior of sending a request to the same url and reloading the page, add the job data in the form to the `jobs` state variable, hide the modal so the page is visible again, and clear the form state so that when we add a new job the form starts off empty.

We'll need to create a handler for the form submission, and add it to our `form` element.

```jsx
const handleAddJobSubmit = (e) =>  {
  e.preventDefault();
  setJobs(jobs => jobs.concat({
    ...jobFormState,
    minSalary: parseInt(jobFormState.minSalary),
    maxSalary: parseInt(jobFormState.maxSalary),
    status: 1
  }));
  setIsModalVisible(false);
  setJobFormState({
    title: "",
    company: "",
    location: "",
    minSalary: 0,
    maxSalary: 0,
    postDate: "",
    jobPostURL: "",
  });
}
```

Now we've got a ton of code in App.jsx. You can imagine that as our application grows over time, this pattern is not sustainable. Instead, we should create a separate component for our `AddJobForm`. This mostly involves moving code from `App.jsx` to our new `AddJobForm.jsx` file, but there are a couple of key changes we need to make. In particular, we need to adjust our submit event handler.

If we try to run this event handler from the `AddJobForm` component, we'll have issues because the `setJobs` and `setIsModalVisible` functions still live in the `App` component. If we render `AddJobForm` from `App` that makes `App` the parent component. We could just pass `setJobs` and `setIsModalVisible` as props to our new component, but it's better to explicitly define a callback that creates a clear separation of concerns. 

Let's create a callback function called `onAddJob` and add it to the `App` component. This function's job will be to accept information from the form component and make the changes that are relevant to the `App` component. In this way, the `handleAddJobSubmit` event handler in the form component is responsible for managing the form behavior and state, and the `onAddJob` callback defined in the `App` is responsible for updating the parent component (`App`) in response to the event that occured in the child component (`AddJobForm`).

```jsx
// in src/App.jsx
const onAddJob = (job) => {
  setJobs((jobs) =>
    jobs.concat({
      ...job,
      minSalary: parseInt(job.minSalary),
      maxSalary: parseInt(job.maxSalary),
      status: 1,
    })
  );
  setIsModalVisible(false);
}
// in src/AddJobForm.jsx
function AddJobForm({ onAddJob }) {
  // ...
  const handleAddJobSubmit = (e) => {
    e.preventDefault();
    onAddJob(jobFormState)
    setJobFormState({
      title: "",
      company: "",
      location: "",
      minSalary: 0,
      maxSalary: 0,
      postDate: "",
      jobPostURL: "",
    });
  };

}
```

## Resources

- [Create a Custom Modal in React with Tailwind CSS](https://www.youtube.com/watch?v=nwJK-jo91vA)
- [Modals with React Router 6 & Remix (for later)](https://www.infoxicator.com/en/modals-with-react-router-6-and-remix)