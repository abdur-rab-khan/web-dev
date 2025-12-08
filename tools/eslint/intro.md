# ESLint

> **ESLint** is a powerful tool that helps us to identify and fix problems in our JavaScript code. It analyzes our code for potential errors, coding style issues and helps us to find bugs before they become a problem. \
> **ESLint** runs based on a set of rules that can be customized to fit our project's coding standards. \
> By using **`--fix`** option, **ESLint** can automatically fix some of the issues it finds, saving us time and effort. \

## Core Concepts

- **Rules:**
  - _Rules_ are certain individual checks that **ESLint** use to analyze our code whether or no if meets the standards we set. Each rule can be configured to be an error, a warning, or turned off completely.
  - Example:
    - `no-unused-vars`: This rule checks for variables that are declared but never used in the code, we can set `error` (to treat it as an error), `warn` (to treat it as a warning), or `off` (to disable the rule).
- **Plugins:**
  - _Plugins_ are packages that helps to extend the functionality of **ESLint** by adding new rules or configurations. They can be created by the community or by us to enforce specific coding standards.
  - ESLint also supports third-party plugins that can be installed via npm.
  - Example:
    - `eslint-plugin-react`: This plugin provides a set of rules specifically for React applications, helping us to enforce best practices and catch common mistakes in our React code.

## Configuration File

- Configuration files are the files where we define the rules and settings for **ESLint** to follow when analyzing our code. The configuration file can be in various formats such as `eslint.config.js`, `eslint.config.ts`, etc.

- **Configuration Objects**

  - **_name:_** Specifies the name of the configuration, which provides naming conveniences and make it easier to identify error using [**`config inspector`**](https://github.com/eslint/config-inspector)
  - **_basePath_:** Specifies the base path to apply the configuration on relative paths.
  - **_files_:** An array of glob patterns that specify which files the configuration should apply to. (e.g., `["src/**/*.js"]` to apply the configuration to all JavaScript files in the `src` directory and its subdirectories)
  - **_ignores_:** An array of glob patterns that specify which files or directories should be ignored by the configuration. (e.g., `["node_modules/**", "dist/**"]` to ignore all files in the `node_modules` and `dist` directories)
  - **_languageOptions_:** An object that specifies the language options for the configuration, such as the ECMAScript version, source type, and parser options.
  - **_plugins_:** An object that specifies the plugins to be used in the configuration. Each key is the plugin name, and the value is the plugin module or its configuration.
  - **_rules_:** An object that specifies the rules to be used in the configuration. Each key is the rule name, and the value is the rule configuration (e.g., severity level and options).
  - **_settings_:** An object that specifies shared settings for all rules in the configuration. This can be used to provide additional context or information that rules may need to function correctly.
  - **_extends_:** An array of configurations which applies the rules and settings to the current same directory or sub-directories by specifying `basePath` or `files` property.

- In `eslint.config.mjs` file, we can export multiple configuration objects based on different file patterns. For example:

  ```javascript
  import reactPlugin from "eslint-plugin-react";
  export default [
    globalIgnore("dist/**", "node_modules/**"), // Global ignore configuration
    {
      ignore: ["dist/**", "node_modules/**"], // It is global ignore for all configurations, if there is no files, basePath specified the configuration applies to entire project, or simple we can use "globalIgnore()" function
    },
    {
      name: "JavaScript Files",
      files: ["**/*.js"],
      rules: {
        "no-unused-vars": "error",
        eqeqeq: "warn",
      },
    },
    {
      name: "React Files",
      files: ["src/*", "**/*.jsx"], // Apply AND logic means only applies to files which are in src/ directory AND have .jsx extension
      plugins: {
        react: reactPlugin,
      },
      rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
      },
    },
    // Using extends with basePath
    {
      name: "TypeScript Files",
      basePath: "src/",
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        {
          name: "Shared TypeScript Rules",
          files: ["**/*.ts", "**/*.tsx"],
          rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-function-return-type": "warn",
          },
        },
        {
          name: "Shared React TypeScript Rules",
          files: ["**/*.tsx"],
          plugins: {
            react: reactPlugin,
          },
          rules: {
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
          },
        },
      ], // There are many third-party shared extended configurations available such as "eslint:recommended", "plugin:react/recommended", etc.
    },
  ];
  ```
