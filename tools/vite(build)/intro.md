# Vite

> A **vite** is a powerful build tool that provide faster, simpler development experience for modern web projects. It consists two things **"dev server"**, **"build tool" (To build code using rollup)**.

- [Vite](#vite)
  - [Why vite](#why-vite)
  - [Why Bundle for Production](#why-bundle-for-production)
  - [Features of vite](#features-of-vite)
    - [Typescript](#typescript)
    - [Type Script Configuration](#type-script-configuration)
    - [Glob Import](#glob-import)
  - [Command Line Interface](#command-line-interface)
    - [Options](#options)
    - [Build](#build)
      - [Build Options](#build-options)
  - [Using Plugins](#using-plugins)

## Why vite

- There are many similar tool exists such as **(webpack, rollup and parcel)** which works good in a production (build app) but lack on development side.
- When starting dev server, these builder build entire application before it can be served.
- These tools supports HMR (Hot Module Replacement), file edits can takes couple of seconds to reflect in the browser.
- Other build tools uses **bundler based build step** which build entire application into one or more bundle before serving it to the browser. As application becomes larger, bundling time increases and it becomes slower to start dev server.
- **_Vite_** came to solve issues, when starting dev server it divide the modules of app into two categories:

  1. **Dependencies:** are mostly third-party libraries located in `node_modules`, these are pre-bundled using esbuild.
  2. **Source code:** are files that are part of our application (e.g `.jsx`, `.vue`, `.css` etc), these files often edit frequently during development and also needed to be loaded at the same time (e.g with route-based-code-splitting).
     - These files are served over native ESM. When a file is requested, only that file is transformed and served. This allows vite to provide fast on-demand file serving and HMR.

- **Bundle based dev server:**

  ![Bundle based dev server](../../\assets\tools\vite\bundle-dev-server.png)

- **Native ESM based dev server:**

  ![Native ESM based dev server](../../\assets\tools\vite\esm-dev-server.png)

## Why Bundle for Production

- Modern browsers supports native ESM (`<script type="module">`), but they still have some limitations:

  - Many older browsers do not support ESM.
  - Native ESM does not support features like code splitting, tree shaking, and minification that are important for optimizing performance in production.
  - Loading many small ESM files can lead to increased HTTP requests, which can slow down page load times.

- We can optimize our code for production using bundler with tree-shaking, lazy-loading (code-splitting), minification and other optimization techniques.
- Vite ships with a pre-configured build command that bakes in many performance optimizations using Rollup under the hood.

## Features of vite

- Vite supports several framework or integration with other tools using **plugins**, It's highly extensible via it's **Plugin API** and **Javascript API**.
- Vite supports Hot Module Replacement (HMR) out of the box, allowing real-time updates without full page reloads.
- When file is edited, only that file invalidate and reloaded in the browser, and it also leverages HTTP caching to further speed up subsequent reloads via `304 Not Modified, Cache-Control: max-age=3153600, immutable` headers.

### Typescript

- Vite supports Typescript out of the box, no additional configuration is required.
- Vite does not perform type checking during development, it only transpiles Typescript to Javascript using esbuild for fast performance.
- If we want to enable type checking, we can use `vite-plugin-checker` plugin or for production build we can run `tsc --noEmit` command separately to check for type errors.

### Type Script Configuration

- Vite uses `tsconfig.json` file to configure Typescript options.
- Vite ignores the following `tsconfig.json` options:

  - `compilerOptions.outDir`
  - `compilerOptions.outFile`
  - `compilerOptions.rootDir`
  - `compilerOptions.composite`
  - `compilerOptions.declaration`
  - `compilerOptions.declarationMap`
  - `compilerOptions.emitDeclarationOnly`
  - `compilerOptions.target`

### Glob Import

- Vite supports glob imports which helps to import multiple files matching a pattern.
- We can use glob imports to dynamically import files based on a pattern using the following syntax:

  ```js
  const modules = import.meta.glob("./path/to/files/*.js");
  ```

  - Transformed into:

  ```js
  const modules = {
    "./path/to/files/file1.js": () => import("./path/to/files/file1.js"),
    "./path/to/files/file2.js": () => import("./path/to/files/file2.js"),
    // ...
  };
  ```

- We can iterate over the `modules` object to dynamically import each file as needed.

  ```js
  for (const path in modules) {
    modules[path]().then((mod) => {
      console.log(`Module at ${path}:`, mod);
    });
  }
  ```

- The matched files are by default lazy-loaded via dynamic `import()`. If we want to eagerly (statically) import the files, we can use the `eager: true` option:

  ```js
  const modules = import.meta.glob("./path/to/files/*.js", { eager: true });
  ```

- `import` to `default` can be use to access the default export of each module directly:

  ```js
  const modules = import.meta.glob("./path/to/files/*.js", {
    eager: true,
    import: "default",
  });
  ```

- Custom Queries: Can be use to filter files based on custom conditions:

  ```js
  const modules = import.meta.glob("./path/to/files/*.js", {
    query: "?myCustomQuery=true",
    import: "default",
    base: "/src", // Base path to resolve imports
  });
  ```

- Dynamic import are supported in vite, we can use variables to construct the import path at runtime:

  ```js
  const moduleName = "file1"; // This can be dynamic
  const module = await import(`./path/to/files/${moduleName}.js`);
  console.log(module);
  ```

- Example:

  ```js
  import Home from "./pages/Home.js";
  import About from "./pages/About.js";
  import Contact from "./pages/Contact.js";

  const routes = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/about",
      component: <About />,
    },
    {
      path: "/contact",
      component: <Contact />,
    },
  ];

  // We can automate the above using glob import
  const routeModules = import.meta.glob("./pages/*.jsx", {
    eager: true,
    import: "default",
  });

  const Routes = () => {
    return (
      <Routes>
        {Object.keys(routeModules).map((path) => {
          const routePath = path
            .replace("./pages", "")
            .replace(".jsx", "")
            .toLowerCase();

          return (
            <Route
              key={routePath}
              path={routePath === "/home" ? "/" : routePath}
              element={React.createElement(routeModules[path])}
            />
          );
        })}
      </Routes>
    );
  };
  ```

## Command Line Interface

- Vite provides a command line interface (CLI) to interact with the tool.
- The main commands are:

  - `vite`: Starts the development server.
  - `vite build`: Builds the application for production.
  - `vite preview`: Previews the production build locally.

### Options

| Option          | Description                                                          | Example                  |
| --------------- | -------------------------------------------------------------------- | ------------------------ |
| `--host`        | Specifies the hostname for the dev server.                           | `vite --host 0.0.0.0`    |
| `--port`        | Specifies the port for the dev server.                               | `vite --port 3000`       |
| `--open`        | Opens the application in the default browser.                        | `vite --open`            |
| `--force`       | Forces the optimizer to ignore the cache and re-bundle dependencies. | `vite --force`           |
| `--mode`        | Specifies the mode to use (e.g., development, production).           | `vite --mode production` |
| `--clearScreen` | Clears the console screen on each dev server restart.                | `vite --clearScreen`     |
| `--profile`     | Generates a build profile for analysis.                              | `vite build --profile`   |

### Build

- To build the application for production, we can use the following command:

  ```bash
  vite build
  ```

#### Build Options

| Option          | Description                                       | Example                          | Default  |
| --------------- | ------------------------------------------------- | -------------------------------- | -------- |
| `--outDir`      | Specifies the output directory for the build.     | `vite build --outDir dist`       | `dist`   |
| `--assetsDir`   | Specifies the directory for static assets.        | `vite build --assetsDir assets`  | `assets` |
| `--ssr [entry]` | Builds the application for server-side rendering. | `vite build --ssr src/server.js` | `false`  |
| `-w, --watch`   | Rebuilds the application on file changes.         | `vite build --watch`             | `false`  |
| `--app`         | Specifies the application type (spa, mpa, ssr).   | `vite build --app spa`           | `spa`    |
| `--sourcemap`   | Generates source maps for the build.              | `vite build --sourcemap`         | `false`  |

## Using Plugins
