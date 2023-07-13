# Day 22: Node & Express Part 5 - Implementing Authentication and Access Control

## SWBAT:
- Understand the concepts of Authentication and Authorization in web applications.
- Implement user authentication using hashed passwords and Session Cookies.
- Implement user authorization to control access to certain routes in the application using Express.js and middleware.
- Use Postman to test API endpoints that require credentials.

## Agenda:
1. Introduction to Authentication and Authorization
    - Explanation of Authentication
    - Explanation of Authorization
2. Testing Authentication and Authorization with Postman
    - Setting up Postman
    - Testing protected routes
    - Understanding Postman responses and error messages
3. Setting up User Authentication
    - Hashing Passwords with bcryptjs
    - Storing hashed passwords in the database
    - Logging in a User and creating a Session Cookie
4. User Authorization and Middleware
    - Protecting routes with middleware
    - Checking for session cookie and granting access

# Introduction to Authentication and Authorization

- [Explanation of Authentication](#explanation-of-authentication)
    - [Understanding the need for secure user identification](#understanding-the-need-for-secure-user-identification)
    - [Explanation of username/password based authentication](#explanation-of-usernamepassword-based-authentication)
    - [Difference between authentication and authorization](#difference-between-authentication-and-authorization)
- [Explanation of Authorization](#explanation-of-authorization)
    - [Understanding the role-based access](#understanding-the-role-based-access)
    - [Checking for permissions before granting access](#checking-for-permissions-before-granting-access)
    - [Why authorization is essential in web applications](#why-authorization-is-essential-in-web-applications)

## Explanation of Authentication

Authentication is the process of verifying the identity of a user, device, or system. It often involves validating credentials like username and password against a known set of correct values.

### Understanding the need for secure user identification

In our job application tracker, users will be creating and storing personal data related to their job search. This could include details of the jobs they've applied to, their notes, and contact information. It's crucial that this information is kept secure and that only the correct user can access their own data. Authentication is the first step to ensuring this security, by verifying that a user is who they claim to be.

### Explanation of username/password based authentication

The most common form of authentication is via a username and password. The user enters these details, and the system checks them against stored values. If the values match, the user is granted access. In the context of our job application tracker, when a user creates an account, they'll choose a username and password which will be stored securely in our database. Then, whenever the user wants to access their data, they'll need to supply these same details.

### Difference between authentication and authorization

While they are related security measures, authentication and authorization are distinct processes:

- **Authentication** verifies who a user is. It's the process of validating user credentials to grant them access to the system.
- **Authorization**, on the other hand, determines what an authenticated user is allowed to do. It's the process of giving authenticated users permission to access specific resources or make certain requests.

In our job application tracker, authentication verifies a user's identity when they log in, while authorization checks whether they're allowed to view, create, or modify a particular job application.

## Explanation of Authorization

Authorization is the process that comes after successful authentication. Once the system knows who the user is, it must then determine what that user is allowed to do. This can range from viewing or editing certain data, to having admin privileges to change the system settings.

### Understanding the role-based access

Role-based access control is a method of restricting access to authorized users. This is typically achieved by assigning roles to users, and then setting permissions that determine what each role is allowed to do. In our job application tracker, we might have a simple role system where all users are equal, or we might decide to have admin users who have more control.

### Checking for permissions before granting access

Before the system allows a user to carry out an action, it should check that the user has the necessary permissions. In our job application tracker, this could be as simple as checking that the user is trying to view or edit their own job applications, and not those belonging to another user.

### Why authorization is essential in web applications

Authorization is crucial for maintaining security in web applications. It ensures that users can only perform actions they're allowed to, and access data they're supposed to see. Without authorization, a user might be able to view sensitive data, or even perform harmful actions like deleting data. In our job application tracker, good authorization practices will ensure that users can only access their own job applications, preserving the privacy and integrity of the data.

I like to use the analogy of checking into a Hotel to explain Authentication and Authorization.

| Hotel Analogy | Web Authentication |
|---------------|--------------------|
| Creating a Reservation | Signing up for an account |
| Checking in to the Hotel | Logging in to your account |
| Hotel Guest ID and Credit Card | User Credentials (Username and Password) |
| Key Card | Cookie |
| Card Reader | Server's Session Method |
| Hotel System | Web Server |
| Room Access | Authorization |

And now, let's expand this into a story:

> Imagine you are a guest arriving at a hotel. To begin with, you approach the front desk with your ID and credit card - your credentials. The hotel staff verifies these credentials by checking their system to find your reservation. This is akin to **authentication** in web applications. The hotel staff is validating your identity, making sure you are the guest you claim to be.
>
> Once your identity is verified, the hotel staff gives you a key card. This key card is unique to you and your stay; it's the equivalent of a **cookie** in web authentication. It doesn't have your personal information but carries an identifier that the hotel system recognizes. Like a cookie, it is something you must present each time you wish to access certain hotel facilities.
>
> Now, you proceed to your room and slot your key card into the door's card reader. This card reader works like the server's **session method** in web authentication. It reads the information on the key card and checks it with the hotel's system. This system, like a **web server**, knows which rooms you should have access to based on the details tied to your key card.
>
> If the card reader confirms that your key card corresponds to the room you're trying to access, the door unlocks, and you're allowed in. This is the **authorization** step. It doesn't matter if you're the one holding the key card, what matters is whether the key card gives you access to that room. Similarly, in web applications, once your cookie is authenticated, the server checks what resources you are authorized to access.
>
> In the event you lose your key card or your stay has ended, the hotel will invalidate your card, similar to how a session cookie might expire. Also, should you try to access areas of the hotel you are not authorized to, like another guest's room or a restricted staff area, the system will deny you access.
>
> This hotel check-in process is a great analogy for understanding the principles of authentication and authorization in web applications.

# Preparing Postman for Testing Authentication and Authorization

This section aims to guide you on how to configure Postman to simulate API requests necessary for testing our authentication and authorization features. 

* [Organizing Postman for Authentication Testing](#organizing-postman-for-authentication-testing)
    * [Creating a New Folder for Authentication Related Requests](#creating-a-new-folder-for-authentication-related-requests)
    * [Adding the Necessary Requests to the Folder](#adding-the-necessary-requests-to-the-folder)
* [Understanding Protected Routes and Their Purpose](#understanding-protected-routes-and-their-purpose)
    * [Brief Overview of the /jobs Endpoints](#brief-overview-of-the-jobs-endpoints)
    * [Why Do We Need to Be Logged In?](#why-do-we-need-to-be-logged-in)
* [Interpreting Postman Responses and Error Messages](#interpreting-postman-responses-and-error-messages)
    * [Introduction to Response Codes Specific to Authentication and Authorization Errors](#introduction-to-response-codes-specific-to-authentication-and-authorization-errors)
    * [Troubleshooting Common Error Messages](#troubleshooting-common-error-messages)

## Organizing Postman for Authentication Testing

As our application grows and becomes more complex, it's essential to keep our testing environment organized. By grouping related requests into folders within a collection, we can ensure that our tests remain easy to find and run.

### Creating a New Folder for Authentication Related Requests

In Postman, folders serve as subcategories within collections where you can group related requests. To create a new folder:

1. Locate your Job Application Tracker collection in the sidebar.
2. Right-click on it and select "Add Folder".
3. Name the folder "Authentication".

### Adding the Necessary Requests to the Folder

With the new folder created, it's time to add the requests necessary for testing authentication. These are:

1. **Signup**: To register a new user
    - Method: `POST`
    - URL: `http://localhost:4000/signup`
    - Body (JSON):
    ```json
    {
        "name": "testuser1",
        "email": "user1@test.com",
        "password": "password"
    }
    ```
2. **Login**: To authenticate an existing user
    - Method: `POST`
    - URL: `http://localhost:4000/login`
    - Body (JSON):
    ```json
    {
        "email": "user1@test.com",
        "password": "password"
    }
    ```
3. **Logout**: To invalidate a user's session
    - Method: `DELETE`
    - URL: `http://localhost:4000/logout`

To add these requests:

1. Right-click on the Authentication folder and select "Add request".
2. Name the request and set the details according to the above.
3. Click 'Save to Authentication'.

## Understanding Protected Routes and Their Purpose

In our application, certain routes are protected - they require the user to be authenticated before they can access them. For instance, the `/jobs` endpoints are protected routes.

### Brief Overview of the /jobs Endpoints

The `/jobs` endpoints provide access to job application data. However, these endpoints should only be accessible to authenticated users - we wouldn't want just anyone to view or manipulate this data.

### Why Do We Need to Be Logged In?

Being 'logged in' means that the user has been authenticated and their session is active. In our hotel analogy, this would be equivalent to checking in at the front desk and receiving a key card. In the context of our application, the 'key card' takes the form of a session cookie, which is provided upon successful login. This session cookie must then be supplied with each request to a protected route to verify the user's identity and provide access.

In the next sections, we'll discuss how we can ensure that credentials (cookies) are included with requests sent from Postman to our API.

## Interpreting Postman Responses and Error Messages

As you test your routes, you'll receive various responses and, likely at times, encounter error messages. Understanding these can provide valuable insight into the behavior and potential issues of your application.

### Introduction to Response Codes Specific to Authentication and Authorization Errors

Certain HTTP response status codes are particularly relevant to authentication and authorization:

* `401 Unauthorized`: The request requires user authentication. If you see this, it could mean that no session cookie was provided, or the session cookie was invalid.
* `403 Forbidden`: The server understood the request, but it refuses to authorize it. This could mean the user is trying to access a resource they don't have permissions for.
* `404 Not Found`: This generally means the requested resource could not be found on the server.

### Troubleshooting Common Error Messages

Error messages are your friends - they provide crucial information about what went wrong. If you encounter an error:

1. Look at the HTTP status code and refer to the list above.
2. Read the error message. It often describes the problem quite accurately.
3. Check the details of your request in Postman. Is the URL correct? Did you provide all necessary headers and the body (if needed)?
4. If everything seems correct, check your server code. Is the route defined correctly? Is your authentication/authorization middleware functioning as expected?

Through the iterative process of making requests, observing the responses, and troubleshooting any errors, you'll gain a deep understanding of how authentication and authorization work in your application.

# Setting up User Authentication

In this section, we will learn how to set up user registration and login in our application using bcryptjs for password hashing and express-session for session management. 

- [Setting Up User Registration](#setting-up-user-registration)
    - [Installing bcryptjs and understanding its role](#installing-bcryptjs-and-understanding-its-role)
    - [Adding password field in the User model](#adding-password-field-in-the-user-model)
    - [Adding the password column to the Users table](#adding-the-password-column-to-the-users-table)
    - [How to hash a password before storing](#how-to-hash-a-password-before-storing)
    - [Ensuring hashed passwords are stored, not plain text passwords](#ensuring-hashed-passwords-are-stored-not-plain-text-passwords)
- [Logging in a User and Creating a Session Cookie](#logging-in-a-user-and-creating-a-session-cookie)
    - [Understanding the login flow](#understanding-the-login-flow)
    - [Verifying user credentials against the stored hashed password](#verifying-user-credentials-against-the-stored-hashed-password)
    - [Configuring Express-Session](#configuring-express-session)
    - [Generating a Session Secret Key and Adding it to .env](#generating-a-session-secret-key-and-adding-it-to-env)
    - [Creating and sending a session cookie to the client](#creating-and-sending-a-session-cookie-to-the-client)
- [Logging Out a User and Destroying the Session](#logging-out-a-user-and-destroying-the-session)

## Setting Up User Registration

### Installing bcryptjs and understanding its role

Firstly, we'll install bcryptjs using npm (Node package manager). It is a library that helps us hash passwords. Hashing is the process of converting an input into a fixed-size string of bytes, which is typically a 'digest' that is unique to each unique input. It is crucial for securely storing passwords in databases. 

To install bcryptjs, navigate to the root directory of your project and run:

```bash
npm install bcryptjs
```
### Adding password field in the User model

We need to update our User model to include a password field. This field will store the hashed password of the user.

```javascript
password: {
  type: DataTypes.STRING,
  allowNull: false
}
```

### Adding the password column to the Users table

Next, we need to add a new column to our users table in the database to store the hashed password. Since we're using Sequelize, this will be done through a new migration file.

> Before you can do this on your machine, you'll need to replace all of the migration files in the starter code with the ones you have on your own machine. You can also do this by renaming them all manually, but the easiest thing to do is to delete all the migrations and copy yours into the starter code.

1. Generate a new migration file with Sequelize CLI. You can replace `add_password_to_users` with a name that makes sense to you:

    ```bash
    npx sequelize-cli migration:generate --name add_password_to_users
    ```

2. This will generate a new file in your `migrations` folder. Open this file, it should look something like this:

    ```javascript
    'use strict';

    module.exports = {
      up: async (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
      },

      down: async (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
      }
    };
    ```

3. We're going to add the password field in the `up` function and remove it in the `down` function.

    ```javascript
    "use strict";

    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "password", {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        });
      },

      async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "password", {});
      },
    };
    ```

4. Run the migration:

    ```bash
    npx sequelize-cli db:migrate
    ```

After running the migration, the `users` table should now have a `password` column. 
### How to hash a password before storing

When a user registers, we'll hash the password provided in the request before storing it in the database. This can be done using the `bcrypt.hash()` method.

In your signup route handler, you should have something like this:

```javascript
const bcrypt = require("bcryptjs");
const { JobApplication, User } = require("./models");

// In your signup route handler
app.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // ...rest of your signup logic
});
```

### Ensuring hashed passwords are stored, not plain text passwords

Now, when creating a new user, instead of storing the password directly, we store the hashed password. You can update your user creation logic to the following:

```javascript
const user = await User.create({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
});
```

In full context, here's what the route looks like.

```js
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: error,
    });
  }
});
```

Let's test this out by sending our request in Postman to signup with our test user. Make sure to start the server by running `npm start`

And with this, you've successfully set up the user registration process with hashed passwords!

At this point, it would also be a good idea to update our seed file to add a password to our demo user.

```js
"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Dakota",
          email: "dakota@dakota.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash("password", 10)
        },
      ],
      {}
    );
    // ...
};
```

And then run the seeds again:

```bash
npx sequelize-cli db:seed:undo
```

```bash
npx sequelize-cli db:seed:all
```

## Logging in a User and Creating a Session Cookie

### Understanding the login flow

When a user attempts to log in, we need to verify their credentials. This involves comparing the password they've submitted with the hashed password stored in our database.

### Verifying user credentials against the stored hashed password

Bcryptjs provides a method `bcrypt.compare()` which allows us to compare the entered password with the stored hashed password. 

Here's what our login route will look like.

```javascript
app.post('/login', async (req, res) => {
  try {
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: 'Incorrect credentials',
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match
        // TODO: Create a session for this user

        res.status(200).json({
          message: 'Logged in successfully',
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: 'Incorrect credentials' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during the login process' });
  }
});
```

Here's what's happening in the above code:

1. **Try-Catch Block:** We begin by wrapping our login logic inside a `try`-`catch` block. This enables us to handle any unexpected errors during the login process, such as issues with accessing the database or calling an undefined function.

2. **Find User:** Inside the `try` block, we attempt to find a user in our database that matches the email supplied in the POST request. Sequelize's `findOne()` method returns the first entry it finds that matches the condition we provide (in this case, `{ where: { email: req.body.email } }`).

3. **User Not Found:** If no user is found (i.e., if `user` is `null`), we return a response with a status of 401 (Unauthorized) and a message of 'Incorrect credentials'. This doesn't give away whether it was the email or password that was incorrect, providing an extra layer of security.

4. **Compare Passwords:** If a user is found, we use bcrypt's `compare()` method to compare the plaintext password from the request with the hashed password from the database.

5. **bcrypt compare():** The `compare()` method is asynchronous and takes a callback function. The first parameter of the callback is an error, if any occurred. The second parameter is a boolean result, which is `true` if the passwords match and `false` if they do not.

6. **Successful Login:** If the passwords match, we return a response with a status of 200 (OK) and a message of 'Authentication successful', along with the user's details. Here, we've also included a TODO for setting up session management, which we'll cover next.

7. **Unsuccessful Login:** If the passwords do not match, we return a response with a status of 401 (Unauthorized) and a message of 'Incorrect credentials'.

8. **Catch Block:** Finally, if an error is thrown anywhere inside the `try` block, we catch that error in the `catch` block. Here, we return a response with a status of 500 (Internal Server Error) and a message of 'An error occurred during the login process'. This provides a generic error message that doesn't disclose any specific information about what went wrong, maintaining the security of our application.

In order to test this out, we can use the `POST localhost:4000/login` request with correct and incorrect credentials.

### Configuring Express-Session

Before we can start saving user login sessions, we need to configure our app to use the `express-session` middleware. Here are the steps:

1. Install `express-session` by running the following command in your terminal:

    ```bash
    npm install express-session
    ```

2. After installing the middleware, you'll need to set it up in your main server file. Add the following lines at the top of your `app.js` (or `server.js`) file to import `express-session`:

    ```javascript
    const session = require('express-session');
    ```

3. We'll now configure the middleware using `app.use()`. Add the following code block to your `app.js` (or `server.js`) file:

    ```javascript
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000 // 1 hour
      },
    }));
    ```

    Note that we are using `process.env.SESSION_SECRET` as our secret. This will allow us to store our secret key in the `.env` file, keeping it secure.

### Generating a Session Secret Key and Adding it to .env

For the secret key, it's essential to ensure it's random and secure. Node.js has a built-in module called `crypto` that can help us generate random strings. Here's how you can use it:

1. In your terminal, open the Node.js REPL by simply typing `node` and hitting `enter`.

2. Type the following command to generate a random string:

    ```javascript
    require("crypto").randomBytes(64).toString("hex")
    ```

3. This will output a random string which can be used as your secret key. Copy this string.

4. Open your `.env` file and add the following line:

    ```
    SESSION_SECRET=your_generated_secret
    ```

    Replace `your_generated_secret` with the string you just copied.

5. Save the `.env` file and make sure it is added to your `.gitignore` file. This ensures the secret key is not exposed in your public repository, keeping it secure.

Remember to restart your server whenever you make changes to your `.env` file, so that the new environment variables are loaded.

With this, we're ready to manage sessions in our application. You can now use `req.session` to save and retrieve session data in your route handlers.
### Creating and sending a session cookie to the client

Once the user is authenticated, we create a session and send a cookie to the client. We'll use the express-session library for this. 

```javascript
req.session.userId = user.id;
res.status(200).json({ message: "Logged in successfully" });
```

The `req.session.userId` line is storing the user's id in the session. The session data is stored server-side. 

By setting a property on the `req.session` object, we're telling Express to save that value into the session store and also send a cookie to the client.

With this setup, you should now be able to test your signup and login routes using Postman. You can send POST requests to the `/signup` and `/login` routes with the appropriate payloads (name, email, and password) and see if you get the expected responses. For example, after a successful signup, the hashed password should be stored in the database, and after a successful login, you should receive a session cookie.

If we want to automatically login our user after they have successfully registered, we can add the same session line to our `post /signup` route as well.

```js
req.session.userId = user.id;
```
Sure, here's how to set up a `/logout` route:

### Logging Out a User and Destroying the Session

Now that we've covered registration and login, the next step is to implement user logout. Logging out is done by destroying the user's session. Here's how to do it:

1. In your `server.js` file, define a new route for `/logout`:

    ```javascript
    app.delete('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.sendStatus(500);
            }

            res.clearCookie('connect.sid');
            return res.sendStatus(200);
        });
    });
    ```

This route works as follows:

- `req.session.destroy()` destroys the session. It takes a callback that will be run after the session gets destroyed. The callback takes an error as its argument, if any occurred.
- Inside the callback, we first check for an error. If there's an error, we return a response with a status code of 500, which means "Internal Server Error".
- If there's no error, we then clear the cookie from the client's browser using `res.clearCookie()`. The argument to `clearCookie()` is the name of the cookie to be deleted. `connect.sid` is the default name for the session ID cookie, but if you've set a different name for your session ID cookie in your session configuration, use that instead.
- Lastly, we return a response with a status code of 200, which means "OK".

This will successfully log out the user from the application. You can test this in Postman by creating a new DELETE request for `http://localhost:4000/logout` and sending it after you've logged in. After logging out, if you try to access a protected route, you should see an error message indicating you're not authorized. We'll use this to test out the protected routes we configure in the final section.

Sure, I'm glad to provide the detailed content for the section of **User Authorization and Middleware**:

# User Authorization and Middleware
In this section, we'll dive into the concepts of user authorization and middleware. We will create middleware functions in Express.js, then create a middleware to protect our routes. We'll also look at how to check for session cookies and control access to our routes based on these cookies.

- [Protecting Routes with Middleware](#protecting-routes)
  - [How Middleware Functions Work in Express.js](#how-middleware-functions-work-in-expressjs)
  - [Creating Middleware to Protect Routes](#creating-middleware-to-protect-routes)
- [Checking for Session Cookie and Granting Access](#checking-for-session-cookie-and-granting-access)
  - [How to Check for Session Cookies in Middleware](#how-to-check-for-session-cookies-in-middleware)
  - [Granting or Denying Access Based on Session Cookies](#granting-or-denying-access-based-on-session-cookies)
- [Ensuring users can only Update and Delete their own Records](#ensu)



## Protecting Routes with Middleware

### How Middleware Functions Work in Express.js
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

### Creating Middleware to Protect Routes

For example, in our Job Application Tracker, we want to protect the `/jobs` route so that only logged-in users can access it. We can create a middleware function that checks if the user is logged in before allowing them to access this route.

```javascript
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'You must be logged in to view this page.' });
  }
  next();
};
```

Then, we use this middleware function in our `/jobs` route:

```javascript
app.get("/jobs", authenticateUser, (req, res) => {
  // Your code here...
});
```

Note that this middleware function is a bit different from the ones we've configured before in that we didn't attach it with `app.use()`. There's a good reason for this. The `authenticateUser` middleware function will prevent a request from going through as planned if a user is not logged in. But, there are some routes in our application that should be accessible to users who **aren't** logged in. For example, we'd have problems if users couldn't do `post /signup` or `post /login` because they weren't already logged in!

Because we want to use this middleware only on selected routes, we define it as a function and then add it as a second argument (between the path and the route handler) to the routes we want to turn into protected routes. 

We actually want to apply this middleware function to all of the /jobs routes, so let's update our `server.js` file to include it.

```js
app.get("/jobs", authenticateUser, (req, res) => {
  // Your code here...
});
app.get("/jobs/:id", authenticateUser, (req, res) => {
  // Your code here...
});
app.post("/jobs", authenticateUser, (req, res) => {
  // Your code here...
});
app.patch("/jobs/:id", authenticateUser, (req, res) => {
  // Your code here...
});
app.delete("/jobs/:id", authenticateUser, (req, res) => {
  // Your code here...
});

app.post("/jobs", authenticateUser, (req, res) => {
  // y
})
```

## Checking for Session Cookie and Granting Access

Let's review how this actually works.

### How to Check for Session Cookies in Middleware
Session cookies are stored in the `req.session` object. We can access the session cookie for a particular user through `req.session.userId`. Remember, this is analogous to our hotel guest bringing their keycard to the card reader. 

In the `authenticateUser` middleware function above, we check if `req.session.userId` exists. If it does, it means the user is logged in, and they can proceed to the next middleware function or the final route handler. If it doesn't exist, it means the user is not logged in, and we send a response with a status of 401 Unauthorized.

In this case, we're just checking if they're logged in before allowing the request to proceed. 

### Granting or Denying Access Based on Session Cookies

If `req.session.userId` exists, we call `next()`, which hands over control to the next middleware function or the final route handler. This effectively grants the user access to the protected route.

If `req.session.userId` doesn't exist, we return a response with a status of 401 Unauthorized and a message telling the user they must be logged in. This effectively denies the user access to the protected route.

To test this middleware, you can make requests to the protected route in Postman. When you're logged in, you should be able to access the route. But if you're not logged in or if your session has expired, you should see a 401 Unauthorized error.

## Ensuring users can only Update and Delete their own Records

Finally, we should ensure that users can only update and delete their own job applications. Let's define a helper function called `authorizeModification` which will take the `model`, `id`, and current `userId` as parameters and determine if the user created the record. If so, it will return `true`, if not it will return `null`.

```js
const authorizeModification = async (req, res, model, id) => {
  const record = await model.findOne({ where: { id: id } });
  if (record && record.UserId !== parseInt(req.session.userId, 10)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform that action." });
  }
};
```

And then we can use this function within our update and delete routes.

```js
// Update a specific job
app.patch("/jobs/:id", authenticateUser, async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    await authorizeModification(req, res, JobApplication, jobId);
    // ...
  }
});

// Delete a specific job
app.delete("/jobs/:id", authenticateUser, async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  try {
    await authorizeModification(req, res, JobApplication, jobId);
    // ...
  }
});
```

This will allow us to return a `403` status code error if users try to modify other user's job applications. To test this, we'd need to register for another user account, and then try to delete a job application that belongs to our first user. We should see our error message and the `403` status code.

## Key Takeaways

| Concept | Description | Example |
|---------|-------------|---------|
| Authentication | A process by which the system validates a user's identity. | Login process using username and password. |
| Authorization | A security measure used to determine user/client privileges or access levels related to system resources, including computer programs, files, services, data and application features. | Middleware in Express.js to block or allow access to certain routes. |
| Middleware | Functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. | A function in Express.js to check for session cookie. |
| Session Cookie | A piece of data that servers store on a client's device. Servers use session cookies to know if the client is logged in or not. | When logging in, the server sends a session cookie to the client. |

## Resources
- [Express.js Middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [bcryptjs documentation](https://www.npmjs.com/package/bcryptjs)
- [Cookies vs Tokens: The Definitive Guide](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/introduction/)