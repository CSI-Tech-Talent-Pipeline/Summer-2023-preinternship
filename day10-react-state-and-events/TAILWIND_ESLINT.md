```bash
npm install --save-dev eslint-plugin-tailwindcss
```

Add to your eslint config:

```js
module.exports = {
  root: true,
  extends: ["plugin:tailwindcss/recommended"],
};
```

Trigger a reload window using Shift + Command/Ctrl + P and selecting Developer: Reload window