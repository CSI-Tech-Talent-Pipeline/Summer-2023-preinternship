# Refactoring to Prepare for New Features
## Updating Job Application Tracker App

### Overview

In this codealong, we'll be making a few updates to our Job Application Tracker App. These changes revolve around renaming and cleaning up the code for our `AddJobForm` component.

Here are the tasks we'll accomplish and the concepts we'll explore:

- [Rename AddJobForm Component](#rename-addjobform-component)
- [Update the Form Component](#update-the-form-component)
- [Refactor the Import Statement](#refactor-the-import-statement)
- [Modify the Route in main.jsx](#modify-the-route-in-mainjsx)

### Rename AddJobForm Component

Our first task involves changing the name of our `AddJobForm` component to `AddJob`. This is a straightforward change, but it makes our component's purpose clearer.

Changes to be made in the file `AddJobForm.jsx`:

- Replace the function name `AddJobForm` with `AddJob`.
- Replace `export default AddJobForm;` with `export default AddJob;`

Here's the change to the function:

```jsx
-function AddJobForm() {
+function AddJob() {
```

And here's the change to the export statement:

```jsx
-export default AddJobForm;
+export default AddJob;
```

After making these changes, verify that the app still runs as expected. 

### Update the Form Component

Next, we will tidy up the syntax of our `Form` component in `AddJobForm.jsx`. This is purely a cosmetic change, but it improves code readability.

In the file `AddJobForm.jsx`:

- Condense the `Form` component opening tag onto a single line.

Here's what that looks like:

```jsx
-    <Form
-      method="post"
-      className="selection:bg-blue-200 flex flex-col gap-2"
-    >
+    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
```

Once done, make sure the form on the application still renders correctly.

### Refactor the Import Statement

After renaming our component, we need to update the import statement in `main.jsx` to reflect this change.

In the file `main.jsx`:

- Replace `import AddJobForm, { action as addJobAction } from "./AddJobForm.jsx";` with `import AddJob, { action as addJobAction } from "./AddJob.jsx";`.

Here's the updated import:

```jsx
-import AddJobForm, { action as addJobAction } from "./AddJobForm.jsx";
+import AddJob, { action as addJobAction } from "./AddJob.jsx";
```

Check that the app is still functioning correctly.

### Modify the Route in main.jsx

The last step is to modify the route in our main application file to use the `AddJob` component.

In the file `main.jsx`:

- Replace `element: <AddJobForm />` with `element: <AddJob />`.

Here's the change:

```jsx
        {
          path: "jobs/new",
-        element: <AddJobForm />,
+        element: <AddJob />,
          action: addJobAction,
        },
```

Make sure the routing to the 'Add Job' form in the application works as intended.

### Resources

- [React Documentation - Components and Props](https://reactjs.org/docs/components-and-props.html)
- [MDN Web Docs - import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [React Router Documentation - Getting Started](https://reactrouter.com/docs/en/v6/getting-started/overview)


# Codealong: Moving all routes to the src/routes folder

## Overview
In this section, we are going to refactor our Job Application Tracker. This involves removing the `AddJob.jsx` and `JobList.jsx` files and their imports from the main file, and then adding them in the routes folder. This change will allow us to streamline our file structure and maintain a cleaner codebase. 

We'll be working on the following tasks:

1. [Deleting Files](#Deleting-Files)
2. [Editing main.jsx](#Editing-main.jsx)
3. [Reviewing our Changes](#Reviewing-our-Changes)

## Deleting Files

In the `job-app-tracker-client/src/` directory, we are going to move `AddJob.jsx` and `JobList.jsx` files to the src/routes directory. 

This can be done in the terminal with the following commands:
```bash
cd classwork/day23-node-express-and-react/job-app-tracker-client/src/
mv AddJob.jsx routes/AddJob.jsx
mv JobList.jsx routes/JobList.jsx
```

## Editing main.jsx
Next, let's edit `main.jsx` file located at `classwork/day23-node-express-and-react/job-app-tracker-client/src/main.jsx`. We'll remove the imports of `AddJob.jsx` and `JobList.jsx` from this file and replace them with their respective imports from the routes folder.

1. Remove these lines:
```javascript
import App from "./App.jsx";
import JobList, { loader as jobLoader } from "./JobList";
import AddJob, { action as addJobAction } from "./AddJob.jsx";
```

2. Replace with these lines:
```javascript
import JobList, { loader as jobLoader } from "./routes/JobList";
import AddJob, { action as addJobAction } from "./routes/AddJob.jsx";
```

Your final `main.jsx` file should now look like this:

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import JobList, { loader as jobLoader } from "./routes/JobList";
import Job, {
  loader as jobDetailLoader,
  action as notesAction,
} from "./routes/job";
import AddJob, { action as addJobAction } from "./routes/AddJob.jsx";
import EditJob, {
  loader as editJobLoader,
  action as editJobAction,
} from "./routes/edit";
```

After these changes, check if your application is still running correctly. Launch your development server and open your application in a web browser to make sure everything works as intended.

## Reviewing our Changes
After making these changes, we have cleaned up our codebase by moving `AddJob` and `JobList` components into the `routes` directory. This makes our code easier to understand and maintain.

## Resources
- [React Router](https://reactrouter.com/)
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [JavaScript fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

# Organizing Routes by Resources

- Move routes into subdirectory by resource

```bash
cd classwork/day23-node-express-and-react/job-app-tracker-client/src/routes
mv AddJob.jsx jobs/AddJob.jsx
mv JobList.jsx jobs/JobList.jsx
mv editJob.jsx jobs/editJob.jsx
mv job.jsx jobs/job.jsx
mv destroyNote.jsx notes/destroyNote.jsx
mv updateNote.jsx notes/updateNote.jsx
```

File structure will be as follows:

```
job-app-tracker-client/src
├── ErrorPage.jsx
├── JobCard.jsx
├── JobCard.test.jsx
├── NoteCard.jsx
├── assets
│   └── react.svg
├── index.css
├── main.jsx
├── routes
│   ├── jobs
│   │   ├── AddJob.jsx
│   │   ├── JobList.jsx
│   │   ├── editJob.jsx
│   │   └── job.jsx
│   ├── notes
│   │   ├── destroyNote.jsx
│   │   └── updateNote.jsx
│   └── root.jsx
├── ui
│   └── Modal.jsx
└── utils.js

6 directories, 16 files
```

We'll need to fix the imports in main.jsx:

```jsx
import JobList, { loader as jobLoader } from "./routes/jobs/JobList";
import Job, {
  loader as jobDetailLoader,
  action as notesAction,
} from "./routes/jobs/job";
import AddJob, { action as addJobAction } from "./routes/jobs/AddJob";
import EditJob, {
  loader as editJobLoader,
  action as editJobAction,
} from "./routes/jobs/editJob";
import { action as destroyNoteAction } from "./routes/notes/destroyNote";
import { action as updateNoteAction } from "./routes/notes/updateNote";
```

And also the imports in the moved routing components

```jsx
// src/routes/jobs/editJob.jsx
import { Form, useLoaderData, Link, redirect } from "react-router-dom";
import { statusTextById } from "../../utils";
// ...

// src/routes/jobs/job.jsx
// ...
import { statusTextById, formatTime } from "../../utils";
import NoteCard from "../../NoteCard";
// ...

// src/routes/jobs/JobList.jsx
// ...
import { statusTextById, statusIdByText } from "../../utils";
import JobCard from "../../JobCard";
// ...
```

# Breaking Server Side Routes into Separate Files

- Create a routes folder

```js
cd job-application-tracker-api
mkdir routes
```

- Create a `routes/auth.js` file for authentication routes
  
We'll want to copy the auth related routes from within the `server.js` file and replace instances of `app` with instances of `router`. For example, `app.post` would be replaced with `router.post`. 
We'll also want to add the necessary imports

```js
// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post('/signup', (req, res) => {
  // Signup logic
});

router.post('/login', (req, res) => {
  // Login logic  
});

router.delete('/logout', (req, res) => {
  // Logout logic
});

module.exports = router;
```



- Create a `routes/jobs.js` file for job routes 

In this case, we'll again be cutting and pasting routes from `server.js` and replacing `app.` with `router.` In this case, we'll also need to update our routes to not include `/jobs` as that will be the prefix for all the routes defined in this file.

```js
// routes/jobs.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Get all jobs logic
});

router.get('/:id', (req, res) => {
  // Get single job logic
});

// etc for other job routes

module.exports = router;
```

When we do the copying and pasting here, however, you may notice that we're using the `authenticateUser` middleware which was originally defined within `server.js`. Let's create another folder to track our middleware so as to make it easier to reuse across different modules.

Absolutely, let's walk through this together using we/us:

First, we should create a middleware folder to hold reusable middleware functions:

```
mkdir middleware
```

Next, we will create a file called auth.js inside middleware to hold the `authenticateUser` logic as well as the :

```
touch middlware/auth.js
```

```js
// middleware/auth.js
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

module.exports = {
  authenticateUser 
};
```

Now we have a centralized place to hold authentication logic. 

Next, we need to import this middleware anywhere it is needed. For example:

```js
// routes/jobs.js

// First we require the middleware
const { authenticateUser } = require("../middleware/auth"); 

// Then we can use it in the router
router.get('/', authenticateUser, (req, res) => {
  // Get all jobs logic
});
```

We import the `authenticateUser` function and call it before the route handler.

We would follow the same pattern anytime we need to reuse middleware across files - require it, and call it before the route. This keeps the auth logic in one place, avoiding duplication.

By organizing middleware like this, we can keep our route logic clean and reusable across our application!

We have the same issue with the `authorizeModification` function defined in `server.js`. This is also a function that might be used across multiple routers. However, it's not technically a middleware function, since it doesn't have the same method signature. In particular, the main difference is that this function needs to be called within a route handler because we need to tell it which model the user is trying to modify. 

Because the authorization logic may change depending on which model we're interacting with, it's probably best to handle this logic in each router individually. But, we can still add a couple of abstractions to cut down on repetition!

# Adding Error Handling and Authorization

## Custom Error Classes

We'll start by creating a couple of Error classes that we can use throughout the application.

```
mkdir errors
touch errors/index.js
```

```js
// errors/index.js

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends Error {
  constructor(message) { 
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  ForbiddenError,
  NotFoundError  
};
```

## Error Handling Middleware

```js
// middleware/errorHandlers.js 

const { ForbiddenError, NotFoundError } = require("../errors");

const forbiddenErrorHandler = (err, req, res, next) => {
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  next(err);
};

module.exports = {
  forbiddenErrorHandler,
  notFoundErrorHandler,
};
```

## Jobs Route Handler

```js
// routes/jobs.js

const { ForbiddenError, NotFoundError } = require('../errors');

const getJob = async (id) => {
  const job = await JobApplication.findByPk(parseInt(id, 10));
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  return job;
};

const authorizeEdit = (session, job) => {
  if (parseInt(session.userId, 10) !== job.UserId) {
    throw new ForbiddenError("You are not authorized to edit this job");
  }
}

const authorizeDelete = (session, job) => {
  if (parseInt(session.userId, 10) !== job.UserId) {
    throw new ForbiddenError("You are not authorized to delete this job");
  }
}

const handleErrors = (err, res) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    return res.status(422).json({ errors: err.errors.map((e) => e.message) });
  }
  res.status(500).send({ message: err.message });
}

// Update a specific job
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    await authorizeEdit(req.session, job);
    const updatedJob = await job.update(req.body);
    res.status(200).json(updatedJob)
  } catch (err) {
    handleErrors(err, res);
  }
});

function canEditJob(user, jobId) {
  // Authorization logic
  return true/false;
}
```

## Server.js

```js
// server.js

const { forbiddenErrorHandler, notFoundErrorHandler } = require('./middlewares/errorHandlers');

app.use(forbiddenErrorHandler); 
app.use(notFoundErrorHandler); 
```

## Code After Changes

```js
// routes/jobs.js
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { JobApplication } = require("../models");

const getJob = async (id) => {
  const job = await JobApplication.findByPk(parseInt(id, 10));
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  return job;
};

const authorizeEdit = (session, job) => {
  if (parseInt(session.userId, 10) !== job.UserId) {
    throw new ForbiddenError("You are not authorized to edit this job");
  }
}

const authorizeDelete = (session, job) => {
  if (parseInt(session.userId, 10) !== job.UserId) {
    throw new ForbiddenError("You are not authorized to delete this job");
  }
}

const handleErrors = (err, res) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    return res.status(422).json({ errors: err.errors.map((e) => e.message) });
  }
  res.status(500).send({ message: err.message });
}

// Get all the jobs
router.get("/", authenticateUser, async (req, res) => {
  try {
    const allJobs = await JobApplication.findAll();

    res.status(200).json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get a specific job
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const job = await getJob(req.params.id);

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Create a new job
router.post("/", authenticateUser, async (req, res) => {
  try {
    const newJob = await JobApplication.create(req.body);

    res.status(201).json(newJob);
  } catch (err) {
    handleErrors(err, res);
  }
});

// Update a specific job
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    await authorizeEdit(req.session, job);
    const updatedJob = await job.update(req.body);
    res.status(200).json(updatedJob)
  } catch (err) {
    handleErrors(err, res);
  }
});

// Delete a specific job
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    await authorizeDelete(req.session, job);
    await job.destroy();
    res.status(200).send({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
```

```js
// src/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");


router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.userId = user.id;
    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: err,
    });
  }
});

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

router.post("/login", async (req, res) => {
  try {
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match

        req.session.userId = user.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

module.exports = router;
```

```js
// middleware/auth.js
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

module.exports = {
  authenticateUser,
};
```

```js
// middleware/errorHandlers.js
const { ForbiddenError, NotFoundError } = require("../errors");

const forbiddenErrorHandler = (err, req, res, next) => {
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  next(err);
};

module.exports = {
  forbiddenErrorHandler,
  notFoundErrorHandler,
};
```

```js
// errors/index.js
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = {
  ForbiddenError,
  NotFoundError,
};
```

```js
// server.js
const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
require("dotenv").config();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const {
  forbiddenErrorHandler,
  notFoundErrorHandler,
} = require("./middleware/errorHandlers");

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);
app.use(forbiddenErrorHandler);
app.use(notFoundErrorHandler); 

// routes
app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```