const express = require("express");
const app = express();
const port = 4000;
const jobs = require("./jobs");
require("dotenv").config();

app.use((req, res, next) => {
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.get("/", (req, res) => {
  res.send("Welcome to the Job App Tracker API!!!!");
});

// Get all the jobs
app.get("/jobs", (req, res) => {
  res.send(jobs);
});

// Get a specific job
app.get("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const job = jobs.find((j) => j.id === jobId);
  if (job) {
    res.send(job);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});

// Create a new job
app.post("/jobs", (req, res) => {
  const newJob = {
    ...req.body,
    id: getNextIdFromCollection(jobs),
  };
  jobs.push(newJob);
  console.log("newJob", newJob);
  res.status(201).send(newJob);
});

// Update a specific job
app.patch("/jobs/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const jobUpdates = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex !== -1) {
    const originalJob = jobs[jobIndex];
    const updatedJob = {
      ...originalJob,
      ...jobUpdates,
    };
    jobs[jobIndex] = updatedJob;
    res.send(updatedJob);
  } else {
    res.status(404).send({ message: "Job not found" });
  }
});

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
