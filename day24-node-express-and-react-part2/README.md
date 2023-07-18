# Day 24 - Node, Express and React - Part 2: Integrating Job and Note CRUD with API

## SWBATs

- Fetch job data from Node/Express API in React client
- Post job data to Node/Express API from React client
- Update job data in Node/Express API from React client
- View detailed job data from Node/Express API in React client
- Perform CRUD operations on notes against jobs in Node/Express API from React client

## Agenda

- [Improving AuthProvider](#improving-authprovider))
- [Listing Jobs from API](#listing-jobs-from-api)
- [Creating Jobs in API](#creating-jobs-in-api)
- [Adding Notes API](#adding-notes-api)
  - [Notes Model and Migration](#notes-model-and-migration)
  - [Notes API Routes](#notes-api-routes)
  - [Integrating Notes with UI](#integrating-notes-with-ui)
- [Updating Jobs in API](#updating-jobs-in-api)
- [Viewing Job Details](#viewing-job-details)
- [Key Concepts](#key-concepts)
- [Resources](#resources)

## Codealong

### Improving AuthProvider

One of the issues our application has currently is the crucial importance of knowing if we have a logged in user and the inability to check this information within our `loader` functions (because they aren't components). Addressing this concern will significantly improve our quality of life! So, let's go ahead and make sure that our `AuthProvider` is actually managing the interaction with our backend to verify whether we have a logged in user.

In particular, we need to implement a `useEffect` hook here so we have the ability to indicate the cases where we haven't checked auth yet, and ensure that we don't attempt to load a protected route (and its loader!) before we know if we have an authenticated user. We also need to manage logging in, signing up and logging out from within the `AuthProvider`. If we do that, then the entire application (including most notably the `ProtectedRoute` component) will know about the state of `currentUser`.

```jsx
// src/contexts/AuthContext.jsx
import { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // async function to check if the user is logged in
    const checkAuthStatus = async () => {
      // Set isAuthChecked to false before starting the auth check
      setIsAuthChecked(false);

      try {
        // Fetch the current user from the API
        const response = await fetch("/api/auth/current_user");
        const { user } = await response.json();

        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      }

      // Set isAuthChecked to true after the auth check is complete
      setIsAuthChecked(true);
    };

    // Call the function to check the auth status
    checkAuthStatus();
  }, []);

  const signup = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  const login = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  const logout = async () => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
      });

      if (response.ok) {
        setCurrentUser(null);
        setAuthError(null);
      } else {
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthChecked,
        authError,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

And now, we can update the `ProtectedRoute` component to take advantage of this new logic.

```jsx
// src/routes/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAuthChecked } = useContext(AuthContext);

  if (!isAuthChecked) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

Finally, we can clean up the `rootLoader` and `logoutAction` (remove the import and configured loader and action from `main.jsx` and remove the exported functions and useLoaderData from the `root.jsx` component)

```jsx
// src/main.jsx
// ...
import Root from "./routes/root";
// ...

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // ...
    ],
  },
]);
// ...
```

```jsx
// src/routes/root.jsx
import { useContext } from "react";
import { Link, Outlet, useNavigation, Form, redirect } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import classNames from "classnames";
import { AuthContext } from "../contexts/AuthContext";

function Root() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const outletClasses = classNames(
    "mx-auto max-w-4xl sm:px-12 px-4 transition-opacity",
    {
      "opacity-100": navigation.state !== "loading",
      "opacity-50": navigation.state === "loading",
    }
  );

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/login");
  };

  return (
    <div>
      <nav className="bg-blue-900 h-14 flex justify-items-center justify-between">
        <h2 className="flex items-center">
          <Link className="text-2xl flex items-center gap-1 px-2" to="/">
            <FaHome />
            Job Application Tracker
          </Link>
        </h2>
        <div className="flex items-center pr-2">
          {currentUser && (
            <Form method="post" onSubmit={handleLogout}>
              <button type="submit" className="">
                Logout
              </button>
            </Form>
          )}
        </div>
      </nav>

      <div className={outletClasses}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
```

And, we need to integrate the `AuthProvider` functionality into our UI for Login and Signup as well.

For the Login component, we'll:

- pull in `currentUser`, `login` and `authError` from the `AuthContext`
- display an `authError` if one exists
- `Navigate to "/"` if the `currentUser` exists (login was successful)
- `handleSubmit` by:
  - preventing the default behavior (refresh)
  - extracting the credentials from the form
  - invoking `login` from `AuthContext` which results in either:
    - an update to `currentUser` causing a redirect to `"/"` or
    - an update to `authError` where we can see server side validation failures appear in the client.

```jsx
// src/routes/auth/Login.jsx
import { Form, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const { currentUser, login, authError } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData);
    await login(credentials);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="selection:bg-blue-200 flex flex-col gap-2"
    >
      <h1 className="text-white">Login</h1>

      {authError && <div className="text-red-500">{authError}</div>}

      <fieldset className="flex flex-col">
        <label htmlFor="title">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      ></input>
    </Form>
  );
}

export default Login;
```

Similar to the changes we made to the `Login` component, we'll replace the action function with a form submission event handler that uses the `signup` function from the `AuthContext`. Here's the refactored `Signup` component:

```jsx
// src/routes/auth/Signup.jsx
import { Form, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Signup() {
  const { currentUser, signup, authError } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData);
    await signup(credentials);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="selection:bg-blue-200 flex flex-col gap-2"
    >
      <h1 className="text-white">Signup</h1>

      {authError && <div className="text-red-500">{authError}</div>}

      <fieldset className="flex flex-col">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="title">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      ></input>
    </Form>
  );
}

export default Signup;
```

In the `handleSubmit` function, we prevent the default form submission, collect the form data, and call the `signup` function from the `AuthContext` with the form data. The `authError` is displayed if it exists, similar to how we did it in the `Login` component.

We also need to disconnect the login and Signup action from the Login route.

```jsx
// src/main.jsx
// ...
import Login from "./routes/auth/Login";
import Signup from "./routes/auth/Signup";
// ...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // ...
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // ...
  },
]);
```

Here's a summary of how the `AuthContext` is managing state:

**1. Login Success:**

```
   +----------------+      login success     +----------------+
   |                |  --------------------> |                |
   | isAuthChecked: |                        | isAuthChecked: |
   |     false      |                        |     true       |
   | currentUser:   |                        | currentUser:   |
   |     null       |                        |  non-null/user |
   | authError:     |                        | authError:     |
   |     null       |                        |     null       |
   +----------------+                        +----------------+
```

**2. Login Failure:**

```
   +----------------+      login failure     +----------------+
   |                |  --------------------> |                |
   | isAuthChecked: |                        | isAuthChecked: |
   |     false      |                        |     true       |
   | currentUser:   |                        | currentUser:   |
   |     null       |                        |     null       |
   | authError:     |                        | authError:     |
   |     null       |                        | non-null/error |
   +----------------+                        +----------------+
```

**3. Signup Success:**

```
   +----------------+     signup success     +----------------+
   |                |  --------------------> |                |
   | isAuthChecked: |                        | isAuthChecked: |
   |     false      |                        |     true       |
   | currentUser:   |                        | currentUser:   |
   |     null       |                        |  non-null/user |
   | authError:     |                        | authError:     |
   |     null       |                        |     null       |
   +----------------+                        +----------------+
```

**4. Signup Failure:**

```
   +----------------+     signup failure     +----------------+
   |                |  --------------------> |                |
   | isAuthChecked: |                        | isAuthChecked: |
   |     false      |                        |     true       |
   | currentUser:   |                        | currentUser:   |
   |     null       |                        |     null       |
   | authError:     |                        | authError:     |
   |     null       |                        | non-null/error |
   +----------------+                        +----------------+
```

**5. Logout Success:**

```
   +----------------+     logout success     +----------------+
   |                |  --------------------> |                |
   | isAuthChecked: |                        | isAuthChecked: |
   |     false      |                        |     true       |
   | currentUser:   |                        | currentUser:   |
   | non-null/user  |                        |     null       |
   | authError:     |                        | authError:     |
   |     null       |                        |     null       |
   +----------------+                        +----------------+
```

These diagrams describe the state transitions in each scenario. Before each action (login, signup, logout), `isAuthChecked` is set to `false`, representing that an authentication process is ongoing. After each action, `isAuthChecked` is set to `true`, representing that the authentication process is complete. Depending on whether the action was successful or failed, `currentUser` and `authError` are updated accordingly.

### Listing Jobs from API

Our first step is to use our Node/Express API in the jobLoader loader:

```js
// client/src/routes/jobs/JobList.jsx
// ...

export async function loader({ params }) {
  let url = "/api/jobs";
  if (params.status) {
    url += `?status=${statusIdByText[params.status]}`;
  }
  const response = await fetch(url);
  const jobs = await response.json();
  return { jobs };
}
```

We're already consuming this data in the component, but we're currently sending all of the `JobApplication` records from the API to the client. What we actually want is to only send back the records belonging to the currently logged in user.

```js
// server/routes/jobs.js
// Get all the jobs belonging to the currentUser
router.get("/", authenticateUser, async (req, res) => {
  try {
    const allJobs = await JobApplication.findAll({
      where: { UserId: req.session.userId },
    });

    res.status(200).json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
```

Now we fetch jobs data from our API in the loader and consume it in the JobList component! Let's try this out by starting our two development servers for the backend and frontend with

```bash
cd day24-node-express-and-react-part2/job-app-tracker-client
npm run dev
```

and

```
cd day24-node-express-and-react-part2/job-application-tracker-api
npm start
```

When we do this, and log into the dakota@dakota.com account, notice that we're now seeing only 4 job applications. If we logout and then login with `user1@test.com` we'll see that there are 0 job applications!

### Making sure the status links work

Now, try out the status links to navigate between jobs of a different status. Note that the jobs stay the same in each case! If we check out the Network tab, we can see that get requests are getting triggered with `/api/jobs?status=2`, etc. So, we are triggering additional requests to the backend. When we were using json-server, these parameters were used to filter the list of results. Now that we're in charge of the backend code, we actually have to do something with that URL parameter in order to make the returned jobs actually different.

So, let's go back to our API endpoint and add some logic to update our where clause if that parameter is present.

```js
// Get all the jobs belonging to the currentUser
router.get("/", authenticateUser, async (req, res) => {
  try {
    const whereClause = { UserId: req.session.userId };
    if (req.query.status) {
      whereClause.status = req.query.status;
    }
    console.log(whereClause);
    const allJobs = await JobApplication.findAll({
      where: whereClause,
    });

    res.status(200).json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
```

Now, when we test this out in the browser, we can see the jobs update when we select a different status by clicking one of the links.

### Creating Jobs in API

Submit to API:

```jsx
// src/routes/jobs/AddJob.jsx
export async function action({ request, params }) {
  let formData = await request.formData();
  let jobData = Object.fromEntries(formData);
  jobData.minSalary = parseInt(jobData.minSalary);
  jobData.maxSalary = parseInt(jobData.maxSalary);
  jobData.status = 1;
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  if (response.ok) {
    return redirect("/");
  }
  const { errors } = await response.json();
  return errors;
}

function AddJob() {
  const errors = useActionData();
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Add Job Posting</h1>

      {errors && <div className="text-red-500">{errors}</div>}
      {// fields}
    </Form>
  );
}

export default AddJob;
```

We make the request to the API when the form is submitted, passing the form data in the body. We can then handle the response accordingly. If there are errors, we can display them in the component by returning them from the action function and then invoking `useActionData()` within the Form component.

We need to make sure that we don't allow a blank title or company through this form. To do this, let's update the validations for our `JobApplication` model:

```js
// models/jobapplication.js
JobApplication.init({
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Company can't be blank",
        args: true,
      },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Job title can't be blank",
        args: true,
      },
    },
  },
  // ...
});
```

We also need to make sure that the `JobApplication` we create belongs to the user who's currently logged in to our application.

```js
// routes/jobs.js
// ...
// Create a new job
router.post("/", authenticateUser, async (req, res) => {
  try {
    const newJob = await JobApplication.create({
      ...req.body,
      UserId: req.session.userId,
    });

    res.status(201).json(newJob);
  } catch (err) {
    handleErrors(err, res);
  }
});
// ...
```

Now, when we submit the form and fill in the required fields, we should be redirected to `/` where we can see the job we just created. If we log out and log in as another user, the job won't be visible.

### Adding Notes API

In order to get the JobDetail route working, we need to get our backend running for /notes.

#### Notes Model and Migration

Generate model:

```
npx sequelize model:generate --name Note --attributes content:text,JobApplicationId:integer,UserId:integer
```

Add references and validations in migration.

```js
// migrations/xxx-create-note.js
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      JobApplicationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notes");
  },
};
```

Then we'll want to add in our model and some validations

```js
// models/note.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.JobApplication);
      this.belongsTo(models.User);
    }
  }
  Note.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Content can't be blank",
          },
        },
      },
      JobApplicationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "notes",
    }
  );
  return Note;
};
```

We'll also want to add associations to the `User` and `JobApplication` models for our new `Note` model.

```js
// models/user.js
// ...
static associate(models) {
  this.hasMany(models.JobApplication);
  this.hasMany(models.Note);
}
// ...
```

```js
// models/JobApplication.js
// ...
static associate(models) {
  this.belongsTo(models.User);
  this.belongsToMany(models.Tag, {
    through: "JobApplicationTag",
  });
  this.hasMany(models.Note);
}
// ...
```

Run migration to update database schema.

```bash
npx sequelize db:migrate
```

#### Notes API Routes

Create CRUD routes:

```js
// routes/notes.js
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { Note } = require("../models");

const getNote = async (id) => {
  const note = await Note.findByPk(parseInt(id, 10));
  if (!note) {
    throw new NotFoundError("Note not found");
  }
  return note;
};

const authorizeModification = (session, note) => {
  if (session.userId !== note.UserId) {
    throw new ForbiddenError("You do not have permission to modify this note");
  }
};

const handleErrors = (err, res) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    return res.status(422).json({ errors: err.errors.map((e) => e.message) });
  }
  res.status(500).send({ errors: err.message });
};

// Get all the jobs belonging to the currentUser and jobId
router.get("/", authenticateUser, async (req, res) => {
  try {
    const whereClause = { UserId: req.session.userId };
    if(req.query.jobId) {
      whereClause.JobApplicationId = req.query.jobId;
    }
    const notes = await Note.findAll({
      where: whereClause,
    });

    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Create a new note
router.post("/", authenticateUser, async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      UserId: req.session.userId,
    });

    res.status(201).json(newNote);
  } catch (err) {
    handleErrors(err, res);
  }
});

// Update a specific job
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const note = await getNote(req.params.id);
    await authorizeModification(req.session, note);
    const updatedNote = await note.update(req.body);
    res.status(200).json(updatedNote);
  } catch (err) {
    handleErrors(err, res);
  }
});

// Delete a specific job
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const note = await getNote(req.params.id);
    await authorizeModification(req.session, note);
    await note.destroy();
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
```

And then, we need to connect these routes in the `server.js` file:

```js
// server.js
// ...
const notesRouter = require("./routes/notes");

// ...
app.use("/api/notes", notesRouter);
```

### Updating Jobs in API

We can handle the errors in your `EditJob` component in a similar way to how we did so in `AddJob` by using `useActionData`. Here is the updated component:

```jsx
// src/routes/jobs/editJob.jsx
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  Link,
} from "react-router-dom";
import { statusTextById } from "../../utils";

export async function loader({ params }) {
  // remove localhost from api url in the loader
  const jobResponse = await fetch(`/api/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  return { job };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const preparedJob = {
    ...updates,
    minSalary: parseInt(updates.minSalary),
    maxSalary: parseInt(updates.maxSalary),
  };
  const response = await fetch(`/api/jobs/${params.jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedJob),
  });

  if (response.ok) {
    return redirect(`/jobs/${params.jobId}`);
  }

  const { errors } = await response.json();
  return errors;
}

function EditJob() {
  const { job } = useLoaderData();
  const errors = useActionData();

  // ... your form fields and rest of the code here

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to={`/jobs/${job.id}`}>{"<"} Back</Link>
      <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
        <h1 className="text-white">Edit Job Posting</h1>

        {errors && <div className="text-red-500">{errors}</div>}

        {/* ... rest of your form fields ... */}
      </Form>
    </div>
  );
}

export default EditJob;
```

In the `action` function, if the response is not ok, we get the `errors` from the response data and return them. Then, in the `EditJob` function, we get these errors using `useActionData` and display them if they exist. This way, we can display server-side validation errors in our form.

### Viewing Job Details

Get data in loader from node/express and update the loader and action to use `"/api"` endpoints without localhost:

```jsx
// src/routes/jobs/job.jsx
// ...

export async function loader({ params }) {
  const jobResponse = await fetch(`/api/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  const notesResponse = await fetch(`/api/notes?jobId=${params.jobId}`);
  const notes = await notesResponse.json();
  return { job, notes };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const preparedNote = {
    ...Object.fromEntries(formData),
    JobApplicationId: parseInt(params.jobId),
  };
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedNote),
  });
  return null;
}

function Job() {
  // same as before
}

export default Job;
```

In `NoteCard` component, we're no longer using `timestamp`, so let's use `updatedAt` instead:

```jsx
// src/NoteCard.jsx
<i className="text-slate-300">{formatTime(note.updatedAt)}</i>
```

Finally, let's rework `updateNote` and `destroyNote` to use our API:

```jsx
// src/routes/notes/updateNote.jsx
export async function action({ params, request }) {
  const formData = await request.formData();
  const response = await fetch(`/api/notes/${params.noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  return null;
```

```jsx
// src/routes/notes/destroyNote.jsx
export async function action({ params }) {
  const response = await fetch(`/api/notes/${params.noteId}`, {
    method: "DELETE",
  });
  return null;
}
```

We fetch the detailed job data including notes from the API in the loader. We can then display it in the component as needed.

