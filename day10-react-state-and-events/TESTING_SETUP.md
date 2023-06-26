# Mini-Lecture: Setting up Testing in React with Vite

## SWBAT

- Set up Vitest in a Vite + React project
- Understand basic testing concepts
- Write a simple test for a React component using Vitest

## Agenda

1. Introduction to Testing in React
2. Setting up Vitest in a Vite + React project
3. Setting up ESLint plugins for Vitest & React-Testing-Library
4. Writing a test for the `JobCard` component
5. Running tests and interpreting results

### Introduction to Testing in React (10 minutes)

#### Why do we test?

- To catch bugs before they reach the user
- To ensure our application behaves as expected under various conditions
- To make sure future changes don't break existing functionality (regression testing)

#### What is Vitest?

- Vitest is a test runner made by Vite's creator.
- It runs your tests in Vite dev server, meaning you write your tests just like you write your code.
- It supports native ES Modules (ESM), TypeScript, JSX and other Vite-specific features out of the box.

### Setting up Vitest in a Vite + React project

1. Install Vitest via npm

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

2. Add the following scripts to your `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

3. We also want to configure vite to work with JSDOM in the test environment inside of `defineConfig()`:

```js
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './setupTests.js'
}
```

4. Add the `setupTests.js` file and fill with these contents:

```js
import "@testing-library/jest-dom";

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

5. Now, you can run your tests with `npm test`.

### Setting up ESLint plugins

We also want to make sure that we don't get a bunch of ESLint warnings when we write our test code. To avoid this, we need to configure ESLint with plugins designed to work with vitest, react-testing-library and jest-dom.

1. Install the plugins via npm. Run the following commands in your terminal:

```bash
npm install --save-dev eslint-plugin-testing-library eslint-plugin-jest-dom eslint-plugin-vitest
```

2. Next, you'll need to update your ESLint configuration file (`.eslintrc.cjs`) to include these plugins and apply the recommended rule sets. Update your `.eslintrc.cjs` file to include the following in `plugins` and `extends`:

```javascript
module.exports = {
  // existing config properties like parserOptions, rules, etc...
  plugins: ['testing-library', 'jest-dom', 'vitest'],
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:vitest/recommended',
  ],
};
```

This is what mine looks like after the change:

```js
module.exports = {
  env: { browser: true, es2020: true },
  plugins: ["testing-library", "jest-dom", "vitest", "react-refresh"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:vitest/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  rules: {
    "react-refresh/only-export-components": "warn",
  },
};
```
This will set up ESLint to use the additional plugins and their recommended rule sets. ESLint will now lint your code based on rules from the Testing Library, Jest DOM, and Vite testing plugins.

With these plugins installed, you might need to restart your ESLint server (if you have one running in watch mode), or your code editor if it has ESLint running in the background, for the new configuration to take effect.

### Writing a Test for the `JobCard` Component

Let's write a simple test for the `JobCard` component.

1. Create a new file called `JobCard.test.jsx`.

2. Here is a simple test that checks if the component renders without crashing:

```jsx
// JobCard.test.jsx
import { test } from 'vitest'
import { render } from '@testing-library/react'
import JobCard from './JobCard'

test('renders without crashing', () => {
  const job = {
    image: { src: 'image.jpg', alt: 'job image' },
    company: 'Google',
    title: 'Software Engineer',
    salary: '100k',
    location: 'New York',
    postDate: '2022-06-20',
  };

  render(<JobCard job={job} />);
});
```

3. To run this test, use the command `npm test`.

### Running Tests and Interpreting Results

After running `npm test`, Vitest will execute all test files and provide a summary of the results.

Remember, tests are a safety net and a documentation tool. They help ensure our code behaves as expected and help others understand what our code is supposed to do.

When we run this spec, we get a warning:

```bash
Warning: Failed prop type: JobCard: prop type `job` is invalid; it must be a function, usually from the `prop-types` package, but received `object`. This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.
```

The actual issue here is that we have an object property, and we didn't specify its shape using the `PropTypes.shape` method. 

```js
JobCard.propTypes = {
  job: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
    company: PropTypes.string,
    title: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    postDate: PropTypes.string,
  }),
};
```

Check the terminal now, and we can see that the tests pass without the warning.

## Some other tests

Adding more tests can help ensure your `JobCard` component works as expected. We'll also want to import `screen` in addition to `render` from testing library.

Here are a few other tests that you might consider:

1. **Renders the correct job information**: You should test that the information passed to the component as props is being correctly rendered. For example, you might check that the job title, company, location, etc., appear in the document.

```jsx
test('renders the correct job information', () => {
  const job = {
    image: { src: 'image.jpg', alt: 'job image' },
    company: 'Google',
    title: 'Software Engineer',
    salary: '100k',
    location: 'New York',
    postDate: '2022-06-20',
  };

  render(<JobCard job={job} />);

  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  expect(screen.getByText('Google')).toBeInTheDocument();
  expect(screen.getByText('100k')).toBeInTheDocument();
  expect(screen.getByText('New York')).toBeInTheDocument();
  expect(screen.getByText('2022-06-20')).toBeInTheDocument();
});
```

2. **Renders an image with the correct src and alt**: This would check that the image element in your component has the correct `src` and `alt` properties.

```jsx
test('renders an image with the correct src and alt', () => {
  const job = {
    image: { src: 'image.jpg', alt: 'job image' },
    company: 'Google',
    title: 'Software Engineer',
    salary: '100k',
    location: 'New York',
    postDate: '2022-06-20',
  };

  render(<JobCard job={job} />);

  const image = screen.getByAltText('job image');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'image.jpg');
});
```

3. **Properly handles missing props**: You should have tests that check how your component behaves when certain props are missing or undefined. This helps ensure your component is robust and can handle unexpected data gracefully.

```jsx
test('handles missing job details gracefully', () => {
  const job = {
    image: { src: 'image.jpg', alt: 'job image' },
    company: 'Google',
    title: undefined,
    salary: '100k',
    location: 'New York',
    postDate: '2022-06-20',
  };

  render(<JobCard job={job} />);

  // Ensure no errors are thrown and the component still renders
  expect(screen.getByText('Google')).toBeInTheDocument();
  expect(screen.getByText('100k')).toBeInTheDocument();
});
```

Remember that your tests should reflect the expected usage of your components, so think about what kinds of data your `JobCard` might receive and how it should handle them.

## Fixing the ESLINT warnings

When you add these tests, you'll notice both that they pass, but that ESLint is warning that the `expect` function is not defined. This is one of the jest globals that are made accessible due to our including them in the `vite.config.js` file. We can tell eslint that we're using jest globals to remove this warning.

To fix this, let's install some eslint plugins and configure them. 



## Resources

- [Vitest Documentation](https://github.com/vitest-dev/vitest)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite Documentation](https://vitejs.dev/guide/)