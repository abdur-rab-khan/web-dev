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
    - [Adding a Plugin](#adding-a-plugin)
    - [Ordering of Plugins](#ordering-of-plugins)
  - [Dependency Pre-Bundling](#dependency-pre-bundling)
  - [Static Asset Handling](#static-asset-handling)
    - [Explicit Inline Handling](#explicit-inline-handling)
    - [`import.meta.url`](#importmetaurl)
    - [`public` Directory](#public-directory)
  - [Building for Production](#building-for-production)
    - [Configuration for Production Build](#configuration-for-production-build)
      - [1. Public Base Path `base:""`](#1-public-base-path-base)
      - [2. Enabling Watching in Build `build.watch`](#2-enabling-watching-in-build-buildwatch)
      - [3. Changing Output Directory `outDir:""`](#3-changing-output-directory-outdir)
  - [Configuration](#configuration)
    - [Configuration for Server](#configuration-for-server)
    - [Configuration for Build](#configuration-for-build)
  - [ENV in Vite](#env-in-vite)

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

- In Vite, plugins are used to extend the functionality of the build tool and development server.
- Plugins can be used to add support for different frameworks, preprocessors, or to modify the build process.
- Vite has a rich ecosystem of plugins available, and we can also create our own custom plugins.

### Adding a Plugin

- To add a plugin, we need to install it via any packager (npm, yarn, pnpm) should be as a dev dependency.
- Then, we need to import the plugin in the `vite.config.js` file and add it to the `plugins` array in the exported configuration object.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
  });
  ```

- To find any plugin, we can visit the [Vite Plugin List](https://vitejs.dev/plugins/) official website, or search on npm registry

### Ordering of Plugins

- For some reasons like compatibility or functionality, the order of plugins in the `plugins` array may matter.
- We can adjust the order of plugins using the `enforce` property with values `pre (before vite core plugins)`, `post (after vite core plugins)`, or leave it undefined for normal order.

  ```js
  export default defineConfig({
    plugins: [
      pluginA(), // Normal order
      pluginB({ enforce: "pre" }), // Runs before core plugins
      pluginC({ enforce: "post" }), // Runs after core plugins
    ],
  });
  ```

## Dependency Pre-Bundling

- When we run `vite` command to start the dev server, Vite automatically pre-bundles dependencies using esbuild.

- **Why Pre-Bundling:**

  - The Pre-bundling does two purposes:
    1. **CommonJS and UMD compatibility:** Many npm packages use CommonJS or UMD module formats which are not natively supported by browsers. Vite pre-bundles these dependencies into ESM format to ensure compatibility.
       - Example: If we use a library like `axios` which is in CommonJS format, Vite will pre-bundle it into ESM so that it can be used in the browser without issues.
    2. **Performance:** Vite converts many ESM dependencies into a single module to improve subsequent page load speed.
       - Example: If we use `lodash` library but only use a few functions from it, Vite will pre-bundle only the used functions into a single module, reducing the number of HTTP requests and improving load time.

- **How Pre-Bundling Works:**

  - When we start the dev server, Vite scans the `node_modules` directory for dependencies used in our project.
  - It then uses esbuild to pre-bundle these dependencies into optimized ESM modules.
  - The pre-bundled modules are stored in a cache directory (e.g., `node_modules/.vite`) for faster subsequent loads.
  - During development, when a module is requested, Vite serves the pre-bundled version from the cache instead of loading the original module from `node_modules`.
  - This significantly speeds up the module loading process and improves the overall development experience.
  - It existing cache not found, Vite will crawl the source code and discover dependencies to be pre-bundled using esbuild.

- [**Monorepos and Linked Dependencies**](https://gemini.google.com/u/2/app/67ddf9e882860c13?pageId=none)

## Static Asset Handling

- Vite provides built-in support for handling static assets such as images, fonts, and stylesheets.
- Suppose we have an image file located at `src/assets/logo.png`, we can import and use it in our code as follows:

  ```js
  import logo from "./assets/logo.png";

  const img = document.createElement("img");
  img.src = logo;
  document.body.appendChild(img);
  ```

- But if image is there in `public` directory, we can reference it directly using absolute path without importing it vite will serve it as-is:

  ```js
  const img = document.createElement("img");
  img.src = "/logo.png"; // Assuming logo.png is in public directory
  document.body.appendChild(img);
  ```

- image, media, font files are detected as assets automatically but we can extend using `assetsInclude` option in `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    assetsInclude: ["**/*.myext"], // Include custom file extension as asset
  });
  ```

### Explicit Inline Handling

- **`inline`:** It is used to inline small assets as base64-encoded data URLs directly in the code.

  ```js
  import smallImage from "./assets/small-image.png?inline";

  const img = document.createElement("img");
  img.src = smallImage; // Inlined as base64 data URL
  document.body.appendChild(img);
  ```

- **`no-inline`:** It is used to prevent inlining of assets, even if they are small enough to be inlined by default.

  ```js
  import largeImage from "./assets/large-image.png?no-inline";

  const img = document.createElement("img");
  img.src = largeImage; // Loaded as separate file
  document.body.appendChild(img);
  ```

### `import.meta.url`

- Vite supports the use of `import.meta.url` to get the URL of the current module.
- This can be useful for dynamically loading assets relative to the module's location.

  ```js
  const imageUrl = new URL("./assets/image.png", import.meta.url).href;

  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img);
  ```

### `public` Directory

- Vite uses a special directory named `public` to serve static assets that should not be processed by Vite.
- It is commonly used to store files like `favicon.ico`, `robots.txt`, and other static files such as images or fonts that we want to be served as-is.
- We can change the default `public` directory by configuring the `publicDir` option in the `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    publicDir: "static", // Change public directory to 'static'
  });
  ```

## Building for Production

- `vite build` command is used when it's time to build our application for production and serve it to users, vite uses `<root>/index.html` as entry point by default.
- Vite uses Rollup under the hood, In upcoming version of vite it finally use **`Rolldown`** (Rust implementation of Rollup) for production build for better performance.

### Configuration for Production Build

#### 1. Public Base Path `base:""`

- By default, Vite assumes that the application will be served from the root path (`/`).
- If our application is going to be served from a different base path (e.g., `/my-app/`), we need to configure the `base` option in the `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    base: "/my-app/", // Set base path for production build
  });
  ```

- This ensures that all asset URLs and links in the built application are correctly prefixed with the specified base path.

  ```html
  <link rel="stylesheet" href="/my-app/assets/style.css" />
  <script type="module" src="/my-app/assets/main.js"></script>
  ```

#### 2. Enabling Watching in Build `build.watch`

- By default, the production build process is a one-time operation. But we can enable watch mode that rebuilds the application whenever source files change using `build.watch` option in `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      watch: {}, // Enable watch mode for production build
    },
  });
  ```

#### 3. Changing Output Directory `outDir:""`

- By default, Vite outputs the built files to the `dist` directory.
- We can change the output directory by configuring the `outDir` option in the `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      outDir: "build", // Change output directory to 'build'
    },
  });
  ```

## Configuration

### Configuration for Server

- Vite, provides flexible way to integrate our application with backend server. We can configure in `vite.config.js`.
- Vite provides some configuration under `server` option to configure backend integration such as `proxy`, `cors`, `port`, `host` etc.
- Following are the commonly used options for backend integration:

- **`proxy`** Proxy is similar to reverse proxy, that forwards web requests from Vite server to configured backend server.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000", // Backend server URL
          changeOrigin: true, // Change the origin of the host header to the target URL
          rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
        },
      },
    },
  });
  ```

  - Any request starting with `/api` will be forwarded to `http://localhost:3000` backend server.

- **`host`** Specifies which IP address the dev server should listen on, by default it listens only on current machine (`localhost`).

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      host: "0.0.0.0", // or true -> To Listen on all network interfaces
    },
  });
  ```

- **`allowedHosts`** Specifies a list of hosts that are allowed to access the dev server.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      allowedHosts: ["example.com", "subdomain.example.com"], // Allow only these hosts
    },
  });
  ```

  - Using this option we can restrict access to specific hosts, by default only `localhost` is allowed.
  - We can add more hosts using environment variable `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.

- **`cors`** Enables Cross-Origin Resource Sharing (CORS) for the dev server.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";
  export default defineConfig({
    server: {
      cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
      },
    },
  });
  ```

- **`port`** Specifies the port number for the dev server to listen on (default is `5173`).

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      port: 4000, // Set dev server port to 4000
    },
  });
  ```

- **`watch`** Configures file watching options for the dev server.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      watch: {
        ignored: ["**/node_modules/**", "**/dist/**"], // Ignore these directories
      },
    },
  });
  ```

- **`https`** Enables HTTPS for the dev server.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";
  import fs from "fs";

  export default defineConfig({
    server: {
      https: {
        key: fs.readFileSync("./certs/server.key"), // Path to SSL key
        cert: fs.readFileSync("./certs/server.crt"), // Path to SSL certificate
      },
    },
  });
  ```

- **`warmup`** Pre-bundles dependencies when the dev server starts to improve performance.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    server: {
      warmup: {
        clientFiles: ["src/main.js"], // Pre-bundle dependencies used in main.js
      },
    },
  });
  ```

### Configuration for Build

- `outDir` - Specifies the output directory for the build files, by default it is `dist`.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      outDir: "build", // Change output directory to 'build'
    },
  });
  ```

- `assetsDir` - Specifies the directory for static assets within the output directory, by default it is `assets`.

  - By specifying the assets directory, it helps to organize the build output better.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      assetsDir: "static", // Change assets directory to 'static'
    },
  });
  ```

- `assetsInlineLimit` - Specifies the maximum size (in bytes) for inlining assets as base64 data URLs. Default is `4096` (4KB).

  - Assets smaller than this limit will be inlined, while larger assets will be emitted as separate files.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      assetsInlineLimit: 8192, // Increase inline limit to 8KB
    },
  });
  ```

- `cssCodeSplit` - Enables or disables CSS code splitting. Default is `true`.

  - When enabled, Vite will extract CSS into separate files for each JavaScript chunk.
  - When disabled, all CSS will be bundled into a single file.

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    build: {
      cssCodeSplit: false, // Disable CSS code splitting
    },
  });
  ```

## ENV in Vite

- In Vite, we can use environment variables but differently than traditional `process.env`.
  - Vite uses `import.meta.env` to access environment variables.
  - Vite provides some built-in environment variables that we can use in our code:
    - `import.meta.env.MODE`: The current mode (e.g., development, production).
    - `import.meta.env.BASE_URL`: The base URL of the application.
    - `import.meta.env.PROD`: A boolean indicating if the current mode is production.
    - `import.meta.env.DEV`: A boolean indicating if the current mode is development.
- We can define custom environment variables by creating `.env` files in the root of our project:

  - `.env`: Loaded in all modes.
  - `.env.local`: Loaded in all modes, ignored by git.
  - `.env.[mode]`: Loaded only in the specified mode (e.g., `.env.production`).
  - `.env.[mode].local`: Loaded only in the specified mode, ignored by git.
  - Example `.env` file:

    ```env
    VITE_API_URL=https://api.example.com
    VITE_APP_TITLE=My Vite App
    ```

  - Based on mode, Vite will load the appropriate `.env` files and merge the variables into `import.meta.env`.
  - By default, `vite build` used `production` mode we can change mode using `--mode` flag:

    ```bash
    vite build --mode development
    ```

- To access these custom environment variables in our code, we need to prefix them with `VITE_`:

  ```js
  console.log(import.meta.env.VITE_API_URL); // Outputs: https://api.example.com
  console.log(import.meta.env.VITE_APP_TITLE); // Outputs: My Vite App
  ```

- We can change prefix using `envPrefix` option in `vite.config.js` file:

  ```js
  // vite.config.js
  import { defineConfig } from "vite";

  export default defineConfig({
    envPrefix: "MYAPP_", // Change prefix to 'MYAPP_'
  });
  ```
