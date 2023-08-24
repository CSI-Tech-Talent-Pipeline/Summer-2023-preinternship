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
