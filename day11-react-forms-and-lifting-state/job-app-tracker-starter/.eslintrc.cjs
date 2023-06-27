module.exports = {
  env: { browser: true, es2020: true },
  plugins: ["react-refresh", "testing-library", "jest-dom", "vitest"],
  extends: [
    "eslint:recommended",
    "react-app/jest",
    "react-app",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:vitest/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  root: true,
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  rules: {
    "react-refresh/only-export-components": "warn",
  },
};
