Day 8: Intro to React
=====================

Students Will Be Able To (SWBAT):
---------------------------------

-   Understand the basic concept of React.
-   Understand the idea of components in React.
-   Create and use JSX elements.
-   Set up a new React project using vite.
-   Understand and create a simple component structure.
-   Use props to pass data to child components.

Agenda
------

1.  **Introduction to React**
    -   Why React?
    -   What is React?
    -   What are Components?
2.  **Introduction to JSX**
    -   JSX syntax
    -   Embedding JavaScript in JSX
3.  **Creating a React Component**
    -   Functional components
    -   Props in components
4.  **Setting up a new React project**
    -   create-react-app => vite
    -   Project structure
    -   Navigating a React app
5.  **Building the Job Application Tracker**
    -   Project Overview
    -   Creating a static JobCard component


## 1. **Introduction to React**

#### Why React?

-   React was developed to handle the complexity of building user interfaces in JavaScript for modern, fast-paced web applications.
-   It provides a component-based architecture, which allows for reusable, modular components leading to cleaner and more maintainable code.
-   React's virtual DOM optimizes performance by minimizing actual DOM manipulations, making it more efficient than traditional JavaScript for handling high-load applications.

#### What is React?

-   React is a JavaScript library created by Facebook specifically for building user interfaces.
-   It is particularly useful for developing single-page applications and managing the view layer of web and mobile apps.
-   React enables the design of simple views for each state of an application, and will efficiently render and update the correct components when data changes.

#### What are Components?
-   Components are the fundamental building blocks of a React application's user interface.
-   In React, a component is a reusable piece of code that dictates a portion of the UI.
-   Components can accept inputs, called "props", and return a React element that dictates how a section of the UI should appear.
-   They allow the splitting of UI into independent, reusable pieces, enabling complex applications to be built out of simple, manageable blocks.
-   Components can range in size from a small UI element, like a button, to an entire page.

## 2. Introduction to JSX



<h2> React > Vanilla JS </h2>

<div style="display: flex; gap: 2rem;">
<div>
Instead of describing how to do something like in vanilla JS:

```js
const h1 = document.createElement("h1");
h1.id = "main";
h1.className = "blue";
h1.textContent = "Hello!";
```

We can just describe what we want to see with JSX:

```js
const h1 = (
  <h1 id="main" className="blue">
    Hello from JSX!
  </h1>
);
```

</div>
<div style="display: flex; flex-direction: column; justify-content: center;">
  In both cases, we'll get something like this:

  ```html
  <h1 id="main" class="blue">
    Hello!
  </h1>
  ```

</div>
</div>

> JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

Let's read through the docs for:
- [Converting HTML to JSX](https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx)
- [Embedding JS in JSX](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

## 3. **Creating a React Component**

Let's read through the docs and follow along with:

- [Creating a React Component](https://react.dev/learn/your-first-component#defining-a-component)
- [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)


## 4. **Setting up a New React Project**

- Facebook Team released [Create React App](https://create-react-app.dev/) ([GitHub](https://github.com/facebook/create-react-app)) in 2016 to help new developers get started with professional React dev tooling. It was officially deprecated in March 2023 when React released their new documentation. Many of the new react features incorporate server side rendering and server side components, so they are recommending using a framework to start new projects.
- Vercel released [Next.js](https://nextjs.org/) in 2016 as an alternative way to create a react app in the context of a full stack web framework.
- [Gatsby.js](https://www.gatsbyjs.com/) is a Static Site Generator built on React created in 2015 and recently [acquired by Netlify](https://www.netlify.com/press/netlify-acquires-gatsby-inc-to-accelerate-adoption-of-composable-web-architectures/).
- [Remix.run](https://remix.run/) is a full stack web framework built on React that was released in 2021.
- [Vite](https://vitejs.dev/) offers Next generation frontend tooling for multiple frontend frameworks. It was released in 2020 by creator of Vue.js.

When you use React in a production environment, you will most likely be working within one of the above frameworks. In order to focus the learning on React fundamentals, we're going to be using [Vite](https://vitejs.dev/) to create our application. This means that to start, we'll be focusing on using React to build a client side SPA (Single Page Application). 

Once you have become comfortable with the way we build client applications in React, you can begin to see how React is used within the context of one of these frameworks. For your capstone, feel free to explore using one of the frameworks above to put React within the context of a full stack web framework.

### Let's hop in!

```bash
npm create vite@latest
```

You'll see this printout:
```bash
Need to install the following packages:
  create-vite@4.3.2
Ok to proceed? (y) 
```

Next, you'll be asked a series of questions:
- name your project: `job-app-tracker`.
- Select a framework: `React`
- Select a variant: `JavaScript`

You'll then be given a terminal printout with some instructions:

```bash
Done. Now run:

  cd job-app-tracker
  npm install
  npm run dev
```

For this lesson, I'd also recommend opening the `job-app-tracker` directory in a separate window in your code editor (using `code .`). 

Here are the files we get in a brand new React project generated with Vite:

```
index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

The `index.html` file is the entry point for our application that gets served up in the browser. It's basically a target file into which the React tooling will output all of its DOM manipulations:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

The `package.json` file describes the project's dependencies and also outlines the scripts that we can run from the terminal to interact with the code.

```json
{
  "name": "job-tracker-vite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.37",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.38.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "vite": "^4.3.9"
  }
}
```

The `src/main.jsx` file is the one that's loaded into `index.html`. Its main role is to mount your React application into a root node in your HTML document.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

The `<React.StrictMode>` component allows React to enforce best practices and give us really nice errors and warnings with links to the documentation when we make common mistakes. Note for later, it also forces our components through their full lifecycle so we can more easily detect bugs that occur on re-renders. Finally, note that this file loads the `<App>` component from another file called `App.jsx`.

```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

We'll be replacing the `App` component here with our own code for the job application tracker.

Before we make any changes, let's run a script to see the app live in the browser. Run this command from your terminal, ensuring that your working directory is at the job-app-tracker root.

```bash
npm run dev
```

You'll now be able to open http://localhost:5173 in your browser to see the app running. 

## 5. **Building the Job Application Tracker**

Let's start by discussing why React is necessary. In building the job application tracker, we discussed the difficulty of populating data into the DOM. This is before we even have added much interactivity! Our application will include multiple interactive elements - a list of job applications, a form to add new applications, an interface to change application status, etc. Keeping track of these interactions and state changes with vanilla JavaScript can get complex.

Recall the function we had for creating a new job application.

```js
function createNewJob(job) {
  const jobDiv = document.createElement("div");
  jobDiv.className = "j-desc";
  // create structure
  jobDiv.innerHTML = `
  <img
    class="j-desc__company-image"
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      
    </h2>
    <p class="j-desc__company"></p>
    <ul class="j-desc__metadata">
      <li class="j-desc__location"></li>
      <li class="j-desc__salary"></li>
      <li class="j-desc__posting_date"></li>
    </ul>
  </div>
  `;

  // pull data from argument
  const { image: { src, alt }, company, title, salary, location, postDate } = job;

  // populate data into DOM structure
  const img = jobDiv.querySelector(".j-desc__company-image");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  jobDiv.querySelector(".j-desc__job-title").textContent = title;
  jobDiv.querySelector(".j-desc__company").textContent = company;
  jobDiv.querySelector(".j-desc__location").textContent = location;
  jobDiv.querySelector(".j-desc__salary").textContent = salary;
  jobDiv.querySelector(".j-desc__posting_date").textContent = postDate;

  // add element to the DOM
  document.querySelector('#jobs').append(jobDiv);
}
```

Notice that the code is very disjointed. The code that handles the HTML markup is separate from the data that should be included within it. We have to use `querySelector()` to target the elements where the data should go. In general, this is an **imperative** approach (we tell the code **how** to accomplish our task of rendering a job to the DOM).

React takes an **imperative** approach to solving this problem. This means that we get to focus on **what** we want to have rendered to the DOM and React handles the **how**.

```jsx
export default function JobCard({ job }) {
  // pull data from argument
  const {
    image: { src, alt },
    company,
    title,
    salary,
    location,
    postDate,
  } = job;

  return (
    <div className="j-desc">
      <img className="j-desc__company-image" src={src} alt={alt} />
      <div className="j-desc__details">
        <h2 className="j-desc__job-title">{title}</h2>
        <p className="j-desc__company">{company}</p>
        <ul className="j-desc__metadata">
          <li className="j-desc__location">{location}</li>
          <li className="j-desc__salary">{salary}</li>
          <li className="j-desc__posting_date">{postDate}</li>
        </ul>
      </div>
    </div>
  );
}
```

In order to use this component, we'll need to render it from `App.jsx`:

- import `JobCard` component into `App.jsx`
- import `jobs` data from `jobs.js`
- replace the returned jsx in `App.jsx` with a 

```jsx
import "./App.css";
import JobCard from "./JobCard";
import jobs from "./jobs";

function App() {
  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <JobCard job={jobs[0]} />
    </div>
  );
}

export default App;
```

Final todo items:

- Add `JobCard`s for each of the `jobs` in `jobs.js`
- add our previous styles to the program and remove the `App.css` styles
- clean up any undesired styles in index.css


Resources
---------

- [React: Quick Start](https://react.dev/learn)
- [React: Developer Tools](https://react.dev/learn/react-developer-tools)
- [React: Describing the UI](https://react.dev/learn/describing-the-ui)
- [React: Your First Component](https://react.dev/learn/your-first-component)
- [React: Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)

* * * * *

After going through this lesson, we will dive deeper into React, exploring concepts such as state, events, forms, data fetching, routing, and state management. Stay tuned for those lessons as we will continue to build upon our job application tracker.