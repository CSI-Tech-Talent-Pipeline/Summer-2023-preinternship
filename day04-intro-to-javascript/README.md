# Intro to JavaScript

## Students Will Be Able To (SWBAT):

- Understand and explain the basic syntax and features of JavaScript.
- Execute manual testing of JavaScript code via console or browser.
- Write, execute, and debug simple JavaScript programs.
- Differentiate between different data types in JavaScript (numbers, strings, booleans, arrays, objects), and apply destructuring assignment.
- Use conditionals (if, else, switch) and loops (for, while) to control program flow.
- Define and call functions with arguments.
- Understand the concept of scope in JavaScript.
- Utilize arrays, understand array methods, and implement callbacks in JavaScript.

## Agenda:

1. **Introduction to JavaScript**

   - Brief history and purpose of JavaScript.
   - Comparison with C++ and overview of differences.

2. **Manual Testing**

   - How to verify JavaScript code in console or browser.
   - Implementing manual testing at each step.

3. **Basic Syntax and Features**

   - Variables, constants, and data types.
   - Operators, expressions, and destructuring assignment.
   - Console logging and alerts.

4. **Control Structures**

   - Conditionals: if, else, switch.
   - Loops: for, while.

5. **Functions and Scope**

   - Defining and calling functions.
   - Understanding scope in JavaScript.

6. **Arrays, Array Methods, and Callbacks**
   - Understanding arrays in JavaScript.
   - Common array methods and introduction to callbacks.

Each of these sections will be explored through practical examples.

# Section 1 Intro to JavaScript

### The Birth of JavaScript

#### Why JavaScript?

In the early days of the web, HTML and CSS were used for structuring and styling content, but they fell short when it came to creating interactive, dynamic experiences for users. Enter JavaScript, a scripting language created by Brendan Eich in 1995 while he was an engineer at Netscape.

JavaScript was designed to make web pages alive. It could respond to user actions, such as clicks or key presses, manipulate the Document Object Model (DOM), and communicate asynchronously with the server, leading to the development of Single Page Applications (SPAs) and AJAX.

#### The Evolution of JavaScript

JavaScript has grown significantly since its inception. Its first version, ECMAScript 1, was standardized in 1997. Major updates have included ECMAScript 5 (ES5) in 2009, which introduced strict mode and JSON support, and ECMAScript 2015 (ES6), which added classes, modules, arrow functions, promises, and much more. Today's JavaScript, ECMAScript 2020 (ES11), includes optional chaining, nullish coalescing, and private class fields, among other features.

### JavaScript vs. C++

#### JavaScript and C++: Spot the Differences

JavaScript and C++ differ in many ways. Here are a few key differences:

- **Typing**: JavaScript is dynamically typed, meaning a variable's type is checked at runtime. C++ is statically typed and requires type declaration at compile time.
- **Memory Management**: In JavaScript, memory management is automatic through a process called garbage collection. In C++, developers have direct control over memory management.
- **Object-Oriented Programming (OOP)**: JavaScript uses prototype-based inheritance, while C++ uses class-based inheritance. _For now_: this means when you look up Array methods in the JavaScript documentation on MDN, they'll look like this `Array.protoype.forEach()`

#### JavaScript and C++: Spot the Similarities

Despite their differences, JavaScript and C++ share some similarities. Both support object-oriented programming, have similar syntax for basic control structures (like if, for, while), and use similar operators. Your knowledge of these structures and operators in C++ will definitely come in handy when learning JavaScript.

### The Role of JavaScript Today

#### JavaScript in the Wild

Today, JavaScript is used in many different environments, not just in the browser. While client-side JavaScript enables interactivity in the browser, server-side JavaScript (like Node.js) allows developers to build the backend of web applications. You'll even find JavaScript in game development, robotics, and more!

#### Why Full-Stack Developers Need JavaScript

JavaScript is essential for full-stack developers because it's the only language natively supported by all web browsers. This means you can write both the frontend and backend of a web application using just one language. JavaScript, combined with HTML and CSS, forms the cornerstone of web development, enabling you to build powerful, interactive web applications.

# Section 2: Manual Testing

In this section, we'll cover the importance of manual testing in development and the basic steps to manually test JavaScript code. We'll be working with an array of job objects, which we'll use to practice inspecting and manipulating data. Manual testing is a crucial part of your toolkit as a JavaScript developer. Next week, we will be introducing automated testing which also plays an important role in the SDLC (Software Development Lifecycle).

In this section, we will:

- Understand the role and significance of manual testing in development.
- Perform basic manual testing in the JavaScript console.
- Verify and test code changes using the browser's JavaScript console.

1.  **Understanding Manual Testing**

    - Why do we manually test code?
    - What's the role of manual testing in the development lifecycle?

2.  **Performing Manual Testing**

    - How to access and use the browser's JavaScript console for testing.
    - Practical examples using the `jobs` data structure.

## Understanding Manual Testing

### The Importance of Manual Testing

Manual testing is an essential part of software development. Before automated testing tools were prevalent, developers heavily relied on manual testing to catch bugs and validate that the code is working as expected.

Imagine you are writing a function to filter out jobs in our list that offer remote opportunities. Before you run any automated tests or even implement this function in your application, you want to ensure it works. That's where manual testing comes in. By invoking your function with the `jobs` array and checking the output, you can confirm whether your function works correctly.

### Manual Testing in the Development Lifecycle

Manual testing is prevalent at every stage of the development lifecycle. When writing code, developers often use manual testing to verify their changes before moving onto automated testing. During code reviews, manual tests can validate changes. Even after deployment, manual testing can be useful for troubleshooting issues in the production environment.

## Performing Manual Testing

### Console Commandos: Your Manual Testing Toolkit

The browser's JavaScript console is a powerful tool for manual testing. The `console.log()` function is probably the most commonly used for printing out variable values and function outputs. However, there are more tools at our disposal:

- `console.error()`: Outputs an error message to the console.
- `console.table()`: Displays tabular data as a table, which can be extremely helpful when working with arrays of objects like our `jobs` list.

Open up your browser's developer tools (you can usually do this with F12 or Ctrl+Shift+I / Cmd+Option+I), navigate to the console, and let's test these out with our `jobs` array.

```js
console.log(jobs);
```

```js
console.table(jobs);
```

### Getting Hands-On with Manual Testing

Manual testing often involves manipulating your data and checking whether the output aligns with your expectations. Let's say we want to access the `title` of the first job in our array:

```js
console.log(jobs[0].title);
```

You should see "Ruby on Rails Engineer" printed out in the console. Congratulations, you just performed a manual test!

Now, let's print out the titles of all jobs using a loop:

```js
for (let i = 0; i < jobs.length; i++) {
  console.log(jobs[i].title);
}
```

With this, you should see the titles of all jobs printed in the console.

## Resources for Further Reading:

1.  [Chrome DevTools for JavaScript](https://developers.google.com/web/tools/chrome-devtools/javascript)
2.  [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)
3.  [JavaScript Debugging](https://javascript.info/debugging-chrome)

# Section 3. Basic Syntax and Features

### From var to const: Learning about Variables and Constants in JavaScript

Variables in JavaScript are fundamental. They're like containers for storing data values. In JavaScript, you can declare variables using `var`, `let`, or `const`.

`var` is the old way of declaring variables. However, it's not recommended because of its confusing scoping rules. Nowadays, `let` and `const` are preferred.

`let` allows you to declare a variable that can be changed later on, while `const` lets you declare a constant value---a value that cannot be changed.

Let's declare some variables:

```js
let jobCount = jobs.length; // You can change this later (by reassigning its value)
console.log(jobCount); // Outputs: 7

const pi = 3.14159; // This value can never be changed (by reassignment)
console.log(pi); // Outputs: 3.14159

const compliments = [];
compliments.push("You are very friendly"); // this is okay, because even though it modifies the compliments array, it doesn't reassign compliments to a new value.
```

### JavaScript Data Types: Diving into Numbers, Strings, Booleans, Arrays, and Objects

JavaScript has a few basic data types:

- `Number`: Any numerical value---integer or floating-point.
- `String`: A sequence of characters used for text.
- `Boolean`: A binary data type having two values, `true` and `false`.
- `Array`: A collection of data items.
- `Object`: A collection of key-value pairs.

There are others, but these are the ones you'll see most often.

Here's an example of each:

```js
let myNumber = 42; // Number
let myString = "Hello, world!"; // String
let myBoolean = true; // Boolean

let myArray = [1, 2, 3, 4, 5]; // Array

let myObject = {
  // Object
  name: "John",
  age: 30,
  city: "New York",
};
```

> Notice that none of these variable declarations includes a type like we would require in a language like C++. While it is technically possible to reassign a variable to a different type after it is declared, it is still good practice to keep the type of a variable consistent after you've assigned the variable a value. For example, avoid reassigning `myNumber` to `'27'` later on in the program.

### Simplifying Complexity with Destructuring Assignment in JavaScript

Destructuring assignment is a handy feature in JavaScript that lets you unpack values from arrays or properties from objects into distinct variables.

Let's say we want to get the `title` and `company` of the first job in our array. Here's how we do it with destructuring:

```js
let { title, company } = jobs[0];
console.log(title); // Outputs: "Ruby on Rails Engineer"
console.log(company); // Outputs: "Aha!"
```

In this case, we've surrounded `title`, and `company` with `{}` because we're doing destructuring assignment on an object. Here, `jobs[0]` is the first job object in our array of jobs.

### JavaScript's Interactive Features: Exploring Console Logging and Alerts

JavaScript provides several ways to interact with users. Two of the most basic ones are `console.log()` and `alert()`.

`console.log()` prints out a message to the console, which we've used extensively in our manual testing.

`alert()` shows an alert dialog with a specified message and an OK button.

```js
console.log("This will be printed in the console.");

alert("This will show up as an alert in the browser.");
```

Try running this in your console. Notice that alert() stops the execution of JavaScript until the user closes the alert. Therefore, it's not commonly used in modern web development but can be handy for simple debugging.

There's another similar method called `confirm()`. It behaves in a similar way to `alert()`, except that it also presents a Cancel button in addition to the OK button generated in the dialog box. In addition, `confirm()` will return `true` if the OK button is clicked, and `false` if the Cancel button is clicked.

```js
if (confirm("Are you sure")) {
  console.log("If you say so!");
} else {
  console.log("I thought not");
}
```

And that's it for basic syntax and features. Remember, practice is the key to mastering these concepts. Don't hesitate to experiment in the console and run manual tests to understand how these features work.

## Section 4. Control Structures

Control structures guide the flow of your program. They include conditional statements (like `if`, `else if`, `else`, and `switch`) and loops (like `for`, `while`, and `do...while`).

### Conditional Statements: `if`, `else if`, `else`

In JavaScript, we use `if` to perform a block of code if a specified condition is true. We can add an `else if` to specify a new condition if the first one is false. `else` lets us catch all other cases.

Let's take a job from our jobs array and perform some actions based on its salary:

```js
let job = jobs[0]; // Let's consider the first job

let salaryRange = job.salary.split(" - "); // Split the salary range into an array
let minSalary = parseInt(salaryRange[0].replace(/\D/g, "")); // Get the minimum salary as a number

if (minSalary >= 100000) {
  console.log(job.title + " is a high-paying job!");
} else if (minSalary >= 50000) {
  console.log(job.title + " offers a decent salary.");
} else {
  console.log(job.title + " might be a lower-paying job.");
}
```

### The `switch` Statement

The `switch` statement is used when we want to perform different actions based on different conditions.

Suppose we want to sort our jobs based on the job's location. We can use a `switch` statement:

```js
switch (job.location) {
  case "Chicago, IL (Remote)":
    console.log("This job is based in Chicago.");
    break;
  case "Long Beach, CA (onsite)":
    console.log("This job is based in Long Beach.");
    break;
  case "New York, NY (Remote)":
    console.log("This job is based in New York.");
    break;
  default:
    console.log("Location not specified for this job.");
}
```

### Loops: `for`, `while`, `do...while`

Loops are used to repeatedly execute a block of code as long as a specified condition is true.

We can use a `for` loop to iterate over our jobs array and print out each job title:

```js
for (let i = 0; i < jobs.length; i++) {
  console.log(jobs[i].title);
}
```

A `while` loop executes as long as a specified condition is true. We can use it to do the same thing:

```js
let i = 0;
while (i < jobs.length) {
  console.log(jobs[i].title);
  i++;
}
```

Finally, a `do...while` loop is similar to a `while` loop, but it always executes the block at least once:

```js
i = 0;
do {
  console.log(jobs[i].title);
  i++;
} while (i < jobs.length);
```

And that's an overview of control structures in JavaScript. They are key to controlling the flow of your programs, so take your time to understand them and practice using them in your own code.

## Section 5: Functions and Scope

Functions are the basic building blocks of JavaScript programs. They allow you to wrap up chunks of code so they can be reused throughout your application. JavaScript has a few different ways to define functions, and each comes with its own characteristics.

### Functions: The building blocks of JavaScript

A function is defined with the `function` keyword, followed by a name, a list of parameters in parentheses `( )`, and the function body enclosed in curly brackets `{ }`.

Let's create a function that calculates the average salary from our jobs array.

```js
function calculateAverageSalary(jobs) {
  let totalSalary = 0;
  for (let i = 0; i < jobs.length; i++) {
    let salaryRange = jobs[i].salary.split(" - "); // Split the salary range into an array
    let minSalary = parseInt(salaryRange[0].replace(/\D/g, "")); // Get the minimum salary as a number
    let maxSalary = parseInt(salaryRange[1].replace(/\D/g, "")); // Get the maximum salary as a number
    let averageSalary = (minSalary + maxSalary) / 2; // Calculate the average salary
    totalSalary += averageSalary; // Add it to the total
  }
  return totalSalary / jobs.length; // Return the average salary across all jobs
}

console.log(`Average salary: ${calculateAverageSalary(jobs)}`);
```

### Calling all functions: How to define and call functions in JavaScript

You can call (or run) a function by using its name followed by parentheses.

In our previous example, we defined the `calculateAverageSalary()` function, then we called it using `calculateAverageSalary(jobs)` and logged the result.

### Scoping it out: Understanding scope in JavaScript

Scope is a concept that determines the accessibility (visibility) of variables, functions, and objects in some particular part of your code during runtime. In JavaScript, there are three types of scope:

- Global Scope: Defined outside of all code blocks, globally scoped variables are visible from any part of the code.
- Local Scope: Defined inside a function, locally scoped variables are only visible within that function.
- Block Scope: Variables defined with `let` or `const` are scoped to the block in which they're defined.
  - Using `let i = 0` to define the counter in a `for` loop means that the `i` variable won't actually persist beyond the loop.
  - Similarly, if we define a `let` or `const` variable inside the `{}` of a loop, the variable only exists within that block.

Let's see an example:

```js
let globalVar = "I am global!"; // This variable is globally scoped

function checkScope() {
  let localVar = "I am local!"; // This variable is locally scoped
  console.log(globalVar); // We can access the global variable here
  console.log(localVar); // And the local variable is also accessible
}

checkScope(); // Call the function
console.log(globalVar); // We can access the global variable here
console.log(localVar); // But we can't access the local variable here; it will throw an error
```

And that's an introduction to functions and scope in JavaScript! Make sure you understand these concepts before moving on because they're fundamental to your success as a JavaScript developer.

## Section 6: Arrays, Array Methods, and Callbacks

Arrays are a fundamental aspect of JavaScript, and they come with a whole slew of built-in methods. A callback is a function passed into another function as an argument to be executed later.

### Arrays and Array Methods

Let's revisit our jobs array and apply some array methods on it.

```js
console.log(jobs.length); // Logs the number of elements in the array
console.log(jobs[0]); // Logs the first job in the array
```

Array methods help us manipulate and interact with arrays. Let's see some of them in action:

```js
// The forEach() method executes a provided function once for each array element.
jobs.forEach(function (job) {
  console.log(job.title);
});

// The filter() method creates a new array with all elements that pass the test implemented by the provided function.
const remoteJobs = jobs.filter(function (job) {
  return job.location.includes("Remote");
});
console.log(remoteJobs);
```

### Callbacks

A callback function is a function that is passed to another function as an argument and is expected to execute at a given time. This allows functions to be used flexibly and can lead to cleaner, more modular code. Both `forEach` and `filter` in the previous examples use callbacks.

### Arrow Functions

Introduced in ES6, arrow functions offer a more concise syntax for writing function expressions. They are especially useful when passing a short function as an argument to another function (like callbacks!).

Here's an example of an arrow function:

```js
const double = (number) => number * 2; // Arrow function that doubles a number
console.log(double(4)); // Logs: 8
```

They also play nicely with array methods:

```js
// Using the map() method to create a new array of job titles
const jobTitles = jobs.map((job) => job.title);
console.log(jobTitles);

// Using the find() method to get the first job posted more than a week ago
const oldJob = jobs.find((job) => job.postDate.includes("week"));
console.log(oldJob);
```

Arrow functions and callbacks make JavaScript a powerful language for dealing with asynchronous events and data manipulation. They are a key part of the JavaScript toolkit, and you will use them frequently as you continue your journey into JavaScript.

Bonus Section: Asynchronous JavaScript, Higher-Order Functions, and Callbacks
--------------------------------------------------------------

This section is a little bit trickier than what came before, and is a preview of content that we will review again later on in the course.

Browsers are powerful applications that are capable of using multiple processor cores and working on multiple tasks simultaneously. For example, the browser, can be loading images and scripts from different servers on the internet while it's rendering the page and fetching data from another server.

JavaScript is as a single-threaded language that is optimized to work within this situation to ensure that we can configure pieces of code so they run when particular browser events occur. This is accomplished in JavaScript by passing functions as arguments to functions that interact with asynchronous browser APIs. Functions that accept other functions as arguments are referred to as Higher-order functions.

### Higher-Order Functions

A higher-order function is a function that can take one or more functions as arguments, return a function as its result, or both. JavaScript's first-class function capability, which means functions can be assigned to variables, passed into other functions as arguments, or returned from other functions, makes the creation of higher-order functions possible.

Let's see an example:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

function shoutGreeting(greetingFunction, name) {
  let greeting = greetingFunction(name);
  return greeting.toUpperCase();
}

console.log(shoutGreeting(greet, "John")); // Logs: HELLO, JOHN!
```

In this example, `shoutGreeting` is a higher-order function that takes another function (`greet`) as an argument.

### Asynchronous JavaScript and Callbacks

Callbacks are integral to JavaScript's asynchronous behavior. Here are a few examples of how JavaScript uses callbacks with certain built-in functions:

**setInterval and setTimeout**

These functions delay the execution of a callback function by a set amount of time.

```js
setTimeout(() => {
  console.log("This message will display after 2 seconds!");
}, 2000);

let counter = 0;
let intervalId = setInterval(() => {
  counter++;
  console.log(`This message has been logged ${counter} time(s).`);
  if (counter === 5) {
    clearInterval(intervalId);
  }
}, 1000);
```

**addEventListener**

This function attaches an event handler to an element. The event handler (a callback function) is executed whenever the specified event occurs.

```js
// In the HTML
<button id="myButton">Click me!</button>

// In the JavaScript
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

**fetch**

The Fetch API is used to make HTTP requests (sometimes referred to as AJAX requests). It takes a URL as an input and returns a Promise that resolves to the Response object representing the response to the request. Fetch uses a callback function (typically an arrow function) to handle the response.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
```

All these examples demonstrate the power of using callbacks to handle asynchronous events in JavaScript. These concepts are at the heart of JavaScript's power and flexibility, and we'll be revisiting all of this content in greater detail as you progress through the course.

## Resources:

1. [Mozilla Developer Network (MDN) - JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
2. [JavaScript Basics for Beginners](https://www.codecademy.com/learn/introduction-to-javascript)
3. [JavaScript: The World's Most Misunderstood Programming Language](https://www.crockford.com/javascript/javascript.html)
4. [JavaScript for C++ Programmers](https://www.dyn-web.com/javascript/for-cpp-programmers.php)
5. [Eloquent JavaScript - A Modern Introduction to Programming](https://eloquentjavascript.net/)
6. [JavaScript Arrays - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
7. [JavaScript Testing: Unit vs Functional vs Integration Tests](https://www.sitepoint.com/javascript-testing-unit-functional-integration/)
8. [First Class functions](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)
9. [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
