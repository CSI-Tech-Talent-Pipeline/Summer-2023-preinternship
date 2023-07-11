# Day 19: Introduction to PostgreSQL with Node.js and Express - Backend Lesson 2

## Objective

By the end of this lesson, students will be able to:

1. Understand how to set up PostgreSQL with Node.js and Express.
2. Execute basic SQL queries to create, read, update, and delete (CRUD) operations on a PostgreSQL database from an Express.js application.

## Tools Required

- Node.js and NPM
- Express.js
- PostgreSQL
- Postman (for API testing)
- DBeaver or pgAdmin (optional for database visualization)

## Lesson Structure

1. Introduction to PostgreSQL
2. Installing PostgreSQL, setting up a Username & Password, & Setting up the Database
3. SQL Basics and Table Creation
4. CRUD Operations with SQL and Express
5. Debugging and Error Handling
6. Recap and Q&A

## Part 1: Introduction to PostgreSQL

- Discuss what PostgreSQL is and its benefits.
- Explain SQL and relational databases.
- Discuss how PostgreSQL integrates with Node.js and Express.js applications.

### What is PostgreSQL and what are its Benefits?

PostgreSQL is a powerful, open-source object-relational database management system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. PostgreSQL is highly robust, and it supports both SQL (relational) and JSON (non-relational) querying. 

Benefits of PostgreSQL:

1. **High Performance**: PostgreSQL has a strong reputation for its performance and stability. It is built to be feature-rich, robust, and performant.

2. **Extensibility**: It offers a wide variety of built-in and user-defined data types, operators, and functions. PostgreSQL also provides a number of interfaces for various languages, including Node.js.

3. **Strict Compliance with Standards**: PostgreSQL closely adheres to SQL standards, ensuring that applications remain compatible with other SQL-compliant database systems.

4. **Security**: PostgreSQL has robust security features that protect data integrity and privacy, such as support for SSL, role-based access control, and fine-grained access control.

### SQL and Relational Databases

SQL, or Structured Query Language, is a language designed to communicate with and manipulate databases. It is particularly effective with relational databases, databases where data is organized into one or more tables. Each table has a set of columns, which describe the data, and rows, which contain the data.

Relational databases like PostgreSQL allow us to create relationships between these tables. These relationships enable more dynamic and complex queries, which are executed using SQL. 

### PostgreSQL Integration with Node.js and Express.js

PostgreSQL can be easily integrated with Node.js and Express.js applications using various libraries. The 'pg' library is one of the most popular PostgreSQL clients for Node.js. It provides an interface to communicate with the PostgreSQL server directly and perform queries.

The PostgreSQL integration allows a Node.js and Express.js application to store, retrieve, update, and delete data persistently, enabling the development of more complex, data-driven applications.

## Part 2: Installing PostgreSQL and Setting Up the Database (30 mins)

- Setting up PostgreSQL Database User & Password
- Creating a database for our application
- Setting Up the PostgreSQL database connection in Node.js
- Setting up Environment variables 
- Creating a database connection file


### Setting Up PostgreSQL Database User and Password

Before we connect our Node.js application to a PostgreSQL database, we need to ensure that we have a user set up that can access and interact with the database.

Here's how you create a PostgreSQL user:

1. Open your terminal/command prompt.

2. Switch to the Postgres user. In Linux, you can do it by typing:

    ```
    sudo su - postgres
    ```
    When I did this on my mac, it didn't work, I went straight to step 3 and was logged in to a postgres user account that had the ability to create new user roles. You can verify that your user has these permissions by running `\d` in the `psql` command prompt.

3. Start the PostgreSQL command-line utility `psql`.

   ```
   psql
   ```

4. Create a new user (replace "dev_db_user" with your desired username and "3336c054cc5" with your desired password):

   ```
   CREATE ROLE dev_db_user WITH LOGIN PASSWORD '3336c054cc5';
   ```

5. Grant privileges to your user. For example, if you want your user to create a database:

   ```
   ALTER ROLE dev_db_user CREATEDB;
   ```

6. List all PostgreSQL users to confirm the creation of your new user:

   ```
   \du
   ```

### Setting Up the Database

1. Open the PostgreSQL interactive terminal program, called `psql`, where you can type in SQL commands, or continue in the same session.
   
2. Create a new PostgreSQL database for our job application tracker. To do this, type in the following command in the `psql` interface:

```
CREATE DATABASE job_app_tracker;
```

3. Change the owner of the database to our new user

```
ALTER DATABASE job_app_tracker OWNER TO dev_db_user;
```

4. Run `\l` to check that the `job_app_tracker` database has indeed been created and belongs to our new database user.

5. Close `psql` by typing `\q`.

Remember that the username and password you create here should match the `DB_USER` and `DB_PASSWORD` values in your `.env` file.

If you have trouble remembering how to work with the `psql` CLI, you can type `\?` to get a list of the available commands and a description of what they do.

### Setting Up the PostgreSQL database connection in Node.js

1. Open your project directory in your terminal.

2. Install the `pg` library which allows your Node.js application to interact with PostgreSQL. Type the following command in your terminal:

```
npm install pg
```

### Setting Up Environment Variables

1. Create a `.env` file at the root of the project. 

2. In your `.env` file, add the following variables:

```
DB_USER=<your-database-user>
DB_HOST=localhost
DB_NAME=job_app_tracker
DB_PASSWORD=<your-database-password>
DB_PORT=5432
```

3. Create a `database.js` file in the project directory.
   - Use the `pg` library to establish a connection to the PostgreSQL database.

    ```javascript
    const { Pool } = require('pg');
    require('dotenv').config();

    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    module.exports = pool;
    ```
    See the docs for node-postgres: [Pool](https://node-postgres.com/apis/pool). It's essentially a connection pool which will create clients when necessary to interact with our database from our javascript code.

In the next parts of the lesson, we will discuss SQL basics, how to create tables in our database, and how to perform CRUD operations on our PostgreSQL database from our Express.js application.

### Part 3: SQL Basics and Table Creation (30 mins)

1. Discuss the basic structure of SQL queries.
2. Write SQL commands to create a new table for the job applications.
   - Explain the various data types and constraints available in PostgreSQL.
3. Use the `pg` pool's `query` method to execute the table creation SQL command.

## Part 3: SQL Queries, Table Creation, and Interaction using `pg`

### Basic Structure of SQL Queries

SQL, or Structured Query Language, is used to communicate with and manipulate databases. SQL queries have a basic structure composed of clauses. The order and syntax of these clauses determine the query's functionality.

- `SELECT`: used to select data from a database.
- `FROM`: used to specify the table from which to retrieve the data.
- `WHERE`: used to filter the records.
- `GROUP BY`: used to group rows that have the same values in specified columns into aggregated data.
- `HAVING`: similar to WHERE but operates on grouped records created by `GROUP BY`.
- `ORDER BY`: used to sort the data.
- `INSERT INTO`: used to insert new data into a table.
- `UPDATE`: used to update existing data within a table.
- `DELETE`: used to delete records from a table.

Here's an example of a SELECT query that utilizes most of these clauses:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column1, column2, ...
HAVING condition
ORDER BY column1, column2, ... ASC|DESC;
```

### Creating a New Table for Job Applications

To store job applications data, we need to create a new table in our PostgreSQL database. We'll need to use the `CREATE TABLE` SQL command.

Here's an example of what that command might look like:

```sql
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(50) NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  application_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'applied'
);
```

In this `CREATE TABLE` command:

- `job_applications` is the name of the table.
- `id`, `company_name`, `job_title`, `application_date`, `status` are the columns in the table.
- `SERIAL`, `VARCHAR(50)`, `DATE` are the data types of these columns. SERIAL is an auto-incrementing integer, VARCHAR(50) is a variable character string up to 50 characters long, and DATE is a date.
- `PRIMARY KEY` is a constraint that uniquely identifies each record in a database table.
- `NOT NULL` is a constraint that ensures that a column cannot have a NULL value.
- `DEFAULT` is a constraint that provides a default value for a column when none is specified.

### Using `pg` Pool's `query` Method to Execute the Table Creation SQL Command

To execute the SQL command, we'll use the `query` method provided by the `pg` library's Pool object.

In your `database.js` file, after setting up the pool object, we can run our `CREATE TABLE` command as follows:

```javascript
// ...

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS job_applications (
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
    status INTEGER NOT NULL
  );
`;

const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};

createTable();
```

We specified different types here:
- `VARCHAR` for string fields
- `INTEGER` for number fields
- `DATE` for date fields
- `TEXT` for potentially longer text content like URLs.

We can adjust the lengths specified for the `VARCHAR` columns (`(100)` in the example above) based on the maximum lengths we expect for those fields. If a `VARCHAR` field might contain an extremely long string, we could use `TEXT` instead, which has no length limit. Note that there's no `TEXT` type in JSON, but in PostgreSQL `TEXT` can be useful for storing long strings.

In this script:

- We first create a constant `createTableQuery` to hold our `CREATE TABLE` SQL command.
- We then create a function `createTable` that will execute the query.
- We use `pool.query()` to execute this SQL command.
- `pool.query()` returns a promise for the result of exectuing the SQL query and will  raise an error if something goes wrong.
- So, we await the result of `pool.query()` in a try catch block.
- Inside the try block, after awaiting the query, we log a success message. Inside the catch block, we log the error that occurred.
- We'll also want to invoke this function so that executing this file from our terminal with `node database.js` will result in the database table being created.

Finally, we want to export a `query` function that will allow us to trigger SQL queries from other files in our codebase.

```js
module.exports = {
  query: (text, params, callback) => {
    console.log("QUERY:", text, params || "");
    return pool.query(text, params, callback);
  },
};
```

Note the console.log here. This will be very useful when we're debugging our SQL queries. Any time our API calls the `query` function, the actual query and its params will be logged to the console in the terminal running our server. This will allow us to verify that our queries are correct when we send requests via Postman later on.

To end this part of the lesson, let's run

```bash
node database.js
```

in our terminal to create the job_applications table. We can verify this is completed by using the [PostgreSQL extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres).

## Part 4: Integrating CRUD operations with PostgreSQL in our Express App

In this section, we'll be discussing and implementing CRUD (Create, Read, Update, Delete) operations. CRUD operations are the foundation of any application that deals with data, as they allow us to interact with our database.

We'll incorporate SQL queries in our Express.js routes to interact with our PostgreSQL database. We'll be using Postman to test these routes. 

## Steps

1. **Overview of CRUD Operations**

    CRUD stands for Create, Read, Update, Delete. These are the four basic operations of persistent storage (database). In SQL, the CRUD operations translate to INSERT, SELECT, UPDATE, and DELETE commands.

2. **Integrating SQL queries in Express routes**

    We are going to replace the in-memory data manipulation in our current routes with actual SQL commands that will interact with our PostgreSQL database. This means that the data will persist, even if the server restarts.

3. **Testing the routes using Postman**

    As we progress with implementing SQL queries in our routes, we'll be using Postman to send requests to these routes to ensure they're working as expected.

Let's start by creating a new job application:

### Creating a new job application (POST)

For this operation, we'll use the SQL `INSERT INTO` command to add a new job application to the database.

Here are the steps to replace the in-memory data manipulation in the POST route:

- Import the query function from `database.js` into `server.js`:

```javascript
const { query } = require('./database');
```

- Replace the in-memory data manipulation in the POST route `/jobs`:

```javascript
app.post("/jobs", async (req, res) => {
  const { company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status } = req.body;

  try {
    const newJob = await query(
      "INSERT INTO job_applications (company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status]
    );

    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    console.error(err);
  }
});
```



- Start up your server using `npm start`, Open Postman and create a new POST request to `http://localhost:4000/jobs`. In the "Body" section of the request, select "raw" and "JSON", and insert the following:

```json
{
  "company": "Aha!",
  "title": "Ruby on Rails Engineer",
  "minSalary": 100000,
  "maxSalary": 160000,
  "location": "Philadelphia, PA (Remote)",
  "postDate": "2023-06-17",
  "jobPostUrl": "https://www.linkedin.com/jobs/view/3638618757",
  "applicationDate": "2023-06-30",
  "lastContactDate": "2023-06-30",
  "companyContact": "joe@schmoe.com",
  "status": 1
}
```

- Send the request and you should get a response with the new job application that's been added to the database.

Use the PostgreSQL extension to see that the row has been added to the database. Finally, add the other 3 jobs we worked with before by sending POST requests through Postman and changing the body:

```json
{
  "company": "Jobot",
  "title": "Remote Front End Developer",
  "minSalary": 120000,
  "maxSalary": 200000,
  "location": "Los Angeles, CA (Hybrid)",
  "postDate": "2023-06-24",
  "jobPostUrl": "https://www.linkedin.com/jobs/view/3643460386",
  "applicationDate": null,
  "lastContactDate": null,
  "companyContact": null,
  "status": 1
}
```

```json
{
  "company": "Braintrust",
  "title": "Software Engineer - Freelance (REMOTE)",
  "minSalary": 50000,
  "maxSalary": 90000,
  "location": "New York, NY (Remote)",
  "postDate": "2023-06-20",
  "jobPostUrl": "https://www.linkedin.com/jobs/view/3641063402",
  "applicationDate": null,
  "lastContactDate": null,
  "companyContact": null,
  "status": 2
}
```

```json
{
  "company": "Underdog.io",
  "title": "Frontend Engineer",
  "minSalary": 88000,
  "maxSalary": 192000,
  "location": "New York, United States (On site)",
  "postDate": "2023-06-19",
  "jobPostUrl": "https://www.linkedin.com/jobs/view/3639725859",
  "applicationDate": null,
  "lastContactDate": null,
  "companyContact": null,
  "status": 2
}
```

Now, we should be able to see 4 jobs in our database using the VSCode extension.

### Reading all job applications (GET)

For this operation, we'll use the SQL `SELECT` command to fetch all job applications from the database.

```javascript
app.get("/jobs", async (req, res) => {
  try {
    const allJobs = await query("SELECT * FROM job_applications");

    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err);
  }
});
```
Test this route by creating a GET request in Postman to `http://localhost:4000/jobs`.

### Reading a single job application by ID (GET)

For this operation, we'll use the SQL `SELECT` command to fetch a single job application by its ID.

```javascript
app.get("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const job = await query("SELECT * FROM job_applications WHERE id = $1", [jobId]);

    if (job.rows.length > 0) {
      res.status(200).json(job.rows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
  }
});
```
Test this route by creating a GET request in Postman to `http://localhost:4000/jobs/1`.

### Updating a job application by ID (PATCH)

For this operation, we'll use the SQL `UPDATE` command to update a job application by its ID.

```javascript
app.patch("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  const { company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status } = req.body;

  try {
    const updatedJob = await query(
      "UPDATE job_applications SET company = $1, title = $2, minSalary = $3, maxSalary = $4, location = $5, postDate = $6, jobPostUrl = $7, applicationDate = $8, lastContactDate = $9, companyContact = $10, status = $11 WHERE id = $12 RETURNING *",
      [company, title, minSalary, maxSalary, location, postDate, jobPostUrl, applicationDate, lastContactDate, companyContact, status, jobId]
    );

    if (updatedJob.rows.length > 0) {
      res.status(200).json(updatedJob.rows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
  }
});
```
Test this route by creating a PATCH request in Postman to `http://localhost:4000/jobs/1`. Don't forget to include a JSON object with the updated job details in the body.

This causes problems, however, if we were to try to only update a single field, for example the status. In that case, the SQL query will fail because it will try to update all the other fields to `undefined`. 

This is something that ORMs will be able to help us with. For now, we'd have to add in some fussy logic here to look through the acceptable fields and build up the SQL string step by step from the keys in req.body.

```js
app.patch("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  const fieldNames = [
    "company",
    "title",
    "minSalary",
    "maxSalary",
    "location",
    "postDate",
    "jobPostUrl",
    "applicationDate",
    "lastContactDate",
    "companyContact",
    "status",
    "jobId",
  ].filter((name) => req.body[name]);

  let updatedValues = fieldNames.map(name => req.body[name]);
  const setValuesSQL = fieldNames.map((name, i) => {
    return `${name} = $${i + 1}`
  }).join(', ');

  try {
    const updatedJob = await query(
      `UPDATE job_applications SET ${setValuesSQL} WHERE id = $${fieldNames.length+1} RETURNING *`,
      [...updatedValues, jobId]
    );

    if (updatedJob.rows.length > 0) {
      res.status(200).json(updatedJob.rows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});
```

### Deleting a job application by ID (DELETE)

For this operation, we'll use the SQL `DELETE` command to delete a job application by its ID.

```javascript
app.delete("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const deleteOp = await query("DELETE FROM job_applications WHERE id = $1", [jobId]);

    if (deleteOp.rowCount > 0) {
      res.status(200).send({ message: "Job deleted successfully" });
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    console.error(err);
  }
});
```
Test this route by creating a DELETE request in Postman to `http://localhost:4000/jobs/1`.

After updating each of these routes, be sure to test them out in Postman to ensure they're working as expected. Happy coding!


## Part 5: Handling Database Errors

We've created our application but we haven't yet planned for errors during the database operations. PostgreSQL might throw various errors like syntax errors, constraint violations, or connection errors. We should handle these errors properly to provide meaningful feedback to the client.

1. In each of our routes, we're using a try-catch block to catch any errors that may be thrown when interacting with the database. However, all we're doing right now is logging the error. Let's improve upon this by sending an error response back to the client:

```javascript
catch (err) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
```

With this setup, if anything goes wrong with our database operations, our client will receive a response with a 500 status code and a JSON object describing the error.

2. Test out these error cases by, for example, trying to read a job application that doesn't exist, updating a job application with invalid data, or deleting a job that doesn't exist.


## Part 6: Recap and Q&A (15 mins)

Let's summarize the key points of our lesson and then open up the floor for questions:

1. **Recap**:
    - We started by introducing PostgreSQL and how it integrates with Node.js and Express.js.
    - We learned how to setup and connect to a PostgreSQL database using the `pg` library.
    - We discussed SQL and relational databases, and wrote SQL commands to create a new jobs table.
    - We walked through how to use SQL commands to perform CRUD operations in Express routes, and tested these routes using Postman.
    - Finally, we discussed debugging and error handling strategies for PostgreSQL and Express.js.

2. **Q&A**:
    - This is your chance to ask any questions or seek any clarifications about what we've learned in this lesson.

---

That's it! You've now learned how to build a RESTful API using Node.js, Express, and PostgreSQL, how to test it using Postman, and even how to handle errors and debug issues. Keep practicing and happy coding!

## Next Lesson Preview

- Preview the next lesson, which will introduce ORMs (with Prisma) in Node.js applications. We will revisit our job application tracker and refactor our direct SQL queries to use Prisma, showing how this can simplify and enhance our codebase.

## Resources

1. [Getting started with PostgreSQL](https://www3.ntu.edu.sg/home/ehchua/programming/sql/PostgreSQL_GetStarted.html)
2. [PostgreSQL VSCode extension](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres)
3. [Node.js Documentation](https://nodejs.org/docs/latest-v14.x/api/)
4. [Express.js Documentation](https://expressjs.com/)
5. [PostgreSQL Documentation](https://www.postgresql.org/docs/)
6. [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
7. [Node Postgres (pg) Documentation](https://node-postgres.com/)
8. [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/default.asp)
9. [RESTful API design - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
