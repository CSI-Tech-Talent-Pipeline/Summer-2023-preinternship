# Day 10: React - State & Events

Students Will Be Able To (SWBAT):
---------------------------------

- Explain the importance of state
- Explain the difference between state and props
- Observe how to use the useState hook
- Observe how to use DOM events to manipulate state in React


Agenda
------

1.  **Understanding State in React**
    -   The importance of state
    -   The relationship between state and events
    -   Documentation review
2.  **State and Events applied to the Job Application Tracker**
    -   Testing interactive components
    -   Embedding JavaScript in JSX




<h3 style="text-align: center;"><strong>Why is state important?</strong></h3>

🏹 State is used to track information that changes over time. 

🏹 Props are passed from the parent component, state is internal to a component. 

🏹 Values stored in state are meant to change, especially in response to user behaviors (as the user interacts with the DOM and triggers events).

🏹 We can do conditional rendering based on state values. This is a key component of declarative programming in React: we tie our components to our state by integrating state values into our JSX rendering logic. This way, changes in state eventually cause changes to the DOM (Updating the Dark Mode button!).


---

## React Flow

<img height="360px" alt="Data Display Behavior" src="https://raw.githack.com/learn-co-curriculum/SENG-LIVE-013023-Phase-2-React/main/02_state_and_events/assets/export/data-display-behavior.drawio.svg" />


🔑 We use state to store data that may change in response to user behavior

🏹 To work with state in a functional component, we use the `useState` hook

## Let's review these docs 

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [State: A component's memory](https://react.dev/learn/state-a-components-memory)
- [Render & Commit](https://react.dev/learn/render-and-commit)


## Adding State & Events to the Job Application Tracker

For the codealong today, We're going to follow a test driven approach to building out some new features for our application. First, we'll be using state to keep track of our `jobs` now and introducing a couple of events and new UI elements. 

Todos:
- Add a group of buttons matching the job application statuses we'll be tracking:
  - Bookmarked
  - Applying
  - Applied
  - Interviewing
  - Negotiating
  - Accepted
- each job in `jobs.js` now includes a status property (an integer from 1-6) representing one of the statuses above
- clicking on a button in `App.js` should indicate which status we are considering at the moment.
- we'll want to style the button that is active differently from the other buttons (using the `classnames` library to do it)
- after we've got the styles working, let's make sure that we only see jobs that match the currently selected status.




## Test Case 1: Button Group Renders Correctly
In App.test.js, we will write a test to ensure that the button group is being rendered correctly with the six status buttons.

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button group correctly', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Bookmarked' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Applying' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Applied' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Interviewing' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Negotiating' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Accepted' })).toBeInTheDocument();
});
```

Let's run the test using npm test and it should fail as we have not yet implemented the button group.

For this, we'll want to think a bit about how to represent the statuses in our code. Status is a value that we might represent as an enum. This is a numberical type where each number represents a particular string or symbol. In this case, a number from 1-6 represents one of the possible values for the status. We'll want to create a constant for these statuses.

```js
const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};
```

Next, let's go to App.js and add the button group:

```jsx
const buttons = Object.keys(statuses).map(statusId => {
  return (
    <button
      key={statusId}
    >
      {statuses[statusId]}
    </button>
  )
})
```

```jsx
import JobCard from "./JobCard";
import jobs from "./jobs";
import "./App.css";

const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

function App() {
  const jobCards = jobs.map((job, i) => {
    return <JobCard job={job} key={i} />;
  });

  const buttons = Object.keys(statuses).map((statusId) => {
    return <button key={statusId}>{statuses[statusId]}</button>;
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Job Application Tracker</h1>
      <div className="grid grid-cols-6">
        {buttons}
      </div>
      {jobCards}
    </div>
  );
}

export default App;
```
If we run the test again, it should now pass.

## Test Case 2: Active Button Has Correct Class
We'll add a test in App.test.js to check that when a status is selected, the corresponding button has an "active" class.

```jsx
test("clicking a button makes its filter active and changes its background", () => {
  render(<App />);
  const bookmarkedButton = screen.getByRole('button', { name: 'Bookmarked' });

  expect(bookmarkedButton.classList.contains('active')).toBe(false);
  fireEvent.click(bookmarkedButton);

  expect(bookmarkedButton.classList.contains('active')).toBe(true);
});
```

For this test, we're using the `fireEvent` method to simulate a click on the `bookmarkedButton`. In order to use it, we'll need to add it to our import from react-testing-library:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
```

Running this test, we will see it fails because we still have more to do. We'll need to:
- add state to the `App` component to store the `selectedStatus` in state.
- add the classnames library.
- add logic to add a background class to the button if it corresponds to the `selectedStatus`.
- make sure that clicking on a button will update the component's `selectedStatus` state.

First, let's add the state:

```jsx
const [selectedStatus, setSelectedStatus] = useState(1);
```
In this case, we want the `selectedStatus` to start at 1, which represents the "Bookmarked" status. We do this by passing `1` as our argument to the `useState` hook function to set the initial value. For this to work, we also need to import the hook from react:

```jsx
import { useState } from "react";
```

Let's install classnames using `npm install classnames`. Then, we'll add the classnames logic. The way the library works, we get a function called `classNames` that accepts an object as an argument. The keys in the object are the class names we want to conditionally apply. The values are the conditions under which the class name should be included. So, we'll do something like this:

```jsx
const buttonClass = classNames({ "bg-blue-500": selectedStatus === parseInt(statusId)})
```

In context,

```jsx
const buttons = Object.keys(statuses).map((statusId) => {
  const buttonClass = classNames({
    "bg-blue-500": selectedStatus === parseInt(statusId),
  });
  return (
    <button key={statusId} className={buttonClass}>
      {statuses[statusId]}
    </button>
  );
});
```

If we set the `selectedStatus` to a different initial value, we'll see the button

```jsx
const buttons = Object.keys(statuses).map((statusId) => {
  const buttonClass = classNames({
    "bg-blue-500": selectedStatus === parseInt(statusId),
  });
  return (
    <button
      key={statusId}
      className={buttonClass}
      onClick={() => setSelectedStatus(parseInt(statusId))}
    >
      {statuses[statusId]}
    </button>
  );
});
```
This time when we run the test, it should pass as the active class is being correctly

Let's clean up the button styles from vite's default and use tailwind classes:

```jsx
const buttonClass = classNames({
  "px-4 py-2 border": true,
  "bg-blue-500": selectedStatus === parseInt(statusId),
});
```

Sure, here's the next step in the codealong.

#### Test Case 3. The jobs are filtered when the selectedStatus changes

Finally, let's test that our jobs list properly filters based on the currently selected status. To do this, we'll render the `App` component, simulate a button click on one of the status buttons, and check if the jobs shown on the screen match our expectations.

Here's a test case that checks if clicking the "Applying" button shows only the jobs with a status of "Applying":

```jsx
test('only shows jobs with the selected status', () => {
  render(<App />);
  const applyingButton = screen.getByRole('button', { name: statuses[2] });
  fireEvent.click(applyingButton);
  
  // Check that all displayed jobs have the status "Applying"
  const displayedJobCards = screen.getAllByTestId('job-card');
  const displayedJobTitles = displayedJobCards.map(card => within(card).getByText(/.+/).textContent);
  
  jobs.filter(job => job.status === 2).forEach(job => {
    expect(displayedJobTitles).toContain(job.title);
  });
  
  // Check that no jobs with a different status are displayed
  jobs.filter(job => job.status !== 2).forEach(job => {
    expect(displayedJobTitles).not.toContain(job.title);
  });
});
```

Make sure to update your `JobCard` component to include a `data-testid` attribute for this test to work:

```jsx
function JobCard({ job }) {
  ...
  return (
    <div data-testid="job-card" className="...">
      ...
    </div>
  );
}
```

Since we're using statuses in multiple components now, let's create a separate file for it and import:

```js
const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

export default statuses;
```

We'll want to import statuses and jobs in the specs:

```jsx
import statuses from "./statuses";
import jobs from "./jobs";
```

This test should now fail for the right reasons, letting us know that one of the jobs that doesn't match the selected status is, in fact, appearing in the document.

At this point, all that's left to do is to filter the jobs to include only those whose status matches the currently selected status and map over those to display the cards:

```jsx
const filteredJobs = jobs.filter(job => job.status === selectedStatus)

const jobCards = filteredJobs.map((job, i) => {
  return <JobCard job={job} key={i} />;
});
```


After this implementation, our tests should pass! If they don't, we can look at the test output to figure out what went wrong, fix our implementation, and try again. If they do pass, we can be confident that our feature is working as expected.

Congratulations! You've just followed a test-driven approach to add a new feature to a React app. This approach helps ensure that our app behaves as expected and can prevent bugs from making it into our final product. It's a powerful tool in

## Resources

1. [Responding to Events](https://react.dev/learn/responding-to-events)
2. [State: A component's memory](https://react.dev/learn/state-a-components-memory)
3. [Render & Commit](https://react.dev/learn/render-and-commit)
4. Testing Library Docs - [The more declarative getByRole query](https://testing-library.com/docs/queries/about/#priority)
5. Classnames - [A simple JavaScript utility for conditionally joining classNames together](https://github.com/JedWatson/classnames)
6. React Docs - [Conditional Rendering](https://react.dev/learn/conditional-rendering)
