const express = require("express");
const app = express();
const port = 4000;
const jobs = require("./jobs");
const { query } = require("./database.js");
require("dotenv").config();

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response status: ${res.statusCode}`);
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
app.get("/jobs", async (req, res) => {
  try {
    const allJobs = await query("SELECT * FROM job_applications");
    res.json(allJobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific job
app.get("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const job = await query("SELECT * FROM job_applications WHERE id = $1", [
      jobId,
    ]);
    const foundJob = job.rows[0];
    if (foundJob) {
      res.json(foundJob);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new job
app.post("/jobs", async (req, res) => {
  const {
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
    jobPostUrl,
    applicationDate,
    lastContactDate,
    companyContact,
    status,
  } = req.body;

  try {
    const newJob = await query(
      `INSERT INTO job_applications 
      (company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        company,
        title,
        minSalary,
        maxSalary,
        location,
        postDate,
        jobPostUrl,
        applicationDate,
        lastContactDate,
        companyContact,
        status,
      ]
    );
    console.log(newJob);
    res.status(201).json(newJob.rows[0]);
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a specific job
app.patch("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const {
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
    jobPostUrl,
    applicationDate,
    lastContactDate,
    companyContact,
    status,
  } = req.body;

  try {
    const updatedJob = await query(
      `UPDATE job_applications 
      SET company = $1, title = $2, minSalary = $3, maxSalary = $4, location = $5, postDate = $6, jobPostUrl = $7, applicationDate = $8, lastContactDate = $9, companyContact = $10, status = $11 
      WHERE id = $12
      RETURNING *`,
      [
        company,
        title,
        minSalary,
        maxSalary,
        location,
        postDate,
        jobPostUrl,
        applicationDate,
        lastContactDate,
        companyContact,
        status,
      ]
    );
    const foundJob = updatedJob.rows[0];
    if (foundJob) {
      res.json(foundJob);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a specific job
app.delete("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const deleteJob = await query(
      "DELETE FROM job_applications WHERE id = $1",
      [jobId]
    );
    if (deleteJob.rowCount > 0) {
      res.json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
