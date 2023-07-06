# Day 17: Backend part 1: Exploring Node.js and Express.js: Requests, RESTful Routing, and Simulating CRUD Operations

## Agenda

1. Introduction to Node.js and Express.js
2. Review of HTTP Requests and Responses
3. Setting up a Basic Server
4. Implementing RESTful Routing
5. Handling HTTP Requests (GET, POST, PUT, DELETE)
6. Simulating CRUD Operations
7. Understanding and Using HTTP Status Codes

---

Before we start:
- Sign Up for [Postman](https://www.postman.com/). 



## 1. Introduction to Node.js and Express.js

- **Node.js** is a JavaScript runtime environment that lets you run JavaScript on your server. For instance, consider you're building your Job Application Tracker and want to store and manage job applications on a server. Node.js would allow you to do this.
- **Express.js**: is a web application framework for Node.js. If Node.js is the foundation of your house, Express.js is the house built on it. It provides mechanisms to handle requests and responses easily. For example, it will handle a GET request when a user wants to view a list of jobs they've applied to or a POST request when a user wants to add a new job application.

## 2. Understanding HTTP Requests and Responses

- HTTP is the protocol that browsers and web servers use to communicate with each other. It's the language of the web. In the context of our Job Application Tracker:
  - **GET request**: A user would make a `GET` request to `"/jobs"` to view a list of jobs they've added to the tracker. The server processes this request and sends a response with the required data.
  - **POST request**: A user would make a `POST` request to `"/jobs"` add a new job to the tracker. The server processes this request, stores the new job data, and sends a response confirming the action.
  - **PATCH request**: A user would make a `PATCH` request to `/jobs/:id` to update an existing job application. The server processes this request, updates the relevant job data, and sends a response confirming the action.
  - **DELETE request**: A user would make a `DELETE` request to `/jobs/:id` to remove a job application. The server processes this request, deletes the relevant job data, and sends a response confirming the action.

Now, let's create a basic server with Node.js and Express.js for our Job Application Tracker.

1. First, open your terminal and navigate to the directory where you want to create your project. Then run the following command to create a new directory for your project and navigate into it:

```bash
mkdir job-application-tracker-api && cd job-application-tracker-api
```

2. Once inside the project directory, initialize a new Node.js project with the following command:

```bash
npm init -y
```

This will create a `package.json` file in your project directory, which will keep track of all your project's dependencies.

3. Now, let's install Express.js, which is the only dependency we need for now. Run the following command to install Express.js:

```bash
npm install express
```

This will install Express.js and add it to the list of dependencies in your `package.json` file.

4. Now, in the root of your project directory, create a new file named `server.js`:

```bash
touch server.js
```

5. Open `server.js` in your text editor, and add the following code:

```javascript
const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to the Job Application Tracker API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

This script does a few things:

1. It imports the Express.js module.
2. It creates an instance of an Express.js application.
3. It defines a route handler for GET requests made to the root of our application (http://localhost:4000/).
4. It starts our application on port 4000.

This script sets up a basic Express.js server that listens for GET requests at the root route ("/") and responds with a welcome message.

6. You can run the server with the following command:

```bash
node server.js
```

You should see this output in your terminal: "Server is running at http://localhost:4000" indicating that your server is running. If you open your web browser and visit http://localhost:4000, you should see the message "Welcome to the Job Application Tracker API!"

That's it! You've set up a basic Node.js and Express.js server for your Job Application Tracker. In the next few sections, we will extend this server to handle various HTTP requests and simulate CRUD operations using in-memory data structures to better understand how job application data can be created, read, updated, and deleted.

---

## 3. Setting Up and Managing Your Server with Nodemon

At this point, you should have a basic Express server set up. However, currently, you need to manually restart the server each time you make changes. This can quickly become tedious, especially as your application grows more complex. That's where Nodemon comes in.

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Let's get that set up. First, stop the terminal running `node server.js` by typing 'Ctrl+C' while its terminal window is in focus. Next:

1. Install Nodemon globally: `npm install -g nodemon` (or locally if you have issues `npm install --save-dev nodemon`)
2. Add a start script in your `package.json` file:

   ```json
   "scripts": {
     "start": "nodemon server.js"
   }
   ```

3. Start the server using `npm start`. Any time you save a file, Nodemon will automatically restart your server.
4. To stop the server, you can press `Ctrl+C` in your terminal.
5. If your server isn't stopping properly, you might have a stray server running. You can kill it with the command `npx kill-port 4000`.

---

## 4. Implementing RESTful Routing

In this section, we'll define what RESTful routing is and how it can be implemented in Express. You've actually already seen RESTful routing in your applications due to the `json-server` package. When we set up a db.json file to work with `json-server`, we get RESTful routes connected to each resource we add to the file. In our case, they are the `jobs` and `notes` resources.

>**IMPORTANT NOTE**: When configuring RESTful routes, always use the plural name of the resource in your urls. Omit words like "data" or "record" and avoid singular words unless there is actually only one record that a particular user would expect to perform CRUD actions on (like a `profile` for example). 
>For a Book Review app, resources would be '/books' and '/reviews'. 
For a todolist app with multiple todo lists: '/todo_lists' and '/tasks'.
For a Recipe Tracker: '/recipes', '/ingredients' and '/recipe_ingredients'
>It's important when designing your RESTful API that the focus is on performing CRUD actions on the resources your app is tracking that match the proper Request method + path pattern.  

1. Understand the principles of REST (Representational State Transfer) and how it relates to API design
2. Review the different types of HTTP requests and how they correspond to CRUD operations
3. Implement RESTful routing for the `jobs` resource in your `server.js` file, using placeholder comments for now

Here are the RESTful routes we're going to be building for the Job app tracker.

```javascript
// List all jobs
app.get("/jobs", (req, res) => {
  // This will eventually return a list of all jobs
});

// Get a specific job
app.get("/jobs/:id", (req, res) => {
  // This will eventually return a specific job
});

// Create a new job
app.post("/jobs", (req, res) => {
  // This will eventually create a new job
});

// Update a specific job
app.patch("/jobs/:id", (req, res) => {
  // This will eventually update a specific job
});

// Delete a specific job
app.delete("/jobs/:id", (req, res) => {
  // This will eventually delete a specific job
});
```

---

## 5. Simulating CRUD Operations with RESTful GET, POST, PATCH, & DELETE Requests

Now that you have an understanding of RESTful routing, let's simulate some basic CRUD operations without a database. We'll need to:

- Implement GET, POST, PATCH, and DELETE HTTP requests
- Simulate creating, reading, updating, and deleting jobs data in memory
- Understand how these operations map to database operations

In more concrete detail, here are our tasks:

1. Move the `jobs.js` file containing an array of `jobs` data into your project directory, and require it in your `server.js` file.
2. Implement the `GET /jobs` and `GET /jobs/:id` routes to return the appropriate jobs data.
3. Implement the `POST /jobs` route to add a new job to the `jobs` array and return it.
4. Implement the `PATCH /jobs/:id` route to update a specific job in the `jobs` array and return it
5. Implement the `DELETE /jobs/:id` route to remove a specific job from the `jobs` array and return a success message.

### 1. Loading the jobs array

Okay, let's move the `jobs.js` file into the same directory as our `server.js` file and then require it from `server.js`.

```javascript
// Jobs data
const jobs = require("./jobs");
```

### 2. Retrieving jobs in a list and individually

Next, we'll want to add the endpoints for retrieving information from our API:

```js
// List all jobs
app.get("/jobs", (req, res) => {
  res.send(jobs);
});

// Get a specific job
app.get("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const job = jobs.find((job) => job.id === jobId);
  res.send(job);
});
```

A few things are happening here that we should understand.

- Each route that we configure here accepts a route handler.
- The route handlers take two parameters, `req` short for "request" and `res`, short for "response"
- [`req`](https://expressjs.com/en/api.html#req) is an object provided by express that helps us to access information about the request that matched this route.
- [`res`](https://expressjs.com/en/api.html#res) in an object provided by express that helps us to generate the response to a request that has matched this route.

### 3. Creating Jobs

In this section, we're going to use Postman to simulate the experience a user would have if they submitted the form to create a new job from within our React application and we used `JSON.stringify(jobFormState)` in the body of our `fetch` request. We'll use the Postman application to send a request that looks just like the one we would send from our React application so we can test our server's response.

```js
// Create a new job
app.post("/jobs", (req, res) => {
  const newJob = req.body;
  jobs.push(newJob);
  res.send(newJob);
});
```

If we try this request in Postman, we're not getting a response back. We can use a console.log here to check what's going on:

```js
app.post("/jobs", (req, res) => {
  const newJob = req.body
  console.log("newJob", newJob);
  jobs.push(newJob);
  res.send(newJob);
});
```

If we run the request again in Postman, we'll see 

```
Server is running at http://localhost:4000
newJob undefined
```

This lets us know that our express server isn't able to read the JSON formatted body that we sent in our request from Postman. To solve this problem, we're going to implement our first bit of [middleware](./MIDDLEWARE.md) to our Express application. 

The middleware `express.json()` is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. By adding this line, you are able to access the data sent in a POST request in `req.body`. This is necessary for handling requests that contain a body like `POST` and `PATCH` requests.

Please note: as of Express 4.16.0+, the `express.json()` middleware function has been included in Express. For older versions of Express, you will need to use [body-parser middleware](https://expressjs.com/en/resources/middleware/body-parser.html) to handle JSON payloads.

To implement the middleware, we'll add the following line to our `server.js` right below the request logging middleware and before we start defining route handlers.

```js
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
// add this line
app.use(express.json()) // this allows us to send JSON formatted bodies in our requests
// ... route handlers
// app.listen(...
```

Now, when we send the request again in Postman we can see the response in the app and if we check our console, we should see this:

```
Request: POST /jobs
newJob {
  title: 'Frontend Engineer',
  company: 'Tiktok',
  location: 'Seattle, WA',
  minSalary: 124000,
  maxSalary: 192000,
  postDate: '2023-06-20',
  jobPostURL: 'https://www.linkedin.com/jobs/view/3638860845',
  status: 1
}
```

Note that this job **doesn't** have an id!!! This can cause problems with our other routes. In our next lesson, we'll integrate a real database that we'll use to persist jobs to our machine in a way that lasts beyond the life of our running web server. For now, we can add a function that will return the next available `jobId` and use it to add an id to the information coming from our client (Postman in this case). 

```js
function getNextIdFromCollection(collection) {
  if(collection.length === 0) return 1; 
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}
// ...
app.post("/jobs", (req, res) => {
  // This will eventually create a new job
  const newJob = {
    ...req.body,
    id: getNextIdFromCollection(jobs)
  };
  console.log("newJob", newJob);
  jobs.push(newJob);
  res.send(newJob);
});
```

Now, when we try the request again, we'll see this in our terminal:

```
Request: POST /jobs
newJob {
  title: 'Frontend Engineer',
  company: 'Tiktok',
  location: 'Seattle, WA',
  minSalary: 124000,
  maxSalary: 192000,
  postDate: '2023-06-20',
  jobPostURL: 'https://www.linkedin.com/jobs/view/3638860845',
  status: 1,
  id: 5
}
```

If we try retrieving this record from the api by sending another request to `http://localhost:4000/jobs/5`, we can see it in the browser!

### 4. Updating jobs

This task is similar to creating a new job in that we need to access the request body, but different in that we also need to update the job inside the `jobs` array.

```js
// Update a specific job
app.patch("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobUpdates = req.body;
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  const updatedJob = { ...jobs[jobIndex], ...jobUpdates };
  jobs[jobIndex] = updatedJob;
  // console.log("updatedJob", updatedJob);
  res.send(updatedJob);
});
```

### 5. Deleting Jobs

This one is also similar to the Update route, but instead of updating the element in the array, we'll splice it out.

```js
// Delete a specific job
app.delete("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  jobs.splice(jobIndex, 1);
  res.send({ message: "Job deleted successfully" });
});
```

---

## 6. Understanding and Using HTTP Status Codes

Now that our routes are functioning and interacting with our temporary data, let's enhance our API by using appropriate HTTP status codes.

1. Understand the categories of HTTP status codes and when to use each one
2. Modify the `GET /jobs/:id` route to return a 404 status code if the job doesn't exist
3. Modify the `POST /jobs` route to return a 201 status code to indicate successful creation
4. Modify the `PUT /jobs/:id` route to return appropriate status codes based on whether the update was successful
5. Modify the `DELETE /jobs/:id` route to return a 204 status code on successful deletion

### 1. Understanding Status Codes

HTTP status codes are divided into five classes or categories. The first digit of the status code defines the class of response, while the last two digits do not have any classification role. Here are the five classes:

- 1xx (Informational): The request was received, and the process is continuing.
- 2xx (Successful): The request was successfully received, understood, and accepted.
- 3xx (Redirection): Further action must be taken in order to complete the request.
- 4xx (Client Error): The request contains bad syntax or cannot be fulfilled.
- 5xx (Server Error): The server failed to fulfill an apparently valid request.

Here's a table with some of the most commonly used HTTP status codes:

| Status Code | Status Text | Description |
| ----------- | ----------- | ----------- |
| 200 | OK | The request has succeeded. The information returned with the response is dependent on the method used in the request. |
| 201 | Created | The request has been fulfilled, and a new resource was created as a result. |
| 204 | No Content | The server has fulfilled the request but does not need to return a response body. |
| 301 | Moved Permanently | The requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs. |
| 400 | Bad Request | The server could not understand the request due to invalid syntax. |
| 401 | Unauthorized | The request requires user authentication. |
| 403 | Forbidden | The server understood the request, but it refuses to authorize it. |
| 404 | Not Found | The server can't find the requested resource. |
| 422 | Unprocessable Entity | The request could not be processed due to invalid data provided. When we implement validations later on, we'll use this status code to indicate that the user submitted invalid ata through a form. |
| 500 | Internal Server Error | The server encountered an unexpected condition which prevented it from fulfilling the request. |

For a more exhaustive list of HTTP status codes, you can refer to [MDN's HTTP status codes documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

We can also adjust our middleware so that it logs the status codes for our responses as well:

```js
app.use((req, res, next) => {
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});
```

You can read more about why this `res.on` code is necessary [here](./MIDDLEWARE.md#Adding-Status-Codes-to-the-logger-middleware) if you like

### 2. Adding a 404 status to GET /jobs/:id if appropriate

```javascript
// Get a specific job
app.get("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find((job) => job.id === jobId);
  if (job) {
    res.send(job);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});
```

### 3. Adding a 201 staus to POST /jobs

When a new job is created, we should send back a 201 status code to indicate a "Created" response.

```js
// Create a new job
app.post("/jobs", (req, res) => {
  const newJob = req.body;
  jobs.push(newJob);
  res.status(201).send(newJob);
});
```

### 4. Adding a 404 status to PATCH /jobs/:id if appropriate
```js
// Update a specific job
app.patch("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobUpdates = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  const updatedJob = { ...jobs[jobIndex], ...jobUpdates };
  if (jobIndex !== -1) {
    jobs[jobIndex] = updatedJob;
    res.send(updatedJob);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});
```

### 5. Adding a 204 status to DELETE /jobs/:id or 404 if appropriate

```js
// Delete a specific job
app.delete("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex !== -1) {
    jobs.splice(jobIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});
```

Note that if you take the `204` status code approach for successful deletion, you won't be able to `send()` a body in the response. A `204` status code indicates "No Content" (this means no body). If you do want to send a message in the body, it's fine to stick with a `200` status code for this response and just do `res.send()`

```js
// Delete a specific job
app.delete("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex !== -1) {
    jobs.splice(jobIndex, 1);
    res.send({ message: "Job deleted successfully" });
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});
```

This is the completed code for this lesson. Note that we're still handling the data in-memory, meaning if the server is restarted, all the changes made will be lost. This will change in future lessons when we introduce a database. Also, note the use of HTTP status codes to provide additional information to the client about the outcome of their requests.

---

## Key Takeaways

| Concept | Description | Example |
| ------- | ----------- | ------- |
| Node.js | A JavaScript runtime environment that allows you to run JavaScript on your server instead of a browser. | `const express = require('express'); const app = express();` |
| Express.js | A web application framework for Node.js that simplifies web application development. | `const app = express();` |
| Nodemon | A utility that monitors any changes in your source and automatically restarts your server. | `nodemon server.js` |
| RESTful Routing | A standardized way of structuring the API endpoints/routes for performing CRUD actions on a resource | **C**reate (`POST '/jobs'`) **R**ead (`GET /jobs` , `GET /jobs/:id`)  **U**pdate (`PUT/PATCH /jobs/:id`) and **D**elete (`DELETE /jobs/:id`) |
| CRUD Operations | The four basic operations that can be performed on any data. Represented by Create (POST), Read (GET), Update (PUT), and Delete (DELETE). | `app.get('/jobs', (req, res) => { res.send(jobs); });` |
| HTTP Status Codes | Codes that indicate the result of the HTTP request. They inform the client whether a specific HTTP request has been successfully completed, and if not, where the error lies. | `res.status(404).send({ message: 'Job not found' });` |

---

## Resources

- [Node.js Official Documentation](https://nodejs.org/en/docs/)
- [Express.js Official Documentation](https://expressjs.com/)
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Express API Reference](https://expressjs.com/en/4x/api.html)
- [Express `request` object - official docs](https://expressjs.com/en/api.html#req)
- [Express `response` object - official docs](https://expressjs.com/en/api.html#res)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [RESTful API Design](https://restfulapi.net/)
- [Understanding CRUD Operations](https://developer.mozilla.org/en-US/docs/Glossary/CRUD)
