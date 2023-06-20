# JS Algorithms and Unit Testing

## SWBATs

- understand the fundamental concept of algorithms and their importance in programming.
- develop and implement basic JavaScript algorithms.
- apply problem-solving strategies to design algorithms.
- understand the role of unit tests in verifying the functionality of their code.
- write basic unit tests using Jest for their JavaScript functions.
- understand the connection between the concepts covered in this lesson and state management libraries like Redux.
- interpret and analyze test results, and debug their code based on these results.

## Agenda

- Introduction to Algorithms (15 minutes)
  - Brief overview of the lesson objectives and expected outcomes.
  - Concept of algorithms: definition, importance, and examples in everyday life.
  - Explore the role of algorithms in programming and common types of algorithms.
- Introduction to Unit Testing (15 minutes)
  - Importance of unit testing for Algorithms.
  - Understanding the concept of Jest as a testing framework.
- Implementing Unit Tests using Jest (30 minutes)
  - Setting up Jest for your JavaScript project.
  - Writing basic unit tests for JavaScript functions.
  - Example: Writing test cases for a factorial function
- Review and Q&A (10 minutes)
- Assignment Preview (15 minutes)


## Introduction to Algorithms:

### What is an algorithm?

>  A set of finite rules or instructions to be followed in calculations or other problem-solving operations 

![Characteristics of an algorithm](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686183372/CSI%20TTP/Characteristics-of-an-Algorithm-1024x630_ambnrv.jpg)

**Properties of Algorithm:**
- It should terminate after a finite time.
- It should produce at least one output.
- It should take zero or more input.
- It should be deterministic (means giving the same output for the same input case).
- Every step in the algorithm must be effective i.e. every step should do some work.

### Why are algorithms important in programming?

Algorithms are important in programming because they provide a step-by-step procedure to solve a particular problem or accomplish a specific task. They form the foundation of all programs, allowing computers to process data and make decisions.

The efficiency of an algorithm directly affects the performance of the program, influencing factors such as speed and resource usage. By optimizing algorithms, programmers can ensure that their applications run as quickly and efficiently as possible. We'll discuss methods of notating the performance of algorithms in future lessons.

Algorithms also help in maintaining the program structure, making the code easier to understand, debug, and modify. Additionally, they are universal and can be implemented in any programming language, which makes them a key component in software development.

### Different Types of Algorithms

**1.** [**Brute Force Algorithm**](https://www.geeksforgeeks.org/brute-force-approach-and-its-pros-and-cons/)**:** It is the simplest approach for a problem. A brute force algorithm is the first approach that comes to mind when we see a problem.

**2.** [**Recursive Algorithm**](https://www.geeksforgeeks.org/recursion/)**:** A recursive algorithm is based on [recursion](http://www.geeksforgeeks.org/recursion/). In this case, a problem is broken into several sub-parts and the function will call itself multiple times (once for each sub-part).

**3.** [**Backtracking Algorithm**](https://www.geeksforgeeks.org/backtracking-algorithms/)**:** The backtracking algorithm basically builds the solution by searching among all possible solutions. Using this algorithm, we keep on building the solution following criteria. Whenever a solution fails we trace back to the failure point and build on the next solution and continue this process till we find the solution or all possible solutions are looked after.

**4.** [**Searching Algorithm**](https://www.geeksforgeeks.org/searching-algorithms/)**:** Searching algorithms are the ones that are used for searching elements or groups of elements from a particular data structure. They can be of different types based on their approach or the data structure in which the element should be found.

**5.** [**Sorting Algorithm**](https://www.geeksforgeeks.org/sorting-algorithms/)**:** Sorting arranges a group of data in a particular manner according to the needs of a situation. The algorithms which help in performing this function are called sorting algorithms. Generally sorting algorithms are used to sort groups of data in an increasing or decreasing manner.

**6.** [**Hashing Algorithm**](https://www.geeksforgeeks.org/hashing-set-1-introduction/)**:** Hashing algorithms work similarly to the searching algorithm. But they contain an index with a key ID. In hashing, a key is assigned to specific data.

**7.** [**Divide and Conquer Algorithm**](http://www.geeksforgeeks.org/divide-and-conquer-introduction/)**:** This algorithm breaks a problem into sub-problems, solves a single sub-problem and merges the solutions together to get the final solution (employing recursion generally). It consists of the following three steps:

-   Divide-   Solve-   Combine

**8.** [**Greedy Algorithm**](http://www.geeksforgeeks.org/greedy-algorithms/)**:** In this type of algorithm the solution is built part by part. The solution of the next part is built based on the immediate benefit of the next part. The one solution giving the most benefit will be chosen as the solution for the next part.

**9.** [**Dynamic Programming Algorithm**](https://www.geeksforgeeks.org/dynamic-programming/)**:** This algorithm uses the concept of using the already found solution to avoid repetitive calculation of the same part of the problem. It divides the problem into smaller overlapping subproblems and solves them.

**10.** [**Randomized Algorithm**](https://www.geeksforgeeks.org/randomized-algorithms/)**:** In the randomized algorithm we use a random number to improve the performance of an existing algorithm. For example, in randomized Quick Sort, we use a random number to pick the next pivot.

To learn more about the types of algorithms refer to the article about "[**Types of Algorithms**](https://www.geeksforgeeks.org/most-important-type-of-algorithms/)".


#### Resources:
  - [Introduction to Algorithms](https://www.geeksforgeeks.org/introduction-to-algorithms/)

## Unit Testing in JavaScript with Jest

In this next segment, we'll explore unit testing in JavaScript using Jest, a popular testing framework.

We'll cover the following:

1. [What is Unit Testing?](#what-is-unit-testing)
2. [Why is Unit Testing Important?](#why-is-unit-testing-important)
3. [Introduction to Jest](#introduction-to-jest)
4. [Getting Started with Jest](#getting-started-with-jest)

## What is Unit Testing?

Unit testing is a type of testing where individual units or components of a software are tested. The purpose of this level of testing is to validate that each unit of the software code performs as expected.

In JavaScript, a unit could be an entire module, but it is more commonly an individual function or procedure. The isolated part of the code shows if it behaves correctly in response to valid or invalid input data. 

> When building unit tests, we should consider the different situations that our code needs to be able to handle, and come up with a test case for each situation to ensure that it behaves correctly.

### Why is Unit Testing Important?

Unit testing is important for several reasons:

1. **Quality Assurance:** Unit tests ensure that code works as intended. They can also help to catch and reduce bugs early in the development cycle, which can save time in the long run.
2. **Documentation:** Unit tests can serve as the most reliable form of documentation, clearly demonstrating how a particular piece of code should behave and never growing stale as changes are made to the code.
3. **Design:** Writing tests can help enforce good design practices, as it encourages you to write code that is easy to test and therefore, modular and scalable.
4. **Refactoring:** With a robust suite of unit tests, you can refactor confidently, knowing that your tests will alert you if you break something.

If you feel like you don't have time to test your code, a viscious cycle can occur:
![The Viscious cycle of not having test coverage](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686240169/CSI%20TTP/unit-testing_vbp7fn.png)

It's important to write unit tests at the beginning so that you can build your program on a solid foundation that you've checked for cracks. If you add a new component to your program and it breaks something you or somebody else had already written, your tests will catch the problem before it becomes a bigger issue.

![Writing too much code and too few tests leads to more scenarios to check for errors](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686240367/CSI%20TTP/unit_testing_best_practise_uhiscf.png)

Unit tests are the most basic kind of test because they address a piece of code as a unit, in isolation from other parts of your program. In fact, if a particular function depends on some other object in the program, we will need to [mock, fake, or stub](https://preflight.com/blog/why-mocking-is-required-in-unit-testing-a-detailed-guide/) functionality that is outside the scope of the unit test. 

Later on, we'll use integration tests to ensure that the **real** parts of our program are working together as intended, but we want to isolate one of the code in its unit test by "pretending" that the other parts are behaving as they should with no issues while we test that individual unit. 

![Where Unit Testing Fits](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686240091/CSI%20TTP/Unit-Testing_aynrr7.png)
### Introduction to Jest

Jest is a delightful JavaScript testing framework originally developed by Facebook and now maintained by the OpenJS Foundation. It focuses on simplicity and support for large web applications. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js and Svelte.

Some of the main features of Jest are:

- Zero configuration necessary for most JavaScript projects
- Support for JavaScript and TypeScript through Babel
- Asynchronous testing
- Mocking and spying capabilities

### Getting Started with Jest

In this section, we'll walk through setting up Jest in a simple JavaScript project, and then write a few basic tests. 

```bash
# Initialize a new Node.js project
npm init -y

# Install Jest
npm install --save-dev jest
```

Now, let's try writing out our first basic test. Let's create a new `sum.js` file with the following content:

```js
function sum(a, b) {
  
}
module.exports = sum;
```

Next, create a file named `sum.test.js`. This will contain our actual test:

```js
const sum = require('./sum');
 
test('sum(1, 2) adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

In order to run our tests from the terminal, we can type `jest` in the directory where we've added these files and all test files will run. It is also common to add a `"test"` script to the package.json file. 

In the `package.json` file, replace the following:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

with:

```json
"scripts": {
  "test": "jest"
},
```

Now, we can run tests via `npm` using the `npm test` command. In addition, I like to use the [Jest VS Code extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) to have a nice visual interface for my test suite and more easily run individual tests or groups of tests.

When we see the test results currently, we should see the following:

```
● sum(1,2) adds 1 + 2 to equal 3

expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: undefined

  2 |
  3 | test("sum(1, 2) adds 1 + 2 to equal 3", () => {
> 4 |   expect(sum(1, 2)).toBe(3);
    |                     ^
  5 | });
  6 |

  at Object.toBe (sum.test.js:4:21)
```

It's important to always watch our tests fail before we watch them pass. It's possible to make a mistake in a test such that it always passes. But, our tests are only doing their job if they can fail when something is wrong. So, we need to make sure that we watch our test fail before we write the code that makes it pass.

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Now, we should see the following results:

```js
 PASS  ./sum.test.js
  ✓ sum(1,2) adds 1 + 2 to equal 3 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.153 s, estimated 1 s
Ran all test suites related to changed files.
```

#### Resources

- [Introduction to Unit Testing](https://www.guru99.com/unit-testing-guide.html)
- [Jest - Getting Started](https://jestjs.io/docs/getting-started)

## A test driven approach to algorithms in JavaScript:

1. [Test-Driven Development Basics](#test-driven-development-basics)
2. [Unit Testing Algorithms in JavaScript](#unit-testing-algorithms-in-javascript)

3. [Examples of Commonly Used Algorithms](#common-algorithms)
4. [Mocking in Jest](#mocking-in-jest)

### Test-Driven Development Basics

Test-Driven Development (TDD) is a software development approach in which tests are written before the actual code. It involves a repetitive cycle of: 
1. **Write a test** for the smallest possible unit of function
2. **Run the test** (which should fail since the function isn't developed yet)
3. **Write the function** and make it pass the test
4. **Refactor** the code to meet standards and **run the test** again

By writing the tests first, we ensure that our code will have good coverage and is working as expected.

For algorithms, we want to pick the simplest test cases first, so we can start from the most basic logic and build out from there.

### Unit Testing Algorithms in JavaScript

An algorithm is a sequence of steps designed to perform a specific task. In JavaScript, algorithms can be written as functions. Let's say we're asked to write a function that will take in an array of numbers and return the largest number in the array.

```js
function findMax(arr) {
  
  
}
module.exports = findMax;
```


Unit testing is a crucial part of software development. With Jest, we can easily test our algorithms. Following our `findMax` function, let's write a test for it. Our first test case should be the most basic we can think of. In this case, let's define how the algorithm should respond when given an empty array:

```js
const findMax = require('./findMax');

describe('findMax function returns the maximum number in an array'), () => {
  test("findMax([]) => null", () => {
    expect(findMax([])).toEqual(null);
  })
})
```

If we pass in an empty array, we'd like our `findMax` function to return `null`, so we write the minimum amount of code to pass that test:

```js
function findMax(arr) {
  if (arr.length === 0) {
    return null;
  }
}

module.exports = findMax;
```

Next, we can try an array with a single element:

```js
test("findMax([1]) => 1", () => {
  expect(findMax([1])).toEqual(1);
})
```

To pass this, we'll need to add a condition to our function to check for a length of 1:

```js
function findMax(arr) {
  if (arr.length === 0) {
    return null;
  } else if (arr.length === 1) {
    return arr[0];
  }
}
```

Next, we can add a test case with multiple elements:

```js
test("findMax([1, 2, 5, 4, 3] => 5", () => {
  expect(findMax([1, 2, 5, 4, 3])).toEqual(5);
})
```

For this, we'll need to keep track of the maximum number we've seen so far. We can accomplish that with the following steps:

- set the `max` value to the first element in `arr`
- loop through the elements in `arr` and `for` each one, check if it is greater than `max`
  - if it isn't, do nothing
  - if it is, store it in `max` 
- after completing the loop, return `max`

<details>
  <summary>
    Solution
  </summary>
  <hr/>

```js
function findMax(arr) {
  if (arr.length === 0) {
    return null;
  } else if (arr.length === 1) {
    return arr[0];
  }
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
```

  <hr/>

</details>
<br/>


Awesome! We've got all of the tests passing now. Let's see if we can refactor the code so it's simpler, but still passes the tests.

<details>
  <summary>
    Is there any extraneous code or duplicated logic here that we can condense?
  </summary>
  <hr/>

You may notice that we're returning `arr[0]` inside of the `else if` condition and then assigning `max` to `arr[0]` right after that and eventually returning `max`, so it's possible we don't need the `else if` condition at all! Let's see what happens if we remove it.

```js
function findMax(arr) {
  if (arr.length === 0) {
    return null;
  } 
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
```

All the tests still pass!

  <hr/>

</details>
<br/>

### Examples of Commonly Used Algorithms

Let's discuss some commonly used algorithms in JavaScript:

1.  **Sorting Algorithms:** There are various sorting algorithms available, and JavaScript also provides built-in methods like `Array.sort()`.
2.  **Searching Algorithms:** These include linear search and binary search. JavaScript provides methods like `Array.indexOf()` or `Array.find()` for searching within arrays.
3.  **Recursive Algorithms:** Recursion is a concept where a function calls itself. Recursive algorithms can be very useful for tasks such as traversing tree-like data structures. A classic example of a calculation well suited to a recursive algorithm is building a function that computes that factorial of a number `n`

We'll be working with recursion frequently throughout the algorithms focused content in the course, so let's walk through the `factorial` function here.

Let's start with the simplest possible test cases. In this case `0!` is 1. Let's create a file called `factorial.test.js` and a file called `factorial.js`

```js
const factorial = require("./factorial");

describe("factorial(n) returns the factorial of n", () => {
  test("factorial(0) => 1", () => {
    expect(factorial(0)).toEqual(1);
  })
})
```

```js
function factorial(n) {

}
module.exports = factorial;
```

This fails, then we can write the minimum code to solve for it:

```js
function factorial(n) {
  if(n === 0) { return 1 };
}
```

Okay, this passes! Now, let's try the next case:

```js
test("factorial(1) => 1", () => {
  expect(factorial(1)).toEqual(1);
})
```

Now, our new test is failing. We need to return 1 when given 1 as well. Let's change the condition.

```js
function factorial(n) {
  if(n <= 1) { return 1 };
}
```

Now, let's expand the pattern a bit so we can visualize what we need

| input | output |
|---|---|
| 0  | 1 |
| 1  | 1 |
| 2  | `2*1 = 2`  |
| 3  |` 3*2*1 = 6` |
| 4  | `4*3*2*1 = 24`  |
| 5  | `5*4*3*2*1 = 120`  |

Looking at this table, you may notice that from 2 onward, we see the same sequence of numbers repeating for every subsequent case. Each factorial calculation for `n` can be derived from an additional factor added to the factorial of `n-1`. More explicitly:

| input | output |
|---|---|
| 0  | 1 |
| 1  | 1 |
| 2  | `2*factorial(1) = 2 ` |
| 3  | `3*factorial(2) = 6` |
| 4  | `4*factorial(3) = 24` |
| 5  | `5*factorial(4) = 120` |

From this, we can see that for every `n` such that `n > 1`, the output should be `n * factorial(n-1)`.

We could make the test case for 2, 3, 4 and 5, but making the test case for `5` will actually test 2, 3 and 4 as well.

```js
test("factorial(5) => 120", () => {
  expect(factorial(5)).toEqual(120);
});
```

Now, since we've already handled the base cases of 0 and 1 with conditional logic, we can add a return afterwards for the case where n > 1:

```js
function factorial(n) {
  if (n <= 1) { return 1; }
  return n * factorial(n - 1);
}
```

Now all 3 tests pass!

### Mocking in Jest

Mocking is a powerful feature of Jest that allows us to replace functions in our code with controlled implementations, and then make assertions about how those replaced functions were used. In most cases, you're unlikely to need mocking when unit testing algorithms, but it will come in very handy when you start testing web applications!

Here's an example of how we can create a mock function in Jest:

```js
const mockFn = jest.fn();
```

We can define our mock's implementation like this:

```js
mockFn.mockImplementation(() => 42);
```

And then use it like this:

```js
test('mock function returns 42', () => {
  expect(mockFn()).toBe(42);
});
```

Mocking is a vast topic with many applications, especially when testing code that has side effects, makes network requests, or interacts with databases.

Here's a more practical example of mocking a network request so that you can test code that has a dependency on data from an external source in isolation. In practice, you'll want to have other tests that will make sure that the API interaction is working properly as well, but unit tests should be focused on one piece of code with mocked dependencies. 

This is important for multiple reasons:

1. The mock serves as documentation for how the external dependency is expected to behave when used by this unit of code.
2. It often speeds up the unit tests. The speed increase is significant where external network requests are involved, because we don't have to rely on network connections to retrieve data from an API before the tests can verify their assertions.

As an example of how this would work, let's consider a function that fetches a user profile from a hypothetical API and processes the data in some way.

Here's a simple example of an algorithm that fetches user data from an API:

```js
const axios = require('axios');

async function getUserProfile(userId) {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
}
```

This function uses the axios library to send a GET request to an API and returns the response data.

When testing this function, we don't want to make actual requests to the API. Instead, we can use Jest's mocking capabilities to simulate the API call.

Here's an example of how you might write a test for the getUserProfile function using a Jest mock:

```js
const axios = require('axios');
const getUserProfile = require('./getUserProfile');

jest.mock('axios');

test('fetches user profile from the API', async () => {
  // Setup
  const mockUser = { id: 1, name: 'John Doe' };
  axios.get.mockResolvedValue({ data: mockUser });

  // Exercise
  const user = await getUserProfile(1);

  // Verify
  expect(user).toEqual(mockUser);
  expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
});
```

In this test, we're using jest.mock to replace the axios.get function with a mock function. We then use mockResolvedValue to specify what the mock function should return when it's called. This way, we can test the getUserProfile function without making actual API requests.

> A cloer look at: `axios.get.mockResolvedValue({ data: mockUser });` The reason we're establishing the mock in this way is that the axios library's `get` method returns a promise that we can expect to resolve with a value in the format `{ data: someUser }`. If we were working with a function that didn't involve asynchronous code, we could mock the return value with `mockReturnVAlue`. See the [Jest Docs on Mock Functions](https://jestjs.io/docs/mock-functions) for more info.



## Assignment Preview

Reducer Functions and Immutable State
-------------------------------------

### Introduction to Redux and reducer functions

Redux is a predictable state container for JavaScript apps, allowing you to manage your application's state in a predictable manner. It does this through reducer functions, which are functions that determine changes to an application's state using actions. We'll be talking more about state and how it is used next week. For now, think of state as something the application is keeping tack of that can change as the user interacts with our app.

Reducers in Redux receive the current state of the application and an action that's been dispatched, and they return a new state. Here's a very basic example of a reducer:

```js
function myReducer(state = {}, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return Object.assign(state, { key: action.payload });
    default:
      return state;
  }
}
```

This function takes the current `state` and an `action` as arguments, and it returns a new state. If the action's type is 'ACTION\_TYPE', it returns a new object that combines the properties of the current state with the action's payload.

### Immutable state: Why it's important and why we avoid mutating state directly

In Redux, state is considered to be immutable. This means that we never modify it directly. Instead, whenever we want to make changes to the state, we return a new copy of the state with our changes.

Why is immutability so important? It comes with a few key benefits:

1.  **Predictability**: With immutability, we can be sure that our state won't be changed unexpectedly. This makes our code easier to understand and debug.

2.  **Performance**: Immutable data can make our application more efficient. Because we're not changing our original state, we can make optimizations based on the fact that if a state object remains the same, no changes have been made.

3.  **Versioning**: Every time we return a new state from a reducer, we're essentially creating a new version of our state. This means we can store our state's history and implement features like undo/redo.

While ther are many applications that don't use `Redux`, React applications also rely on immutable state, so it's important to recognize and pay attention to what methods will cause mutations to state and to avoid using those with React & Redux.

The example above updates the state with this line:

```js
Object.assign(state, { key: action.payload });
```

Using [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) does modify the target object (its first argument). So, in this case it does result in a violation of immutable state. There are a couple of ways to fix this issue, you can either:

```js
// make the target object a new empty object then
// merge in all properties of state
// followed by the properties that should be updated 
// based on the action
Object.assign({}, state, { key: action.payload });
// or use the spread operator instead
{ ...state, key: action.payload }
```

While both technically work, it is much more common to see this done with the spread operator.

Your assignment today is to practice writing a few reducer functions and to write tests that verify that a new state object is generated and returned and the original state object is left unchanged.

## Resources
- [Jest Docs: Getting Starter](https://jestjs.io/docs/getting-started)
- [Jest Docs: Using Matchers](https://jestjs.io/docs/using-matchers)
- [Jest Docs: Expect Reference with full matchers list](https://jestjs.io/docs/expect)
- [Jest Docs: Mock functions](https://jestjs.io/docs/mock-functions)