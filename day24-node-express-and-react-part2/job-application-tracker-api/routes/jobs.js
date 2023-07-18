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
