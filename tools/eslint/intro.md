# ESLint

> **ESLint** is a powerful tool that helps us to identify and fix problems in our JavaScript code. It analyzes our code for potential errors, coding style issues and helps us to find bugs before they become a problem. \
> **ESLint** runs based on a set of rules that can be customized to fit our project's coding standards. \
> By using **`--fix`** option, **ESLint** can automatically fix some of the issues it finds, saving us time and effort. \

- [ESLint](#eslint)
  - [Core Concepts](#core-concepts)
  - [Configuration File](#configuration-file)
  - [Rules](#rules)
    - [Using Rules](#using-rules)
    - [Run the CLI](#run-the-cli)
    - [Popular ESLint Rules](#popular-eslint-rules)
  - [Extend ESLint](#extend-eslint)

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

## Rules

- **_Rules_** are the build blocks of **ESLint** that define whether or not our code meet certain standards given by us in the configuration file. Each rule can be configured to be an error, a warning, or turned off completely.
- **_Rule Severity Levels:_**
  - **`"off"` or `0`:** Disables the rule.
  - **`"warn"` or `1`:** Enables the rule as a warning (does not affect exit code).
  - **`"error"` or `2`:** Enables the rule as an error (exit code will be 1 when triggered).

### Using Rules

- To use rules in **ESLint**, we have multiple options:

  - **In Configuration File:**

    - We can define rules directly in the configuration file (`eslint.config.js`, `eslint.config.mjs`, etc.) under the `rules` property.
    - Example:

      ```javascript
      export default {
        rules: {
          "no-unused-vars": "error",
          eqeqeq: "warn",
        },
      };
      ```

  - **Using Plugins:**

    - We can use third-party plugins that provide additional rules. We need to install the plugin via npm and then include it in the `plugins` section of the configuration file.
    - Example:

      ```javascript
      import reactPlugin from "eslint-plugin-react";
      export default {
        plugins: {
          react: reactPlugin,
        },
        rules: {
          "react/jsx-uses-react": "error",
          "react/jsx-uses-vars": "error",
        },
      };
      ```

  - **Inline Configuration Comments:**

    - We can also configure rules directly in our code using inline comments. This allows us to enable, disable, or change the severity of rules for specific lines or blocks of code.
    - Example:

      ```javascript
      // eslint-disable-next-line no-unused-vars
      const unusedVariable = 42;

      /* eslint-disable eqeqeq */
      if (a == b) {
        // some code
      }
      /* eslint-enable eqeqeq */
      ```

### Run the CLI

- To run **ESLint** from the command line interface (CLI), we can use the following command:

  ```bash
  npx eslint [options] [file|dir|glob...]
  ```

- **Common CLI Options:**

  | Option                        | Description                                                                     |
  | :---------------------------- | :------------------------------------------------------------------------------ |
  | **`--fix`**                   | Automatically fix some problems.                                                |
  | **`--config <file>`**         | Use a specific configuration file.                                              |
  | **`--ext <extensions>`**      | Specify file extensions to lint (e.g., `.js,.jsx`).                             |
  | **`--format <format>`**       | Specify the output format (e.g., `stylish`, `json`).                            |
  | **`--quiet`**                 | Report errors only, ignoring warnings.                                          |
  | **`--cache`**                 | Only check changed files since the last run.                                    |
  | **`--max-warnings <number>`** | Set the maximum number of warnings allowed before exiting with a non-zero code. |
  | **`--init`**                  | Create a basic configuration file.                                              |
  | **`--plugins <plugins>`**     | Specify plugins to load.                                                        |

### Popular ESLint Rules

- **Possible Errors:**

  - `no-console`: Disallow the use of `console`.
  - `no-debugger`: Disallow the use of `debugger`.
  - `no-duplicate-case`: Disallow duplicate case labels.
  - `no-empty`: Disallow empty block statements.
  - `no-extra-semi`: Disallow unnecessary semicolons.
  - `no-func-assign`: Disallow reassigning `function` declarations.
  - `no-unreachable`: Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements.

- **Best Practices:**

  - `curly`: Enforce consistent brace style for all control statements.
  - `eqeqeq`: Require the use of `===` and `!==`.
  - `no-alert`: Disallow the use of `alert`, `confirm`, and `prompt`.
  - `no-eval`: Disallow the use of `eval()`.
  - `no-floating-decimal`: Disallow leading or trailing decimal points in numeric literals.
  - `no-implied-eval`: Disallow the use of `setTimeout()`, `setInterval()`, or `execScript()` with string arguments.
  - `no-multi-spaces`: Disallow multiple spaces.
  - `no-redeclare`: Disallow declaring the same variable more then once.

- **Variables:**

  - `no-delete-var`: Disallow deleting variables.
  - `no-undef`: Disallow the use of undeclared variables unless mentioned in `/*global */` comments.
  - `no-unused-vars`: Disallow declaration of variables that are not used in the code.
  - `no-use-before-define`: Disallow the use of variables before they are defined.

- **Stylistic Issues:**

  - `camelcase`: Enforce camelCase naming convention.
  - `comma-dangle`: Require or disallow trailing commas.
  - `indent`: Enforce consistent indentation.
  - `quotes`: Enforce the consistent use of either backticks, double, or single quotes.
  - `semi`: Require or disallow semicolons instead of ASI.
  - `spaced-comment`: Enforce consistent spacing after the `//` or `/*` in a comment.

- **ECMAScript 6:**
  - `arrow-spacing`: Enforce consistent spacing before and after the arrow in arrow functions.
  - `no-const-assign`: Disallow reassigning `const` variables.
  - `no-var`: Require `let` or `const` instead of `var`.
  - `prefer-const`: Require `const` declarations for variables that are never reassigned after declared.
  - `prefer-template`: Require template literals instead of string concatenation.

## Extend ESLint

- **_ESLint_** allows us to plug third-party plugins and shareable configurations to extend its functionality, it also allows us to create our own custom rules and plugins to enforce specific coding standards for our projects.
- **_Plugins_** let's us to add new rules or configure existing rules to fit our project's needs, there are some situations where we might want to use third-party plugins (`eslint-plugin-react`, `eslint-plugin-node`, etc.) to enforce best practices for specific frameworks or libraries.
