# Introduction to **`Typescript`**

> **`Typescript`** is nothing but a superset of **`JavaScript`** that adds static typing and other features to the language. It works on only during the development phase and gets compiled into plain **`JavaScript`** before running in the browser or on a server.

- [Introduction to **`Typescript`**](#introduction-to-typescript)
  - [Installation of **`Typescript`**](#installation-of-typescript)
    - [Using **`npm`/`pnpm`**](#using-npmpnpm)
  - [Important **`Typescript Configuration`**](#important-typescript-configuration)
    - [1. `compilerOptions`](#1-compileroptions)
      - [a. `target`](#a-target)
      - [b. `module`](#b-module)
      - [c. `moduleResolution`](#c-moduleresolution)
      - [d. `outDir`](#d-outdir)
      - [e. `rootDir`](#e-rootdir)
      - [f. `lib`](#f-lib)
      - [g. `strict`](#g-strict)
      - [h. `code - quality / error detection`](#h-code---quality--error-detection)
      - [i. **`esModuleInterop`**](#i-esmoduleinterop)
      - [j. `allowJs`](#j-allowjs)
      - [k. `checkJs`](#k-checkjs)
      - [l. `incremental`](#l-incremental)
      - [m. `paths`](#m-paths)
    - [2. `watchOptions`](#2-watchoptions)
    - [3. `compileOnSave`](#3-compileonsave)
    - [4. `include/exclude`](#4-includeexclude)

## Installation of **`Typescript`**

### Using **`npm`/`pnpm`**

- To install **`Typescript`** globally on your machine, you can use the following command:

  ```bash
  npm install -g typescript # using npm
  pnpm add -g typescript # using pnpm
  ```

- After installation, you can verify the installation by checking the version of **`Typescript`**:

  ```bash
    tsc --version
  ```

- You can also install **`Typescript`** locally in your project by running:

  ```bash
    npm install --save-dev typescript
  ```

- To initialize a new **`Typescript`** project and create a `tsconfig.json` file, you can use the following command:

  ```bash
    tsc --init
  ```

- This will create a `tsconfig.json` file in your project directory, which you can customize according to your project's needs.

  - `tsconfig.json` file is used to configure the **`Typescript`** compiler options, such as target version, module system, and other settings.

- To compile a specific **`Typescript`** file, you can provide the file name as an argument:

  ```bash
    tsc filename.ts
  ```

- To compile your **`Typescript`** files, you can use the following command:

  ```bash
    tsc
  ```

  - Direct **`tsc`** command will look for `tsconfig.json` file in the current directory and compile all the **`.ts`** files according to the configuration specified in the `tsconfig.json` file.

  - Following ones are some useful commands that you can use with **`tsc`**:

    - `tsc -w` or `tsc --watch`: This command will watch for changes in your **`.ts`** files and automatically recompile them whenever you save a file. This is useful during development as it provides immediate feedback on type errors and other issues.

    - `tsc -p <path-to-tsconfig>` or `tsc --project <path-to-tsconfig>`: This command allows you to specify a custom path to your `tsconfig.json` file if it's not located in the current directory.

    - `tsc --outDir <directory>`: This command allows you to specify a custom output directory for the compiled **`.js`** files. If not specified, the compiled files will be placed in the same directory as the source **`.ts`** files.

    - `tsc --init`: This command initializes a new **`Typescript`** project by creating a `tsconfig.json` file in the current directory.

    - `tsc --version`: This command displays the version of the **`Typescript`** compiler installed on your machine.

## Important **`Typescript Configuration`**

- Here are some important **`Typescript`** configuration options that you might find useful in your `tsconfig.json` file:

### 1. `compilerOptions`

#### a. `target`

- It specifies the the version of **`JavaScript`** that the **`Typescript`** code will be converted to during compilation.
- All options comes with different features and compatibility levels, like older versions may not support newer features like `async/await`, `modules`, etc.
- Common values includes:

  1. `ES6/ES2015`: Introduced **classes**, **modules**, **arrow functions**, **template literals**, and more.
  2. `ES7/ES2016`: Introduced the **exponentiation operator** (`**`) and **Array.prototype.includes**.
  3. `ES8/ES2017`: Introduced **async/await**, **Object.values()**, **Object.entries()**, and more.
  4. `ES9/ES2018`: Introduced **asynchronous iteration**, **Promise.finally()**, and more.
  5. `ES10/ES2019`: Introduced **Array.prototype.flat()**, **Object.fromEntries()**, and more.
  6. `ES11/ES2020`: Introduced **optional chaining** (`?.`), **nullish coalescing** (`??`), and more.
  7. `ES12/ES2021`: Introduced **String.prototype.replaceAll()**, **Promise.any()**, and more.
  8. `ES13/ES2022`: Introduced **class static blocks**, **top-level await**, and more.
  9. `ES14/ES2023`: Introduced **Array findLast/findLastIndex**, **Hashbang grammar**, and more.
  10. `ESNext`: Refers to the latest features that are still in proposal stage or not yet finalized.

- Based on your project requirements and the environment where your code will run, you can choose the appropriate target version.

- Example:

  ```json
  {
    "compilerOptions": {
      "target": "ES6"
    }
  }
  ```

- This configuration will compile your **`Typescript`** code to be compatible with **`ES6`** features.

#### b. `module`

- It decides how **`import/export`** statements are handled in the compiled **`JavaScript`** code.
- Common values includes:

  1. `CommonJS`: When wants to use `require` and `module.exports` syntax, commonly used in Node.js applications.
  2. `ES6/ES2015`: When wants to use native **`import/export`** syntax, commonly used in modern browsers and front-end frameworks.
  3. `AMD`: When wants to use **Asynchronous Module Definition** format, commonly used in browser-based applications with module loaders like RequireJS.
  4. `UMD`: When wants to create a module that works in both **`CommonJS`** and **`AMD`** environments.
  5. `System`: When wants to use the **SystemJS** module loader.
  6. `ESNext`: When wants to use the latest module features that are still in proposal stage or not yet finalized, such as there we can use `import/export` or other modern module features.

- Example:

  ```json
  {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
  ```

- This configuration will compile your **`Typescript`** code to use the **`CommonJS`** module system, like when javascript is build it going to use `require` and `module.exports` syntax.

#### c. `moduleResolution`

- It specifies how moudles are resolved with in the typescript files, based on the module system you are using.
- Common values includes:

  1. `node`: When using **`Node.js`** style module resolution, which looks for `node_modules` directories and follows the `package.json` "main" field.
  2. `classic`: When using **`Typescript`**'s original resolution strategy, which is more straightforward and does not involve `node_modules`.
  3. `bundler`: When using module resolution strategy optimized for bundlers like Webpack, Rollup, or Parcel.
  4. `nodenext`: When using **`Node.js`** style module resolution with support for **`ES Modules`** and **`CommonJS`** interop.

#### d. `outDir`

- Specifies the output directory for the compiled JavaScript files. This is useful for keeping your source **`.ts`** files separate from the compiled **`.js`** files.

- Example:

  ```json
  {
    "compilerOptions": {
      "outDir": "./dist"
    }
  }
  ```

- This configuration will compile your **`Typescript`** files and place the resulting **`.js`** files in the `dist` directory.

#### e. `rootDir`

- Specifies the root directory of your **`Typescript`** source files. This helps to maintain the directory structure in the output directory.

- Example:

  ```json
  {
    "compilerOptions": {
      "rootDir": "./src"
    }
  }
  ```

- This configuration indicates that the root directory for your **`Typescript`** source files is `src`. When you compile your project, the output will maintain the same directory structure within the specified `outDir`.

#### f. `lib`

- **Lib** option is a array of library files to be included in the compilation. These library files provide type definitions for various JavaScript features and APIs.
- Suppose we are working on a web application that needs to interact with the DOM and use modern JavaScript features. In this case, we might want to include the following libraries:

  1. `ES6/ES2015`: Provides type definitions for modern JavaScript features like Promises, arrow functions, classes, etc.
  2. `DOM`: Provides type definitions for the Document Object Model (DOM) APIs, allowing interaction with HTML elements, events, etc.
  3. `ESNext`: Provides type definitions for the latest JavaScript features that are still in proposal stage or not yet finalized.

- Example:

  ```json
  {
    "compilerOptions": {
      "lib": ["ES6", "DOM"]
    }
  }
  ```

#### g. `strict`

- Enables all strict type-checking options. This is a good practice to catch potential errors early in the development process.
- These are the options that are enabled when you set `strict` to `true`:

  - `noImplicitAny`: Raises an error on expressions and declarations with an implied `any` type.
  - `strictNullChecks`: Ensures that `null` and `undefined` are only assignable to themselves and `any`.
  - `strictFunctionTypes`: Ensures function type compatibility is checked more strictly.
  - `strictBindCallApply`: Checks the arguments passed to `bind`, `call`, and `apply` methods.
  - `strictPropertyInitialization`: Ensures that class properties are initialized in the constructor.
  - `noImplicitThis`: Raises an error when the type of `this` is implicitly set to `any`.
  - `alwaysStrict`: Parses files in strict mode and emits `"use strict"` for each source file.

- You can also enable or disable these options individually if you prefer more granular control over the strictness of your type-checking.

- Example:

  ```json
  {
    "compilerOptions": {
      "strict": true
    }
  }
  ```

- This configuration will enable all strict type-checking options in **`Typescript`**, helping to catch potential errors and improve code quality.

#### h. `code - quality / error detection`

| Option Name                  | Description                                                                   | Example                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `noImplicitAny`              | Raises an error on expressions and declarations with an implied `any` type.   | `let x:any; // Error if noImplicitAny is true`                              |
| `noUnusedLocals`             | Raises an error when a local variable is declared but not used.               | `let x = 10; // Error if noUnusedLocals is true`                            |
| `noUnusedParameters`         | Raises an error when a function parameter is declared but not used.           | `function foo(x) {} // Error if noUnusedParameters is true`                 |
| `noFallthroughCasesInSwitch` | Raises an error when a switch statement falls through a case without a break. | `switch(x) { case 1: // Error if noFallthroughCasesInSwitch is true }`      |
| `noImplicitReturns`          | Raises an error when not all code paths in a function return a value.         | `function foo() { if (x) return 1; } // Error if noImplicitReturns is true` |

#### i. **`esModuleInterop`**

- Enables interoperability between CommonJS and ES Modules. This allows you to use `import` statements with CommonJS modules that use `module.exports`.
- For example, if you are using a CommonJS module like `lodash`, you can import it using the following syntax when `esModuleInterop` is enabled:

  ```typescript
  import _ from "lodash";
  ```

- Example:

  ```json
  {
    "compilerOptions": {
      "esModuleInterop": true
    }
  }
  ```

#### j. `allowJs`

- Allows **`Javascript`** files to be compiled along with **`Typescript`** files. This is useful for gradually migrating a **`Javascript`** codebase to **`Typescript`**.

- Example:

  ```json
  {
    "compilerOptions": {
      "allowJs": true
    }
  }
  ```

#### k. `checkJs`

- When set to `true`, this option enables type checking for **`JavaScript`** files. This is useful if you want to catch potential type-related errors in your **`JavaScript`** code without converting it to **`TypeScript`**.

- Example:

  ```json
  {
    "compilerOptions": {
      "checkJs": true
    }
  }
  ```

#### l. `incremental`

- When set to `true`, this option enables incremental compilation, which can significantly speed up the compilation process by only recompiling files that have changed since the last compilation.
- Example:

  ```json
  {
    "compilerOptions": {
      "incremental": true
    }
  }
  ```

#### m. `paths`

- The `paths` option in `tsconfig.json` is used to define module path aliases which helps in simplifying import statements and managing module resolution in a more organized way.
- It allows you to create custom paths for your modules, making it easier to reference them without needing to use long relative paths.
- Example:

  ```json
  {
    "compilerOptions": {
      "baseUrl": "./src",
      "paths": {
        "@components/*": ["components/*"],
        "@utils/*": ["utils/*"]
      }
    }
  }
  ```

### 2. `watchOptions`

- **`watchOptions`** in **`Typescript`** are used to **oppose** the behavior of **file watcher** in operating systems like Windows, macOS, and Linux. These options help to optimize the performance of the **`Typescript`** compiler when it is running in watch mode.
  - **file watcher** is a mechanism provided by the kernel of the operating system to monitor changes in the files or directories in real time.
  - Instead of constantly polling, we can set up watchers so that our program or script get notified whenever a file event occurs.
- Specifies options for the watch mode, which allows the **`Typescript`** compiler to automatically recompile files when they change.
- It is useful for development workflows where you want to see changes reflected immediately without manually recompiling.
- **💀 NOTE:** Re-compilation only work if file is includes into **`tsconfig.json`** `include:["src/**/*"]`
- The `watchOptions` can include settings such as:

  - `excludeDirectories`: An array of directory names to exclude from being watched (e.g., `node_modules`, `dist`).
  - `watchFile`: Specifies the strategy for watching files. Options include `fixedPollingInterval`, `priorityPollingInterval`, `dynamicPriorityPolling`, and `useFsEvents`.
  - `watchDirectory`: Specifies the strategy for watching directories. Options include `fixedPollingInterval`, `priorityPollingInterval`, `dynamicPriorityPolling`, and `useFsEvents`.
  - `fallbackPolling`: Specifies the polling strategy to use when file system events are not available. Options include `fixedInterval`, `priorityInterval`, and `dynamicPriority`.
  - `synchronousWatchDirectory`: A boolean value that, when set to true, makes directory watching synchronous.
  - `excludeFiles`: An array of file patterns to exclude from being watched.
  - `pollingInterval`: Specifies the interval (in milliseconds) at which to poll for changes when using a polling strategy.

- Example:

  ```json
  {
    "watchOptions": {
      "excludeDirectories": ["node_modules", "dist"],
      "watchFile": "useFsEvents",
      "watchDirectory": "useFsEvents",
      "fallbackPolling": "dynamicPriority",
      "synchronousWatchDirectory": false,
      "excludeFiles": ["**/*.spec.ts"],
      "pollingInterval": 1000
    }
  }
  ```

### 3. `compileOnSave`

- When set to `true`, this option allows the **`Typescript`** compiler to automatically compile the current file when it is saved in an editor that supports this feature (like Visual Studio Code).
- This is particularly useful during development, as it provides immediate feedback on type errors and other issues without needing to run the compiler manually.

- Example:

  ```json
  {
    "compileOnSave": true
  }
  ```

### 4. `include/exclude`

- The `include` and `exclude` options in `tsconfig.json` are used to specify which files and directories should be included or excluded from the compilation process.
  - `include`: An array of glob patterns that specify the files to be included in the compilation. If not specified, all files in the directory and subdirectories are included by default.
  - `exclude`: An array of glob patterns that specify the files and directories to be excluded from the compilation. By default, `node_modules`, `bower_components`, `jspm_packages`, and files specified in the `outDir` are excluded.
- Example:

  ```json
  {
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
  }
  ```
