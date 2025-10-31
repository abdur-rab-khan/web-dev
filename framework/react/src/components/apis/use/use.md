# Use in React

> **`use`** is a React API that let's you read the resource value from **`Promise`** or **`Context`**, In case of **`Promise`** it will throw the promise if it's not resolved yet, so React can catch it and wait for it to resolve before rendering the component.

- [Use in React](#use-in-react)
  - [Simple Example](#simple-example)
  - [Parameters](#parameters)
  - [Caveats (Important Notes)](#caveats-important-notes)
  - [Usage](#usage)
    - [Reading context value](#reading-context-value)
    - [Streaming data from the server to the client](#streaming-data-from-the-server-to-the-client)
    - [Dealing with rejected Promises](#dealing-with-rejected-promises)
      - [Displaying an error to users with an error boundary](#displaying-an-error-to-users-with-an-error-boundary)
      - [Providing an alternative value with Promise.catch](#providing-an-alternative-value-with-promisecatch)

## Simple Example

```tsx
import React, { use } from "react";

const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });

const resource = fetchData();

const MyComponent = () => {
  const data = use(resource as Promise<string>); // Using use to read the promise, it will throw the promise if not resolved yet.`

  return <div>{data}</div>;
};
```

- Unlike `useState` or `useEffect`, `use` can be called **`conditionally`** or in the **`loop`**, because it doesn't rely on the order of hooks.
- **`use`** API integrates seamlessly with React's **`Suspense`** and **`ErrorBoundary`**, allowing you to display a fallback UI while waiting for the promise to resolve, or to catch errors if the promise is rejected.

## Parameters

- **`resource`:** This can be either a **`Promise`** or a **`Context`** object. If it's a promise, `use` will throw the promise if it's not resolved yet. If it's a context, it will return the current context value, similar to `useContext`.
- **`return`:** The resolved value of the promise or the current context value.

## Caveats (Important Notes)

- **use** API must be use within a **`Components`** or **`Hook`**.
- In **`Server Component`** prefer to use **`async/await`** over **`use`**.
  - **`async/await`** pick-up re-rendering the component from the point where await was **invoked**.
  - **`use`** pick-up re-rendering the component from the point where the data is resolved.

## Usage

### Reading context value

- When passing a **`context`** to **`use`** it will work the same as **`useContext`**. **`useContext`** is use on the top level of the component.
- **`use`** can be called inside **`loops`** or **`conditional statements`**.
- **`use`** is preferred over **`useContext`** because it is more flexible than **`useContext`**.

```tsx
import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ...

```

- **`use`** will return the context value for the nearest matching **`Provider`** above it in the tree.
- To pass the **`context`** to the button component, you need to wrap the button component with the **`Provider`**.
- It doesn't matter where you call **`use`** in the component, it will always return the context value for the nearest matching **`Provider`** above it in the tree.

```tsx
function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

- Unlike **`useContext`**, **`use`** can be called inside the **`loop`** or **`conditional statements`**.

```tsx
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```

```tsx
import { createContext, use } from "react";

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = "button-" + theme;
    return <button className={className}>{children}</button>;
  }
  return false;
}
```

### Streaming data from the server to the client

- Data can be streamed from the **server** to the **client** by passing a Promise as a **`props`** from **`Server Component`** to **`Client Component`**.

  ```tsx
  import { fetchMessage } from "./lib.js";
  import { Message } from "./message.js";

  export default function App() {
    const messagePromise = fetchMessage();
    return (
      <Suspense fallback={<p>waiting for message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    );
  }
  ```

  - In the above example, the **`App`** component is a **`Server Component`** that fetches a message from the server and passes the promise to the **`Message`** component as a prop.
  - The **`Message`** component is a **`Client Component`** that uses the **`use`** API to read the promise and render the message when it's resolved. And show a fallback UI while waiting for the promise to resolve.

    ```tsx
    "use client";

    import { use, Suspense } from "react";

    function Message({ messagePromise }) {
      const messageContent = use(messagePromise);
      return <p>Here is the message: {messageContent}</p>;
    }

    export function MessageContainer({ messagePromise }) {
      return (
        <Suspense fallback={<p>⌛Downloading message...</p>}>
          <Message messagePromise={messagePromise} />
        </Suspense>
      );
    }
    ```

    - Because we use **`Suspense`** in the **`App`** component, React will wait for the promise to resolve before rendering the **`Message`** component.

### Dealing with rejected Promises

- In some cases, the promise may be rejected, To handle rejected promise, we have two options:

  1. Use **`try/catch`** block inside the component to catch the error and render an error message.
  2. Use **`ErrorBoundary`** component to catch the error and render an error message.

#### Displaying an error to users with an error boundary

- If we want to display an error message to users when the promise is rejected, we can wrap the component with an **`ErrorBoundary`** component.
- If the promise passed to **`use`** is rejected, it will throw the error, and the **`ErrorBoundary`** component will catch the error and render the fallback UI.

  ```tsx
  "use client";

  import { use, Suspense } from "react";
  import { ErrorBoundary } from "react-error-boundary";

  export function MessageContainer({ messagePromise }) {
    return (
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Suspense fallback={<p>⌛Downloading message...</p>}>
          <Message messagePromise={messagePromise} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  function Message({ messagePromise }) {
    const content = use(messagePromise);
    return <p>Here is the message: {content}</p>;
  }
  ```

#### Providing an alternative value with Promise.catch

- If we want to provide an alternative value when the promise is rejected, we can use the **`Promise.catch`** method to catch the error and return an alternative value.
- This way, the promise passed to **`use`** will never be rejected, and we don't need to use an **`ErrorBoundary`** component.

  ```tsx
  "use client";

  import { use, Suspense } from "react";

  export function MessageContainer({ messagePromise }) {
    // Using Promise.catch to provide an alternative value when the promise is rejected
    const safeMessagePromise = messagePromise.catch(() => "Default message");

    return (
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={safeMessagePromise} />
      </Suspense>
    );
  }

  function Message({ messagePromise }) {
    const content = use(messagePromise);
    return <p>Here is the message: {content}</p>;
  }
  ```

- In the above example, if the **`messagePromise`** is rejected, it will return the string **`"Default message"`** instead of throwing an error.

---

- If you are calling **`use`** outside a React component or hook, move the **`use`** call inside a React component or hook.

  ```tsx
  function MessageComponent({messagePromise}) {
  function download() {
    // ❌ the function calling `use` is not a Component or Hook
    const message = use(messagePromise);
    // ...
  ```

- Instead, call **`use`** outside any component closures, where the function that calls **`use`** is a Component or Hook.

  ```tsx
  function MessageComponent({messagePromise}) {
  // ✅ `use` is being called from a component.
  const message = use(messagePromise);
  // ...
  ```
