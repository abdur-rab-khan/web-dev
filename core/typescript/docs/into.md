# Introduction to **`Typescript`**

> **`Typescript`** is nothing but a superset of **`JavaScript`** that adds static typing and other features to the language. It works on only during the development phase and gets compiled into plain **`JavaScript`** before running in the browser or on a server.

- [Introduction to **`Typescript`**](#introduction-to-typescript)
  - [Installation of **`Typescript`**](#installation-of-typescript)
    - [Using **`npm`/`pnpm`**](#using-npmpnpm)
  - [Important **`Typescript Configuration`**](#important-typescript-configuration)
    - [1. `compilerOptions`](#1-compileroptions)
      - [a. `target`](#a-target)
      - [b. `module`](#b-module)
      - [c. `outDir`](#c-outdir)
      - [d. `rootDir`](#d-rootdir)
      - [e. `lib`](#e-lib)
      - [f. `moduleResolution`](#f-moduleresolution)
      - [g. `strict`](#g-strict)
      - [h. `code - quality / error detection`](#h-code---quality--error-detection)
      - [i. \***\*`esModuleInterop`**](#i-esmoduleinterop)
      - [j. `allowJs`](#j-allowjs)
      - [k. `checkJs`](#k-checkjs)
      - [l. `incremental`](#l-incremental)
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

- Specifies the target JavaScript version for the compiled output. Common values include `ES5`, `ES6`/`ES2015`, `ES2016`, `ES2017`, `ES2018`, `ES2019`, `ES2020`, `ES2021`, `ES2022`, and `ESNext`.
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

- Specifies the module system for the compiled output. Common values include `CommonJS`, `ES6`/`ES2015`, `AMD`, `System`, `UMD`, and `ESNext`.
- It is responsible for determining how modules are handled in the compiled JavaScript code.
- For example, if you are working on a Node.js project, you might want to set the module to `CommonJS`, while for a front-end project using modern JavaScript, you might choose `ES6` or `ESNext`.

- Example:

  ```json
  {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
  ```

- This configuration will compile your **`Typescript`** code to use the **`CommonJS`** module system, which is commonly used in Node.js applications.

#### c. `outDir`

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

#### d. `rootDir`

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

#### e. `lib`

- **`lib`** is an array of library that includes build-in Typescript declaration files that provide type information for various JavaScript features and APIs.
- For example, if you are targeting to build a web application and if you try to use **`DOM`** APIs like `document` or `window`, you need to include the `DOM` library in your **`lib`** array.

  - If you not include the `DOM` library, the **`Typescript`** compiler will throw an error saying that `document` or `window` is not defined.

- Example:

  ```json
  {
    "compilerOptions": {
      "lib": ["ES6", "DOM"]
    }
  }
  ```

#### f. `moduleResolution`

- Specifies how modules are resolved. Common values include `node` (for Node.js-style resolution) and `classic` (for TypeScript's original resolution strategy).

- For `node` module resolution mimics the way Node.js resolves modules, looking for `node_modules` directories and following the `package.json` "main" field.
- For front-end projects, you might use `classic` resolution, which is more straightforward and does not involve `node_modules`.

  - But today front-end projects also use `node` module resolution because of the popularity of bundlers like Webpack, Rollup, and Parcel that support Node.js-style module resolution.

- Example:

  ```json
  {
    "compilerOptions": {
      "moduleResolution": "node"
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

- **noUsedLocals**: Reports errors on unused local variables.
- **noUnusedParameters**: Reports errors on unused function parameters.
- **noImplicitReturns**: Reports errors when not all code paths in a function return a value.
- **noFallthroughCasesInSwitch**: Reports errors for fallthrough cases in switch statements.
- **noUncheckedIndexedAccess**: Adds `undefined` to the type of indexed access when accessing an array or object with an index that might be out of bounds.
- **noPropertyAccessFromIndexSignature**: Disallows accessing properties using an index signature when the property does not exist on the type.
- **exactOptionalPropertyTypes**: Treats optional properties as being exactly the type specified, rather than including `undefined`.
- **useUnknownInCatchVariables**: Uses `unknown` instead of `any` for catch clause variables.
-
- Example:

  ```json
  {
    "compilerOptions": {
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedIndexedAccess": true,
      "noPropertyAccessFromIndexSignature": true,
      "exactOptionalPropertyTypes": true,
      "useUnknownInCatchVariables": true
    }
  }
  ```

#### i. \***\*`esModuleInterop`**

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
