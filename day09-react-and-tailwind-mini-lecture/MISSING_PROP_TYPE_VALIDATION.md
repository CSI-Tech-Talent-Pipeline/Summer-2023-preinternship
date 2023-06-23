# Fixing the Missing Prop Type Validation Error in ESLint

A few of you may have seen the ESLint warning about missing prop types for the `JobCard` component. The way to fix this when using JavaScript with React is to use the `prop-types` package.

```bash
npm install prop-types
```

Then, you'll want to import proptypes into the `JobCard` component. 

```js
import { PropTypes } from 'prop-types';
```

Finally, below the component definition, you'll need to define the `propTypes` for the component. 

```js
JobCard.propTypes = {
  job: {
    image: {
      src: PropTypes.string,
      alt: PropTypes.string
    },
    company: PropTypes.string,
    title: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    postDate: PropTypes.string
  }
};
```