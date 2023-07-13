const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { JobApplication, User } = require("./models");
require("dotenv").config();

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
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Welcome to the Job App Tracker API!!!!");
});

app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    req.session.userId = user.id; // log the user in before sending response
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.map((e) => e.message) });
    }
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating a new user account",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    // find the user based on the email address in the body
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // passwords match
        req.session.userId = user.id;

        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // passwords don't match
        return res.status(401).json({
          message: "Incorrect credentials",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

// Get all the jobs
app.get("/jobs", authenticateUser, async (req, res) => {
  try {
    const allJobs = await JobApplication.findAll();

    res.status(200).json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get a specific job
app.get("/jobs/:id", authenticateUser, async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const job = await JobApplication.findOne({ where: { id: jobId } });

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
app.post("/jobs", authenticateUser, async (req, res) => {
  try {
    const newJob = await JobApplication.create(req.body);

    res.status(201).json(newJob);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Update a specific job
app.patch("/jobs/:id", authenticateUser, async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const record = await JobApplication.findOne({ where: { id: jobId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }
    const [numberOfAffectedRows, affectedRows] = await JobApplication.update(
      req.body,
      { where: { id: jobId }, returning: true }
    );

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete a specific job
app.delete("/jobs/:id", authenticateUser, async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const record = await JobApplication.findOne({ where: { id: jobId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }
    const deleteOp = await JobApplication.destroy({ where: { id: jobId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "Job deleted successfully" });
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
