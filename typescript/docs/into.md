# Introduction to **`Typescript`**

> **`Typescript`** is nothing but a superset of **`JavaScript`** that adds static typing and other features to the language. It works on only during the development phase and gets compiled into plain **`JavaScript`** before running in the browser or on a server.

- [Introduction to **`Typescript`**](#introduction-to-typescript)
  - [Installation of **`Typescript`**](#installation-of-typescript)
    - [Using **`npm`/`pnpm`**](#using-npmpnpm)
  - [Important **`Typescript Configuration`**](#important-typescript-configuration)
    - [1. `compilerOptions`](#1-compileroptions)
      - [a. `target`](#a-target)
      - [b. `module`](#b-module)
      - [c. `strict`](#c-strict)
      - [d. `outDir`](#d-outdir)
      - [e. `rootDir`](#e-rootdir)
    - [2. `watchOptions`](#2-watchoptions)

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

#### c. `strict`

- Enables all strict type-checking options. This is a good practice to catch potential errors early in the development process.

- Example:

  ```json
  {
    "compilerOptions": {
      "strict": true
    }
  }
  ```

- This configuration will enable all strict type-checking options in **`Typescript`**, helping to catch potential errors and improve code quality.

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

### 2. `watchOptions`

- Specifies options for the watch mode, which allows the **`Typescript`** compiler to automatically recompile files when they change.
- It is useful for development workflows where you want to see changes reflected immediately without manually recompiling.
- For example, you can set the `watchOptions` to ignore certain directories or files, or to specify a delay before recompiling after a change is detected.

- Example:

  ```json
  {
    "watchOptions": {
      "excludeDirectories": ["node_modules", "dist"], // Exclude specific directories from being watched
      "watchFile": "useFsEvents", // Use file system events to watch files
      "watchDirectory": "useFsEvents", // Use file system events to watch directories
      "fallbackPolling": "dynamicPriority", // Use dynamic priority polling as a fallback
      "synchronousWatchDirectory": true, // Synchronously watch directories
      "excludeFiles": ["**/*.spec.ts"],
      "pollingInterval": 1000 // Set polling interval to 1000 milliseconds (1 second )
    }
  }
  ```
