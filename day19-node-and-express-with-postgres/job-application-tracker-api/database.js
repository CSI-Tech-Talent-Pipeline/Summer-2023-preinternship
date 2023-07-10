const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS job_applications(
    id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    minSalary INTEGER,
    maxSalary INTEGER,
    location VARCHAR(100),
    postDate DATE,
    jobPostUrl TEXT,
    applicationDate DATE,
    lastContactDate DATE,
    companyContact VARCHAR(100),
    status INTEGER NOT NULL DEFAULT 1
  );
`

const createJobAppsTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log("Creating table was successful")
  } catch (error) {
    console.error("An error occurred while creating the table", error.stack);
  }
}

createJobAppsTable();


module.exports = {
  query: (text, params, callback) => {
    console.log("QUERY:", text, params || "");
    return pool.query(text, params, callback);
  }
};