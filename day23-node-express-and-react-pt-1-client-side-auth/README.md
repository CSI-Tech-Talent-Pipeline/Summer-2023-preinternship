# Day 23 - Node, Express and React - Adding Auth to the Client

## SWBAT

- Login and signup with Router forms
- Logout with Auth Context
- Load user data on start
- Protect routes by authorization


## Agenda

- [Auth Context](#auth-context)
- [Protected Routes](#protected-routes)
- [Adding Routes for Login and Signup](#adding-routes-for-login-and-signup)
- [Enabling CORS](#enabling-cors)
- [Adding a /current_user Route](#adding-a-current_user-route)
- [Enabling a Proxy so that cookies can be set properly](#enabling-a-proxy-so-that-cookies-can-be-set-properly)
- [Logout](#logout)


## Codealong

### Auth Context

**Context:** We need to create an AuthProvider to manage state.

**Tasks:**

- Create AuthContext
- Implement AuthProvider
- Export context

**Result:**

```js
// src/contexts/AuthContext.js
import { useState, createContext } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

### Wrapping our App code in the AuthProvider

In order to access the `AuthContext` throughout our application on different routes, we'll need to wrap the `RouterProvider` in main.jsx in our `AuthProvider`.

```jsx
// src/main.jsx
import AuthProvider from "./contexts/AuthContext";
// other imports

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
```

### Protected Routes

**Context:** We want to limit access to certain routes.

**Tasks:**

- Create ProtectedRoute component
- Check if `currentUser` exists
- Redirect to `/login` if not

**Result:**

```jsx
// src/routes/ProtectedRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

To test, this, let's try wrapping the index route in our `ProtectedRoute` component.

```jsx
// src/main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        ),
        loader: jobLoader,
      },
      // ... other child routes
    ],
  },
]);
```

Now, when we try to visit the home page, it should navigate to `/login`, but this will be an error screen as of now because we don't have the route defined yet.

### Adding Routes for Login and Signup

**Context:** Add login and signup pages.

**Tasks:**

- Create page components
- Add routes in main.jsx
- Handle form submission

#### Login Component

```jsx
// src/routes/auth/Login.jsx
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  console.log(Object.fromEntries(formData));
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    // invalid credentials, remain on login page
    return null;
  }

  return redirect("/");
}

function Login() {
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Login</h1>

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

```jsx
// src/routes/auth/Signup.jsx
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // invalid submission, remain on signup page
    return null;
  }

  return redirect("/");
}

function Signup() {
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Signup</h1>

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

```js
// main.jsx
// other imports
import Login, { action as loginAction } from "./routes/auth/Login";
import Signup, { action as signupAction } from "./routes/auth/Signup";

// other imports

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
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
      },
      // ... other routes
    ],
  },
]);
```

Now, when testing out the Login request, we can see in the network tag that we're getting a CORS error. Dealing with CORS (Cross-Origin Resource Sharing) errors is important when building an app with a separate frontend and backend.

## Enabling CORS

**Context:** By default, browsers block cross-origin requests as a security measure. We need to enable CORS in our Express server to allow requests from our frontend.

**Where we start**

No CORS configuration:

```js
// server.js

// ...routes

app.listen(3000);
```

**Tasks**

- Install CORS middleware
- Allow requests from frontend URL
- Allow necessary headers and methods

**Result**

```bash
npm install cors
```

```js
// server.js

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// ...routes
```

Now cross-origin requests from our frontend will work!

Some key points:

- Set origin to frontend URL
- Allow necessary headers and methods
- Apply CORS middleware globally

After we're able to send a request to login, we'll need to be able to handle what happens afterwards. Our React application still doesn't have any way of knowing whether there's currently a logged in user. Let's fix that.

Here is a Markdown codealong README for adding a /current_user route with Sequelize:

## Adding a /current_user Route

In this lesson, we will add a `/auth/current_user` route to our Express API using Sequelize.

## Objectives:

- Add a `/current_user` route
- Check if a session exists
- Get logged in user from session
- Return user object or null

## Steps:

### 1. Add route handler

Let's add a handler for `GET /current_user` in `routes/auth.js`:

```js
// routes/auth.js

router.get("/current_user", (req, res) => {});
```

### 2. Check for session

Inside the handler, we can check if a session exists:

```js
router.get("/current_user", (req, res) => {
  if (req.session.userId) {
    // session exists
  } else {
    // no session
  }
});
```

### 3. Get user from session

If there is a session, we can use the `userId` to find the user:

```js
const { User } = require("../models");

router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
  }
});
```

### 4. Return user or null

Now we can return the user if found, or null if no session:

```js
router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } else {
    return res.status(401).json({user: null})
  }
});
```

And that implements a basic `/current_user` endpoint!

#### Next Steps:

- Call `/current_user` on app load
- Update auth context with user
- Protect routes based on auth
- Check that logging in allows access

## Calling `/current_user` on app load

First, let's add a loader to `root.jsx`

```jsx
// src/routes/root.jsx
import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigation, useLoaderData } from "react-router-dom";
// ...
import { AuthContext } from "../contexts/AuthContext";

export async function loader({ request }) {
  const response = await fetch("http://localhost:4000/api/auth/current_user");
  if (response.ok) {
    const { user } = await response.json();
    return { currentUser: user };
  }
  return { currentUser: null };
}

function Root() {
  const { currentUser } = useLoaderData();
  const { setCurrentUser } = useContext(AuthContext);
  // ...
  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);
  // ...
}
```

Then, configure the loader to run on our root route:

```jsx
// src/main.jsx
// ...
import Root, { loader as rootLoader } from "./routes/root";
// ...

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        ),
        loader: jobLoader,
      }
      // ...
    ]
  }
])
```

## Enabling a Proxy so that cookies can be set properly

We need to set up a proxy so that the cookies issued by the API are set properly when we work in development. Cookies are issued and tagged with the origin that they came from and are only sent with same-origin requests. 

Same-origin requests are requests sent from a domain to that same domain. When we deploy the application, our express app will serve up our react app, but in development they're running on different localhost ports. In order to simulate the backend and frontend running on the same port, we set up a proxy. Our vite config will look like this after the update:

```jsx
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
```

The other necessary tweak here is to make sure that none of our fetch requests in the app start with `http://localhost:4000/api`. They need to start with `/api` instead, that way the proxy will kick in. This means we need to update the url in the `root.jsx` loader and the `Login.jsx` action.

Now, we can try logging in and looking at the Network tab. You'll notice now that the `/current_user` endpoint is returning the user we logged in as! But, we're still looking at the login page...

#### Redirecting to '/' after a successful login

Within the `Login` component, we can check if we have a `currentUser` in context, and if we do, we can `<Redirect />` to `/`.

```jsx
import { Form, redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// ...

function Login() {
  const { currentUser } = useContext(AuthContext);
  if(currentUser) { return <Navigate to="/" /> }
  // ...
}
```

We can add the same exact logic to the `Signup` component as well.

### Logout

**Context:** Allow users to log out.

**Tasks:**

- Add logout button to Navbar
- Add an action to the component & route for logout

**Result:**

```js
// root.jsx

export async function action({ request }) {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE"
  });
  return null;
}

//

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
        <Form method="post">
          <button type="submit" className="">
            Logout
          </button>
        </Form>
      </div>
    </nav>
    // ...
)
```

Configure the action on the route:

```jsx
// src/main.jsx
// ...
import Root, {
  loader as rootLoader,
  action as logoutAction,
} from "./routes/root";
// ...

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: logoutAction,
    children: [
      //...
    ]
  }
])

```

#### What will happen

- Because the logout behavior is an action, the rootLoader will run again as well. 
- The loader will run and provide the new value for the `currentUser` to the `root` component through the `useLoaderData` hook. 
- The `useEffect` hook depends upon the `currentUser` from `useLoaderData` so it will run again
- `setCurrentUser` from `AuthContext` will run, providing the `currentUser` to any of our child components through context.


Here are the key takeaways and resources sections for the full authentication lesson README:

### Key Takeaways 

| Concept | Description | Example |
|-|-|-|
| Auth Context | Provides current user state management | `const [currentUser, setCurrentUser] = useState()` |
| Protected Routes | Require auth to access certain pages | `<Navigate to="/login" />` |  
| Loaders | Fetch initial data for route components | `const user = useLoaderData()` |
| Actions | Handle form submissions and state changes | `export async function action() {}` |
| CORS | Allow cross-origin requests | `app.use(cors())` |

### Resources

- [React Router Docs](https://reactrouter.com/docs/en/v6)
- [React - useContext hook](https://react.dev/reference/react/useContext)
- [Kent C. Dodds - React Context for State Management](https://kentcdodds.com/blog/application-state-management-with-react)
- [Using CORS in Express](https://expressjs.com/en/resources/middleware/cors.html)
- [Proxying API Requests in Development](https://vitejs.dev/guide/api-proxying.html)
