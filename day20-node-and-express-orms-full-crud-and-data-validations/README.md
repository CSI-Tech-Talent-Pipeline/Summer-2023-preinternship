# Day 20: Backend Lesson 3: Leveraging ORMs for Efficient Data Operations: Full CRUD and Data Validation with Sequelize

In this lesson, we will introduce Sequelize, an Object-Relational Mapping (ORM) tool for Node.js. Sequelize offers a powerful API for managing your database interactions with support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL. It allows developers to interact with their SQL database using JavaScript objects and methods, rather than writing raw SQL queries. By the end of this lesson, you will be able to integrate Sequelize into a Node.js and Express.js application and perform full CRUD operations.

## Students Will Be Able To (SWBAT):

- Understand the purpose and advantages of an ORM.
- Integrate Sequelize into a Node.js and Express.js application.
- Perform full CRUD operations using Sequelize.
- Utilize migrations to create and update database tables.
- Utilize seed data to populate database tables with initial records.
- Understand the relationship between Sequelize models and PostgreSQL database tables.
- Implement server-side data validation using Sequelize's built-in methods.

## Agenda

### Part 1: Introduction to ORMs and Sequelize (15 mins)

- Discuss what an ORM is why we use one.
- Compare and contrast Sequelize with Prisma.
- Explain Sequelize's approach to data modeling, migrations, and seed data.

### Part 2: Setting Up Sequelize in Express.js Application (30 mins)

- Walk through the steps to install and set up Sequelize in an Express.js application.
- Discuss the naming conventions for tables and columns in Sequelize.
- Demonstrate how to create a Sequelize model & migration for the `job_applications` table.
- Show how to generate seed data to populate the job applications table with initial records.

### Part 3: CRUD Operations with Sequelize (30 mins)

- Explain how to perform Create, Read, Update, and Delete (CRUD) operations using Sequelize.
- Demonstrate these operations by refactoring the existing job applications API to utilize Sequelize.

### Part 4: Server-Side Data Validation with Sequelize (30 mins)

- Discuss the importance of server-side data validation.
- Show how to implement data validation using Sequelize's built-in validation methods.
- Discuss good practices for error handling in Express routes.

### Part 5: Recap and Q&A (15 mins)

- Summarize the key points of the lesson.
- Open the floor for any questions or clarifications.

## Part 1: Introduction to ORMs 

### What is an ORM and why should we care?

ORM stands for Object-Relational Mapping. It is a technique that lets you interact with your database in the same way you’d interact with JavaScript objects. In other words, it simplifies the process of creating, reading, updating, and deleting data from your database by allowing you to use your programming language, instead of SQL, to interact with the database.

ORMs have several key advantages:

1. **Abstraction**: They abstract the underlying SQL, making the code more readable and easier to maintain. They also provide a unified API to interact with various databases.

2. **Reduces Code Duplication**: ORMs enable you to write reusable and modular code, which reduces code redundancy.

3. **Security**: ORMs automatically escape data, protecting your application from SQL Injection attacks.

4. **Efficiency**: They provide performance optimizations like lazy loading, caching, and eager loading out of the box.

### Quick Look at Sequelize and Comparison with Prisma

**Sequelize** is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It supports the Node.js environment and uses JavaScript.

On the other hand, **Prisma** is an open-source database toolkit. It replaces traditional ORMs and can be used with TypeScript and JavaScript in the Node.js environment.

**Key Differences between Sequelize and Prisma**:

1. **Data Model Definition**: Sequelize uses a JavaScript-based model definition whereas Prisma uses the Prisma schema, a declarative and human-readable language.

2. **Database Migrations**: Sequelize provides migrations via a separate CLI tool whereas Prisma Migrate allows developers to derive migrations from the Prisma schema automatically.

3. **Typesafety**: Prisma Client, the query builder, is fully typesafe, meaning the API is auto-completed and validated at compile time. Sequelize, being a JavaScript-based ORM, doesn't offer this level of typesafety.

4. **Performance**: Prisma Client includes a number of performance optimizations such as intelligent caching which Sequelize doesn't.

Overall, Prisma offers a modern, typesafe and developer-friendly approach to data handling in Node.js. However, the choice between Sequelize and Prisma should depend on the requirements and constraints of your project. If typesafety and developer productivity are a priority, Prisma could be a better choice. If your project is already using Sequelize and it's working well for you, there might not be a strong reason to switch. 

However, there are various factors that may make Sequelize a more suitable choice over Prisma for certain use cases:

1. **Maturity and Stability**: Sequelize has been around since 2010 and has been proven stable for production usage. Its community has had more time to develop and refine the library, and there is a vast number of resources, tutorials, and third-party libraries available.

2. **Database Support**: Sequelize supports a larger number of databases out of the box. If your application needs to support MySQL, MariaDB, SQLite, or Microsoft SQL Server in addition to PostgreSQL, Sequelize can be a more suitable choice.

3. **Flexibility**: Sequelize tends to be more flexible when it comes to database design. You can create tables with composite primary keys, something not currently supported by Prisma.

4. **Raw SQL Queries**: Sequelize offers better support for raw SQL queries. While Prisma does allow raw SQL queries, it is more oriented towards using its own generated API.

5. **Synchronous APIs**: Sequelize provides synchronous versions of some APIs, which can be helpful in certain scenarios, such as scripting or debugging.

6. **Transactions**: If your application requires complex transactions, Sequelize provides a more comprehensive API for transaction management.

Remember, the best choice of ORM depends largely on the specific requirements and constraints of your project. Each tool has its strengths, and the best tool for the job often depends on the job at hand.

We'll be using Sequelize because one of its features is that due to the maturity and similarity with other established ORMs it does tend to be a bit more beginner friendly than Prisma.

### Sequelize's Approach to Data Modeling, Migrations, and Seed Data

#### Data Modeling with Sequelize

In Sequelize, we represent tables from our database as models in our application. Models are the essence of Sequelize, as they provide a high-level abstraction of the data in our database and the operations we can perform on them. We define a Sequelize model with its respective attributes and their types, and Sequelize automatically maps them to a corresponding table in the database. 

Sequelize supports a variety of data types, such as `STRING`, `INTEGER`, `BOOLEAN`, and others that we can use to define our models. It also allows for relationships between tables (such as `hasOne`, `hasMany`, `belongsTo`, etc.), making it possible to create complex data models with associations.

Here's a simple example of a model in Sequelize:

```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

Job.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // additional attributes as required...
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'job',
  }
);

module.exports = Job;
```

In this example, we've defined a `Job` model with `title` and `description` attributes.

#### Migrations with Sequelize

Migrations in Sequelize are a way to create and alter database tables. Migrations provide a version control system for your database schema which makes managing database changes over time more straightforward. 

With migrations, we can add new tables, add or remove columns, change data types, add indices, and more. All these operations can be performed without manually writing SQL queries, as Sequelize will translate these commands into the appropriate SQL. 

To create a migration, we use Sequelize CLI's `migration:generate` command, and specify what changes should be performed in the `up` and `down` methods. The `up` method describes the changes to apply to the database when the migration runs. The `down` method should essentially reverse what `up` does, allowing us to revert our database back to its previous state if necessary.

#### Seed Data with Sequelize

Seed data is used to populate a database table with initial records. This can be useful for testing, or to pre-populate certain records for an application. 

Sequelize provides a way to create seed data using the Sequelize CLI. We can generate a new seed file using the `seed:generate` command, and then define the data to be inserted into our tables in the generated file. 

Running the `db:seed:all` command will then execute all the seed files, populating our database with the defined data.

Overall, Sequelize's approach to data modeling, migrations, and seed data is to provide a structured, JavaScript-based way to define and manipulate your database, making it easier and more efficient to work with SQL databases in a Node.js environment.

## Part 2: Setting Up Sequelize in an Express.js Application

In this part of the lesson, we will install Sequelize, set up the configuration, and create a model for our job applications table. We will also discuss the naming conventions used in Sequelize.

### Installing Sequelize

To start using Sequelize in our Express.js application, we first need to install the necessary packages. Sequelize can be installed along with its command line interface (CLI) and the `pg` and `pg-hstore` libraries for PostgreSQL integration. 

We've already installed the `pg` package during yesterday's lesson, so let's install the other two now by running the following command in our terminal:

```bash
npm install --save sequelize sequelize-cli pg-hstore
```

### Setting up Sequelize

Next, let's initialize Sequelize in our project. This will create necessary folders and files for Sequelize to operate. Run the following command:

```bash
npx sequelize-cli init
```

This will create a `config`, `models`, `migrations`, and `seeders` directory in our project. The `config` directory contains a file named `config.json` where we specify the database configuration for different environments (development, test, production).

We'd need to update `config/config.json` to match our local PostgreSQL database settings:

```json
{
  "development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_DATABASE",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  //...
}
```

Instead of hardcoding the database credentials in the `config.json` file, we can use environment variables for better security and flexibility. Here's how we can modify the `config.json` file to use environment variables:

```json
{
  "development": {
    "username": "${DB_USER}",
    "password": "${DB_PASSWORD}",
    "database": "${DB_NAME}",
    "host": "${DB_HOST}",
    "dialect": "postgres"
  },
  //...
}
```

However, Sequelize won't parse these environment variables directly from `config.json` file. We need to rename our configuration file from `.json` to `.js`, which allows us to inject the environment variables dynamically. 

Rename `config.json` to `config.js`, and change the content to look like this:

```javascript
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  //...
};
```

Make sure the `.env` file is set up with the correct variables (DB_USER, DB_PASSWORD, DB_NAME, and DB_HOST) and is located in the root of our project directory. The `.env` file is not committed to version control, so you'll need to create a new one.

```
DB_USER=dev_db_user
DB_HOST=localhost
DB_NAME=job_app_tracker
DB_PASSWORD=3336c054cc5
DB_PORT=5432
```

Now, when we run our application in development mode, Sequelize will use the credentials provided in our environment variables to connect to our database.

Before this will work, however, there is one more change we need to make. Because we have renamed this file and made it a node module instead of a json file, we need to update the import in the `models/index.js` file:

Find this line:
```js
const config = require(__dirname + '/../config/config.json')[env];
```
and replace it with this:
```js
const config = require("../config/config")[env];
```

### Sequelize Naming Conventions

In Sequelize, there are a few naming conventions we should be aware of:

- **Model names** should be singular and start with a capital letter (e.g., `JobApplication`).

- **Table names** are plural and by default will be a lowercase, underscored version of the model name (e.g., `job_applications`). You can customize this by using the `tableName` option in the model definition.

- **Field names** should be camelCased in the model definition (e.g., `applicationDate`). We can configure sequelize to automatically convert this to snake_case (e.g., `application_date`) in the actual SQL queries.

### Creating a Sequelize Model

Sure, let's proceed with creating a Sequelize model that corresponds to your `job_applications` table. 

To create a new model using Sequelize, you can use the `model:generate` command provided by Sequelize CLI. 

1. In your terminal, navigate to the root directory of your project.

2. Run the following command to create a `job_application` model and corresponding migration file:

```bash
npx sequelize-cli model:generate --name JobApplication --attributes company:string,title:string,minSalary:integer,maxSalary:integer,location:string,postDate:date,jobPostUrl:string,applicationDate:date,lastContactDate:date,companyContact:string,status:integer
```

This command tells Sequelize to create a new model called `JobApplication` with the given attributes and their types. 

The `model:generate` command creates two new files in your project:

- `models/jobapplication.js`: This file contains the Sequelize model definition for the `JobApplication` model. It corresponds to the `job_applications` table in your database.

- `migrations/XXXXXXXXXXXXXX-create-job-application.js`: This file contains the Sequelize migration for creating the `job_applications` table. The `XXXXXXXXXXXXXX` in the filename will be replaced by a timestamp indicating when the migration was created.

The `jobapplication.js` file in the `models` folder should look like this:

```javascript
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    static associate(models) {
      // define association here
    }
  };
  JobApplication.init({
    company: DataTypes.STRING,
    title: DataTypes.STRING,
    minSalary: DataTypes.INTEGER,
    maxSalary: DataTypes.INTEGER,
    location: DataTypes.STRING,
    postDate: DataTypes.DATE,
    jobPostUrl: DataTypes.STRING,
    applicationDate: DataTypes.DATE,
    lastContactDate: DataTypes.DATE,
    companyContact: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};
```

In order to follow the naming conventions, we should add a couple of key value pairs to the second argument being passed to init: `tableName: 'job_applications'` and `underscored: true`

```js
JobApplication.init({
    company: DataTypes.STRING,
    // ...
  }, {
    sequelize,
    modelName: 'JobApplication',
    tableName: 'job_applications',// explicit snake cased table name
    underscored: true // this option converts camelCased columns to snake_case in the DB
  });
```

If we want to add options or constraints to any of these columns, we can also do that now. For example, if we want to make the `title`, `company` & `status` attributes conform to a `NOT NULL` constraint as well, we can specify this when creating the model. Sequelize allows you to define more intricate properties for each column, such as `allowNull`, `defaultValue`, and more. To do this, we can pass an object corresponding to the column name where we specify both the column type and any additional constraints or options we'd like to apply.

Let's open the `models/jobapplication.js` file and revise the `JobApplication.init` method as follows:

```javascript
JobApplication.init({
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minSalary: DataTypes.INTEGER,
  maxSalary: DataTypes.INTEGER,
  location: DataTypes.STRING,
  postDate: DataTypes.DATE,
  jobPostUrl: DataTypes.STRING,
  applicationDate: DataTypes.DATE,
  lastContactDate: DataTypes.DATE,
  companyContact: DataTypes.STRING,
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
}, {
  sequelize,
  modelName: 'JobApplication',
  tableName: 'job_applications',// explicit snake cased table name
  underscored: true // this option converts camelCased columns to snake_case in the DB
});
```

The `XXXXXXXXXXXXXX-create-job-application.js` file in the `migrations` folder should look similar to this:

```javascript
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JobApplications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      minSalary: {
        type: Sequelize.INTEGER
      },
      maxSalary: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      postDate: {
        type: Sequelize.DATE
      },
      jobPostUrl: {
        type: Sequelize.STRING
      },
      applicationDate: {
        type: Sequelize.DATE
      },
      lastContactDate: {
        type: Sequelize.DATE
      },
      companyContact: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JobApplications');
  }
};
```
So, we can add the `allowNull: false` constraint to the `company`, `title`, and `status` keys here as well:

```js
// ...
company: {
  type: Sequelize.STRING,
  allowNull: false,
},
title: {
  type: Sequelize.STRING,
  allowNull: false,
},
// ...
status: {
  type: Sequelize.INTEGER,
  allowNull: false,
  defaultValue: 1,
},
// ...
```

This revised setup ensures that both the `company` and `title` attributes are mandatory when creating or updating `JobApplication` records, and it sets the default value for `status` as 1.

Finally, we'll want to rename our camelCased columns in the migration to snake_case:

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("job_applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      min_salary: {
        type: Sequelize.INTEGER,
      },
      max_salary: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      post_date: {
        type: Sequelize.DATE,
      },
      job_post_url: {
        type: Sequelize.STRING,
      },
      application_date: {
        type: Sequelize.DATE,
      },
      last_contact_date: {
        type: Sequelize.DATE,
      },
      company_contact: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobApplications');
  }
};
```

Now, the `JobApplication` model is set up and ready to use in your application. But, the first thing we need to do before we can put it to use is to run our migration file to create the underlying database table to which our new model will be connected.

However, since we actually created this table in our lesson yesterday, the migration won't be able to run successfully unless we drop the table first. So, let's go ahead and do that.

#### Dropping a Table from PSQL

- open up your `psql` shell
- `\c job_app_tracker`
- `DROP TABLE job_applications;`
- verify in our PostgreSQL extension that the table is gone by Ctrl+Clicking the job_app_tracker database and selecting "Refresh Items"
- the job_applications table should no longer be present.

### Running and Reverting Migrations

After setting up the model and corresponding migration file, the next step is to run the migrations to apply the changes to the database.

1. **Running Migrations**

To run our migrations, Sequelize provides the `db:migrate` command. Let's execute this command in our terminal:

```bash
npx sequelize-cli db:migrate
```

Upon successful migration, you should see a message indicating that the `JobApplications` table was created. It looks something like this:

```
dakotamartinez@Dakotas-MacBook-M1-Pro job-application-tracker-api-solution % npx sequelize-cli db:migrate

Sequelize CLI [Node: 16.17.0, CLI: 6.6.1, ORM: 6.32.1]

Loaded configuration file "config/config.js".
Using environment "development".
== 20230711062206-create-job-application: migrating =======
== 20230711062206-create-job-application: migrated (0.023s)
```

2. **Inspecting the Database**

To verify that the migrations worked as expected, you can inspect your database using a database client. If you've used `psql`, you can run the `\dt` command to list all tables and you should see the `JobApplications` table listed. You can also use the PostgreSQL extension. Use your connection from yesterday, make sure to right click (or ctrl + click) on the database and select "Refresh Items" to see the changes take effect.

3. **Reverting Migrations**

Sometimes you might need to undo a migration, for example when you realize there's an error in it. Sequelize allows you to revert the last executed migration with the `db:migrate:undo` command. Here's how to run it:

```bash
npx sequelize-cli db:migrate:undo
```

After running this command, the `job_applications` table will be removed from your database.

4. **Reverting All Migrations**

If you want to undo all migrations, you can use the `db:migrate:undo:all` command. Be careful with this command as it will drop all tables from your database:

```bash
npx sequelize-cli db:migrate:undo:all
```

Remember, you should only run this command if you're certain you want to wipe your entire database.

5. **Re-running Migrations After Undoing**

If you've undone a migration and made changes to it, or if you just want to rerun the migration, you can use the `db:migrate` command again. This will run any migrations that haven't been run yet:

```bash
npx sequelize-cli db:migrate
```

These are the basics of running and reverting migrations in Sequelize. In a real-world application, you'd typically run migrations as part of your deployment process to ensure your database schema is always up to date with your application's requirements.

### Subsection: Show how to generate seed data to populate the job applications table with initial records

1. Create a new seed file using the Sequelize CLI. This file will contain the seed data that we want to insert into our database. In your terminal, run the following command:

```bash
npx sequelize-cli seed:generate --name demo-job-applications
```

This command will create a new file in the `seeders` folder with a name like `YYYYMMDDHHmmss-demo-job-applications.js`.

2. Open this new file in your code editor. You will see that Sequelize has generated a skeleton for you with `up` and `down` methods. The `up` method is used to apply the seed data, and the `down` method is used to undo it.

3. Replace the contents of the `up` method with the following:

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('job_applications', [{
    company: "Aha!",
    title: "Ruby on Rails Engineer",
    min_salary: 100000,
    max_salary: 160000,
    location: "Philadelphia, PA (Remote)",
    post_date: new Date("2023-06-17"),
    job_post_url: "https://www.linkedin.com/jobs/view/3638618757",
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    company: "Jobot",
    title: "Remote Front End Developer",
    min_salary: 120000,
    max_salary: 200000,
    location: "Los Angeles, CA (Hybrid)",
    post_date: new Date("2023-06-24"),
    job_post_url: "https://www.linkedin.com/jobs/view/3643460386",
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    company: "Braintrust",
    title: "Software Engineer - Freelance (REMOTE)",
    min_salary: 50000,
    max_salary: 90000,
    location: "New York, NY (Remote)",
    post_date: new Date("2023-06-20"),
    job_post_url: "https://www.linkedin.com/jobs/view/3641063402",
    status: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    company: "Underdog.io",
    title: "Frontend Engineer",
    min_salary: 88000,
    max_salary: 192000,
    location: "New York, United States (On site)",
    post_date: new Date("2023-06-19"),
    job_post_url: "https://www.linkedin.com/jobs/view/3639725859",
    status: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }], {});
}
```
Make sure in this case that the objects in your bulk insert **DO NOT** include primary keys (ids). If you do add them, PostgreSQL will have trouble tracking the autoincrementing sequence and will try to reuse the ids you assigned manually here  when you create records in the future because it isn't aware that they're already taken.

4. Replace the contents of the `down` method with the following:

```javascript
down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('job_applications', null, {});
}
```

5. Save the file. Now, you can run your seed file to insert the demo job applications into your database. In your terminal, run the following command:

```bash
npx sequelize-cli db:seed:all
```

This command will run all seed files located in the `seeders` folder. After running this command, you should see your seed data in the database. If you need to undo the seeding, you can run `npx sequelize-cli db:seed:undo:all`.

Note: Sequelize expects the table and column names in the seed files to be in the format that is actually present in the database. If you've used the `underscored: true` option in your model, but still defined the column names in camelCase in the migration file, Sequelize will be looking for camelCased column names in the seed files.

In the next section, we will see how we can utilize Sequelize to perform CRUD operations with our `JobApplication` model.

## Part 3: CRUD Operations with Sequelize

In this section, we will learn how to perform Create, Read, Update, and Delete (CRUD) operations using Sequelize. We will refactor the existing job applications API to utilize Sequelize, which will simplify our database queries and allow us to leverage the powerful features of this ORM.

In order to work with our new model in our `server.js` file, we'll need to import it like so:

```javascript
const { JobApplication } = require('./models');
```

### Create Operation with Sequelize

Sequelize provides a `create` method that we can call on our model to insert a new record into the database. The `create` method takes an object where the keys correspond to the columns of the table and the values correspond to the new data.

```javascript
// Create a new job
app.post("/jobs", async (req, res) => {
  try {
    const newJob = await JobApplication.create(req.body);

    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
```

### Read Operations with Sequelize

Sequelize provides several methods to query data from the database:

- `findAll`: This method retrieves all records that meet certain conditions. If no conditions are provided, it returns all records.

```javascript
// Get all jobs
app.get("/jobs", async (req, res) => {
  try {
    const allJobs = await JobApplication.findAll();

    res.status(200).json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
```

- `findOne`: This method retrieves one record that meets certain conditions. If no conditions are provided, it returns the first record found.

```javascript
// Get a specific job
app.get("/jobs/:id", async (req, res) => {
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
```

### Update Operations with Sequelize

Sequelize provides an `update` method that we can call on our model to update existing records in the database. The `update` method takes two arguments: an object that contains the data to be updated, and an object that specifies which records should be updated.

```javascript
// Update a specific job
app.patch("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    const [numberOfAffectedRows, affectedRows] = await JobApplication.update(req.body, { where: { id: jobId }, returning: true });

    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});
``` 

Note when we try this with Postman that we're able to pass only a single key value pair in the body and only that value is updated without affecting any columns omitted from the body of the request!

### Delete Operations with Sequelize

Sequelize provides a `destroy` method that we can call on our model to delete records from the database. The `destroy` method takes one argument: an object that specifies which records should be deleted.

```javascript
// Delete a specific job
app.delete("/jobs/:id", async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
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
```

That's it! By replacing the manual SQL queries in our Express routes with Sequelize's model methods, we've not only made our code cleaner and more readable, but we've also gained access to a host of powerful features that Sequelize provides. As we continue to build out our application, Sequelize will make it easier for us to interact with our database and perform complex queries.

## Part 4: Server-Side Data Validation with Sequelize

Server-side data validation is crucial for maintaining data integrity and preventing security vulnerabilities. It's an important step in ensuring that we are receiving the type of data we expect from the client-side and that it adheres to the specific rules we define.

Sequelize provides built-in methods for validating data before it gets persisted in the database. This can help prevent invalid or harmful data from being stored in your database.

In this section, we'll enhance our job application API to include server-side validation using Sequelize. The way this is done is by adding a key called `validate` to our model field definitions.

Let's start by updating our model `models/JobApplication.js`:

```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class JobApplication extends Model {}

JobApplication.init({
  company: {
    type: DataTypes.STRING,
    allowNull: false, // Requires company to be present
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Requires title to be present
  },
  minSalary: DataTypes.INTEGER,
  maxSalary: {
    type: DataTypes.INTEGER,
    validate: {
      minSalaryLessThanMax(value) {
        if (this.minSalary && value && value < this.minSalary) {
          throw new Error('Maximum salary cannot be less than minimum salary.');
        }
      },
    },
  },
  location: DataTypes.STRING,
  postDate: {
    type: DataTypes.DATEONLY,
    validate: {
      isDate: true, // Ensures postDate is a valid date
      isPast(value) {
        if (value > new Date()) {
          throw new Error('Post date cannot be in the future.');
        }
      },
    },
  },
  jobPostUrl: DataTypes.STRING,
  applicationDate: {
    type: DataTypes.DATEONLY,
    validate: {
      isDate: true, // Ensures applicationDate is a valid date
      isAfterPostDate(value) {
        if (this.postDate && value < this.postDate) {
          throw new Error('Application date cannot be before the post date.');
        }
      },
    },
  },
  lastContactDate: {
    type: DataTypes.DATEONLY,
    validate: {
      isDate: true, // Ensures lastContactDate is a valid date
      isPast(value) {
        if (value > new Date()) {
          throw new Error('Last contact date cannot be in the future.');
        }
      },
    },
  },
  companyContact: DataTypes.STRING,
  status: {
    type: DataTypes.INTEGER,
    allowNull: false, // Requires status to be present
    defaultValue: 1,
    validate: {
      isInt: true, // Ensures status is an integer
      min: 1, // Ensures status is at least 1
      max: 6, // Ensures status is not more than 6
    },
  },
}, {
  sequelize,
  modelName: 'JobApplication',
  underscored: true,
  timestamps: false,
});

module.exports = JobApplication;
```
We have added a few validations:
- `company` and `title` are required fields.
- If both `minSalary` and `maxSalary` are present, `maxSalary` cannot be less than `minSalary`.
- `postDate` cannot be in the future.
- `status` is a required field and must be an integer between 1 and 6.
- If both `postDate` and `applicationDate` are present, `applicationDate` cannot be before `postDate`.
- `lastContactDate` cannot be in the future.

Note that for each of these validations, we added a function that accepts `value` as a parameter. This value represents the value of that column that we're currently validating. Some of them also refer to the `this` keyword. In this case, `this` refers to the object being validated. We use `this` to allow us to access other attributes of the object in the case where we need to validate one field based on the value of another.

Next, we need to handle validation errors in our routes. When a Sequelize validation error occurs, an error of type `SequelizeValidationError` is thrown. We can catch this error and send a response with a 422 status code along with the error message:

Update the post route in `server.js`:

```javascript
app.post("/jobs", async (req, res) => {
  const jobData = req.body;
  try {
    const newJob = await JobApplication.create(jobData);
    res.status(201).json(newJob);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ errors: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});
```

This code checks if the error is a `SequelizeValidationError` and, if so, sends a response with a 422 status code along with the validation error messages. This feedback can then be displayed to the user, helping them understand what went wrong with their request.

Repeat this error handling for the edit route (`app.patch("/posts/:id"`) as it is the other that perform operations with Sequelize that will trigger validations.

Server-side validation is an essential part of building a robust and secure API. By implementing these data validation rules, we are ensuring that our application behaves correctly and predictably. It also improves the user experience, as users receive helpful error messages when they submit invalid data.

## Part 5: Recap and Q&A 

At this stage of the tutorial, we've covered a lot of ground, and it's important to consolidate our learning and clarify any lingering doubts. Let's take a moment to recap the key points and answer any questions you may have.

### Key Points 

1. **Introduction to Sequelize**: Sequelize is a powerful Object-Relational Mapping (ORM) library for Node.js, which makes it easier to communicate with our PostgreSQL database by writing JavaScript instead of SQL.

2. **Setting Up Sequelize**: We learned how to set up Sequelize in our project, including creating a Sequelize instance and configuring it to connect to our database.

3. **Models and Migrations**: We defined a model representing the structure of our `job_applications` table. We also used Sequelize migrations to handle changes to our database schema.

4. **CRUD Operations with Sequelize**: We refactored our job applications API to utilize Sequelize, replacing raw SQL queries with Sequelize's methods for creating, reading, updating, and deleting data.

5. **Server-Side Data Validation with Sequelize**: We learned how to use Sequelize's built-in validation methods to ensure the quality and integrity of our data. We discussed the importance of server-side validation and implemented several validation rules.

### Questions and Clarifications

We hope you've gained a solid understanding of how to use Sequelize with Express and PostgreSQL. But, there's always more to learn and there might be concepts that require further clarification. This is the time to ask those lingering questions, and to delve deeper into any topics that you're curious about.

Remember, there are no silly questions in learning - if you're unsure about something, it's likely that someone else is too. So, let's get those questions out in the open and learn from each other.


## Key Takeaways

Concept | Description | Example
--- | --- | ---
ORM | An Object-Relational Mapping (ORM) tool is a programming technique for converting data between incompatible type systems using object-oriented programming languages. | Sequelize is an example of an ORM for Node.js.
Sequelize Model | In Sequelize, models are the essence of everything. They represent tables in the database, and everything you do with them will be translated into SQL queries. | `Job.init({/* attributes */}, {/* sequelize, config */});`
CRUD Operations | CRUD operations refer to the basic functions of persistent storage in databases: Create, Read, Update, Delete. | In Sequelize, you can use methods like `Job.create()`, `Job.findAll()`, `Job.findOne()`, `Job.update()`, and `Job.destroy()`.
Migrations | Migrations are a way to apply version control to your database schema. Sequelize's migration feature saves you the pain of creating databases, tables, or fields manually. | `npx sequelize-cli migration:generate --name=create-notes`
Seed Data | Seed data is used to populate a database table with initial records. This can be useful for testing or to pre-populate certain records. | `npx sequelize-cli db:seed:all`
Data Validation | Validation is a crucial part of managing data. It ensures that the data that you've received and about to insert into the database is complete, in the correct format, and is sensible. | Sequelize provides built-in validation methods, such as `notEmpty`, `isEmail`, and `len`.

## Resources

- [Sequelize Documentation](https://sequelize.org/master/manual/getting-started.html)
- [Understanding Sequelize Migrations](https://sequelize.org/master/manual/migrations.html)
- [Server-side Data Validation with Sequelize](https://sequelize.org/master/manual/validations-and-constraints.html)