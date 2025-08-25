# **`useTransition`** in React

> **`useTransition`** is a React hook that lets you render a part of the **UI** in the background.

```tsx
const [isPending, startTransition] = useTransition();
```

- [**`useTransition`** in React](#usetransition-in-react)
  - [Reference](#reference)
    - [`useTransition`](#usetransition)
    - [`startTransition`](#starttransition)
    - [Parameter](#parameter)

## Reference

### `useTransition`

- Call **`useTransition`** at the top level of our component to get a tuple with two values:
  - **`isPending`**: A boolean that indicates if the transition is ongoing.
  - **`startTransition`**: A function that we can use to wrap state updates that we want to be treated as transitions.
-

### `startTransition`

- **`startTransition`** is a function returned by **`useTransition`**, which we can use to wrap state updates that we want to be treated as transitions.
- When we call **`startTransition`** with a callback function, React will treat any state updates inside that callback as low-priority updates.
- This means that React will allow more urgent updates (like user input) to be processed first, and the updates inside **`startTransition`** will be rendered in the background.
- This helps to keep the UI responsive, especially during complex updates that might take a noticeable amount of time to render.

### Parameter

- **`startTransition`** takes a single argument: a callback function that contains the state updates we want to treat as transitions.
- React will execute **`action`** immediately, but
