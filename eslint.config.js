module.exports = [
  {
    files: ["js/**/*.js"],
    ignores: ["node_modules/**", "dist/**", "**/*.min.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        chrome: "readonly",
        DOMParser: "readonly",
        console: "readonly",
        Set: "readonly",
        fetch: "readonly"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn"
    }
  }
];
