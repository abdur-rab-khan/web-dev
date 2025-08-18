# Lazy Loading and Suspense in React

> Lazy loading is a powerful feature in React that allows you to load components only when they are needed, which can significantly improve the performance of your application. This is particularly useful for large applications where you want to reduce the initial load time.

- [Lazy Loading and Suspense in React](#lazy-loading-and-suspense-in-react)
  - [What is Lazy Loading?](#what-is-lazy-loading)
  - [`lazy(load)`](#lazyload)
  - [Example Usage](#example-usage)
    - [Lazy-Loading components with Suspense](#lazy-loading-components-with-suspense)

## What is Lazy Loading?

- Lazy loading is a design pattern that postpones the loading of resources until they are actually needed.
- In React, this means that you can split your code into smaller chunks and load them on demand, rather than loading everything upfront.
- This is especially useful for extremely large components or routes that are not immediately visible to the user. and it can help reduce the initial bundle size of your application.
- It can be implemented using React's built-in `React.lazy()` and `Suspense` components, and always import outside of the component.

## `lazy(load)`

- Always ensure to declare lazy-loaded `lazy(load)` react outside from our components.

  ```tsx
  import { lazy } from "react";

  const SomeComponent = lazy(() => import("..path-of-component"));
  ```

  - **Parameters**

    - **`load`:**

      1. It is a function that returns a **`Promise`**. React will not call this function until you try to render the lazy component.
      2. After React calls the function, it will wait for the Promise to resolve before rendering the component.
      3. The Promise should resolve to a module that contains a default export, which is the component you want to lazy load.
      4. React will cache the resolved module, so subsequent renders will not trigger the load function again.

    - **Returns**
      - A React component that can be rendered like any other component.
      - When the component is rendered, React will automatically call the `load` function to fetch the component.
      - While the code of the lazy component is being loaded, React will show a fallback UI (if provided using **`<Suspense>`**) until the component is ready.

## Example Usage

### Lazy-Loading components with Suspense

- Usually, we import component with the static `import` declaration:

  ```tsx
  import SomeComponent from "../Path";
  ```

- To defer the loading of a component until it's rendered for the first time.

  ```tsx
  import { lazy } from "react";

  const MarkdownPreview = lazy(() => import("MarkdownPreview.tsx"));
  ```

  - By using this pattern, the `MarkdownPreview` component will not be loaded until it is actually rendered in the UI.
  - You can specify a fallback UI that will be displayed while the component is being loaded.
