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
    - [Caveats (Important Notes)](#caveats-important-notes)
  - [Usage Example](#usage-example)
    - [1. Perform non-blocking updates with Actions](#1-perform-non-blocking-updates-with-actions)
  - [Troubleshooting](#troubleshooting)
    - [Updating an input in a Transition doesn’t work](#updating-an-input-in-a-transition-doesnt-work)

## Reference

### `useTransition`

- Call **`useTransition`** at the top level of our component to get a tuple with two values:
  - **`isPending`**: A boolean that indicates if the transition is ongoing.
  - **`startTransition`**: A function that we can use to wrap state updates that we want to be treated as transitions, during the execution of which **`isPending`** will be `true`.

### `startTransition`

- **`startTransition`** is a function returned by **`useTransition`**, which we can use to wrap state updates that we want to be treated as transitions.
- When we call **`startTransition`** with a callback function (**know as `action`**), React will treat any state updates inside that callback as low-priority updates.
- This means that React will allow more urgent updates (like user input) to be processed first, and the updates inside **`startTransition`** will be rendered in the background.
- This helps to keep the UI responsive, especially during complex updates that might take a noticeable amount of time to render.

#### Parameter

- **`action`:**
  - A callback function that contains the **state updates** or any other operations such as **data fetching** that we want to be treated as a transition.
  - React will execute **`action`** immediately, and marks any state updates inside the **`action`** scheduled synchronously as low-priority updates.
  - Any **async** call inside the **`action`** will be included in the transition (i.e., **`isPending`** will be `true` until the async operation completes).
  - In currently require **wrapping** any **set** functions after the **await** in an additional **`startTransition`** call to ensure that the state updates are treated as part of the transition.

### Caveats (Important Notes)

- **`useTransition`** is a hook, so it must be called inside a React function component or a custom hook.
  - If you need to start a **Transition** somewhere else you can use **`startTransition`** standalone instead.
- You must have to wrap the state into additional **`startTransition`** call after the **`await`** in an async function to ensure that the state updates are treated as part of the transition.
- A state update marked as a transition can be interrupted by another state update. For example.
  - if a user types in an input field while a transition is ongoing, the input update will be processed immediately, and the transition will be paused and then resumed after the input update is rendered.

## Usage Example

### 1. Perform non-blocking updates with Actions

```tsx
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity) => {
    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Item action={updateQuantityAction} />
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}

// Item.js
import { startTransition } from "react";

export default function Item({ action }) {
  function handleChange(event) {
    // To expose an action prop, await the callback in startTransition.
    startTransition(async () => {
      await action(event.target.value);
    });
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input type="number" onChange={handleChange} defaultValue={1} min={1} />
    </div>
  );
}

// Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Total({ quantity, isPending }) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  );
}

// api.js
export async function updateQuantity(newQuantity) {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
```

- In this example, we have a checkout page where users can update the quantity of an item they want to purchase.
- A **`transition`** include multiple async operations:
  - When the user changes the quantity, we call **`startTransition`** to wrap the async operation of updating the quantity on the server.
  - Inside this async operation, we again call **`startTransition`** to wrap the state update of setting the new quantity.
- This ensures that the UI remains responsive while the quantity is being updated, and the total price is updated in the background without blocking user input.

## Troubleshooting

### Updating an input in a Transition doesn’t work

- If you try to update an input field inside a **`startTransition`** call, you might notice that the input doesn’t update as expected.

  ```tsx
  const [text, setText] = useState("");
  // ...
  function handleChange(e) {
    // ❌ Can't use Transitions for controlled input state
    startTransition(() => {
      setText(e.target.value);
    });
  }
  // ...
  return <input value={text} onChange={handleChange} />;
  ```

- This happens because Transitions are non-blocking updates means that React may delay the update to the input field in favor of more urgent updates.
