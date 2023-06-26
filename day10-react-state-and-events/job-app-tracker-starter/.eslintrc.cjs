module.exports = {
  env: { browser: true, es2020: true },
  plugins: ["react-refresh", "testing-library", "jest-dom", "vitest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:vitest/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  rules: {
    "react-refresh/only-export-components": "warn",
  },
};
