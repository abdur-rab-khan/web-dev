# Lazy Loading and Suspense in React

> Lazy loading is a powerful feature in React that allows you to load components only when they are needed, which can significantly improve the performance of your application. This is particularly useful for large applications where you want to reduce the initial load time.

- [Lazy Loading and Suspense in React](#lazy-loading-and-suspense-in-react)
  - [What is Lazy Loading?](#what-is-lazy-loading)
  - [`lazy(load)`](#lazyload)
  - [Example Usage](#example-usage)
    - [Lazy-Loading components with Suspense](#lazy-loading-components-with-suspense)
  - [`<Suspense>`](#suspense)
    - [Usages](#usages)
      - [1. Revealing content together at once](#1-revealing-content-together-at-once)
      - [2. Revealing nested content as it loads](#2-revealing-nested-content-as-it-loads)
      - [3. Showing stale content while fresh content is loading](#3-showing-stale-content-while-fresh-content-is-loading)
      - [4. Preventing already revealed content from hiding](#4-preventing-already-revealed-content-from-hiding)
      - [5. Indicating that a Transition is happening](#5-indicating-that-a-transition-is-happening)

## What is Lazy Loading?

- Lazy loading is a design pattern that postpones the loading of resources until they are actually needed.
- In React, this means that you can split your code into smaller chunks and load them on demand, rather than loading everything upfront.
- This is especially useful for extremely large components or routes that are not immediately visible to the user. and it can help reduce the initial bundle size of your application.
- It can be implemented using React's built-in `React.lazy()` and `Suspense` components, and always import outside of the component.
- This feature is done by using bundlers like Webpack, Rollup, or Parcel, which can split your code into smaller chunks that can be loaded on demand.

## `lazy(load)`

- Always ensure to declare lazy-loaded `lazy(load)` react outside from our components.

  ```tsx
  import { lazy } from "react";

  const SomeComponent = lazy(() => import("..path-of-component"));
  ```

  - **Parameters**

    - **`load`:**

      1. It is a function that returns a **`Promise`**. React will not call this function until you try to render the lazy component.
      2. During the **`Promise`** resolution, React will show a fallback UI (if provided using **`<Suspense>`**), but if not provided it will show a blank screen and wait for the component to load.
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

## `<Suspense>`

- The `<Suspense>` component is used to wrap lazy-loaded components or any asynchronous operation So that you can show a fallback UI while the component is being loaded.

  - **Reference**

    - **props**

      1. **children:** The components that you want to render lazily.
      2. **fallback:** A React element that will show while the lazy component is being loading.

    - **Caveats**
      1. Suppose component is suspended, it will not keep its state when it is re-rendered, React will restart the component from scratch.
      2. Suppose the component is displaying the content, and then it is suspended, React will be show **`fallBack UI`** again unless the update is caused by **`startTransition`** or **`useDeferredValue`**.
      3. React will clean up **`layout Effects`** when the component is suspended, **`Layout Effect`** will again run when the component is resumed.
      4. React includes under-the-hood optimization like **Streaming Server Rendering** and **Selective Hydration** that are integrated with Suspense.

- Only **Suspense-enabled** data-sources will activate the **Suspense Component:**

  1. Data fetching with suspense-enabled frameworks like **Relay** or **Next.JS**.
  2. Lazy-loaded components using **React.lazy()**.
  3. Reading the value of a cached Promise using [**`use`**](../apis/use/use.md).

- ⚡ **NOTE:** Suspense does not detect when data is fetched inside the **Effect** or **event handler**.

### Usages

#### 1. Revealing content together at once

- In this pattern, React will display **`fallBack UI** util all the code and data needed for the component is loaded.

```tsx
import { Suspense } from "react";
import Albums from "./Albums.js";

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

// Albums.js
import { use } from "react";
import { fetchData } from "./data.js";

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

- In the above example, the `Albums` component suspends while fetching the list of albums, Until the data is ready, the `Loading` component will be displayed.
- After the data is fetched, React hides the `Loading` component and displays the list of albums.

#### 2. Revealing nested content as it loads

- In this pattern, React will display the **`fallBack UI`** until all the nested components are loaded, and then it will reveal all the content at once.

```tsx
// <========================> ARTIST PAGE <========================>
import { Suspense } from "react";
import Albums from "./Albums.js";
import Biography from "./Biography.js";
import Panel from "./Panel.js";

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

// <========================> BIOGRAPHY COMPONENT <========================>
import { use } from "react";
import { fetchData } from "./data.js";

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}

// <========================> ALBUMS COMPONENT <========================>
import { use } from "react";
import { fetchData } from "./data.js";

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

// <========================> PANEL COMPONENT <========================>
export default function Panel({ children }) {
  return <section className="panel">{children}</section>;
}
```

- In React when the component is **suspends**, it will show the **fallback UI** of the closest `<Suspense>` component.
- This let's you nest multiple `<Suspense>` components to create a sequential loading experience.
- So here, Each `<Suspense>` boundary fallback will be filled in as the next level of content becomes available.

  ```tsx
  <Suspense fallback={<BigSpinner />}>
    <Biography />
    <Suspense fallback={<AlbumsGlimmer />}>
      <Panel>
        <Albums />
      </Panel>
    </Suspense>
  </Suspense>
  ```

  - In the above example, the `BigSpinner` will be shown until the `Biography` component is loaded, and then the `AlbumsGlimmer` will be shown until the `Albums` component is loaded.
  - `<Suspense>` boundaries let's you to control which part of the UI is loading and when, allowing you to create a more fluid user experience.

#### 3. Showing stale content while fresh content is loading

- In this pattern, React will suspend the component while fetching the search results.

```tsx
// <========================> APP <========================>
import { Suspense, useState } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}

// <========================> SEARCH RESULTS <========================>
import { use } from "react";
import { fetchData } from "./data.js";

export default function SearchResults({ query }) {
  if (query === "") {
    return null;
  }
  const albums = use(fetchData(`/search?q=${query}`));
  if (albums.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

- A common UI pattern is to show the previous search results while the new search is being performed. The **`useDeferredValue`** hook can be used to achieve this.

```tsx
import { Suspense, useState, useDeferredValue } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

#### 4. Preventing already revealed content from hiding

#### 5. Indicating that a Transition is happening
