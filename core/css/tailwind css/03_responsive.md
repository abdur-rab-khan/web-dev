# Responsive in Tailwind CSS

> Tailwind CSS provides easier and more intuitive ways to create responsive designs using its built-in responsive utility variants.

## Overview

- Every tailwind utility class can be applied conditionally based on the screen size using responsive variants.
- First, make sure you've added the viewport meta tag to your HTML document's `<head>` section:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Add utility classes at a certain breakpoint, all we need to do is prefix the utility class with the breakpoint name followed by a colon (`:`).

```html
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

## Default Breakpoints

| Breakpoint | Min-Width      | CSS                                |
| ---------- | -------------- | ---------------------------------- |
| `sm`       | 40rem (640px)  | `@media (width >= 640px) { ... }`  |
| `md`       | 48rem (768px)  | `@media (width >= 768px) { ... }`  |
| `lg`       | 64rem (1024px) | `@media (width >= 1024px) { ... }` |
| `xl`       | 80rem (1280px) | `@media (width >= 1280px) { ... }` |
| `2xl`      | 96rem (1536px) | `@media (width >= 1536px) { ... }` |

- It works with any utility class, which means we can do anything at a given breakpoint.

```html
<div class="bg-blue-500 md:bg-green-500 lg:bg-red-500 p-4">Responsive Box</div>
```

- At small screens, the box will have a blue background.
- At medium screens (768px and up), the background will change to green.
- At large screens (1024px and up), the background will change to red.

## Working mobile-first

- Tailwind CSS uses a mobile-first approach, meaning that unprefixed utility classes apply to all screen sizes by default.
- For example

  ```html
  <!-- This will center text on mobile, and left align it on screens 640px and wider -->
  <div class="text-center sm:text-left">Responsive Text</div>
  ```

## Targeting a breakpoint range

- By default, `md:flex` applies the `flex` utility at `768px` and above, but what if we want to apply it only between `768px` and `1023px`?
- We can use `md` with `max-*` variants to target a specific range.

```html
<!--  This will apply the `flex` utility only between `768px` and `1279px` -->
<div class="md:max-xl:flex">...</div>
```

- Tailwind generates a corresponding `max-*` variant for each breakpoint, so out of the box, we have:

| Variant   | Max-Width         | CSS                                |
| --------- | ----------------- | ---------------------------------- |
| `max-sm`  | 39.99rem (639px)  | `@media (width <= 639px) { ... }`  |
| `max-md`  | 47.99rem (767px)  | `@media (width <= 767px) { ... }`  |
| `max-lg`  | 63.99rem (1023px) | `@media (width <= 1023px) { ... }` |
| `max-xl`  | 79.99rem (1279px) | `@media (width <= 1279px) { ... }` |
| `max-2xl` | 95.99rem (1535px) | `@media (width <= 1535px) { ... }` |

## Customizing Breakpoints

- Use `--breakpoint-*` theme variables in our `app.css` file to customize the default breakpoints.

```css
@import "tailwindcss";

@theme {
  --breakpoint-sm: 500px;
  --breakpoint-md: 700px;
  --breakpoint-lg: 900px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1600px;
  --breakpoint-3xl: 2000px;
}
```

- This will change the breakpoints to the specified values.
- **Note:** Always use same units (like `px`, `rem`, etc.) for all breakpoints to avoid unexpected behavior.

### Removing default Breakpoints

- To remove default breakpoints, we can reset its value to the `initial` keyword in our `app.css` file.

```css
@import "tailwindcss";

@theme {
  --breakpoint-sm: initial;
  --breakpoint-md: initial;
  --breakpoint-lg: initial;
  --breakpoint-xl: initial;
  --breakpoint-2xl: initial;
}
```

- This will disable all default breakpoints, and no responsive variants will be generated.
- `--breakpoint-*: initial;` can be use to reset all of the default breakpoints, than we can default all of them to our custom values.

```css
@import "tailwindcss";

@theme {
  --breakpoint-*: initial;
  --breakpoint-tablet: 40rem;
  --breakpoint-laptop: 64rem;
  --breakpoint-desktop: 80rem;
}
```

## Using arbitrary values

- We can also use arbitrary values for breakpoints by using square brackets `[]`.

```html
<!-- This will apply the `text-lg` utility at 900px and above -->
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  <!-- ... -->
</div>
```

- Here, `max-[600px]:bg-sky-300` applies the `bg-sky-300` utility when the screen width is `600px` or less.

## Container Queries

- `@container` utility are a modern CSS feature that allows us to apply styles based on the size of a parent container rather than the viewport.
- They provide more flexibility in responsive design, especially for components that may be used in different contexts.

### Basic example

- Use the `@container` class to define a container query, and use `@sm` or `@md` or other breakpoints to apply styles based on the container's size.

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

- In this example, the inner `div` will have a column layout by default and switch to a row layout when the container's width reaches the `md` breakpoint.

### Max-width container query

- Use `@max-*` variants with `@container` to apply styles based on the maximum width of the container.

```html
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Container Query Ranges

- Similar to responsive breakpoints, we can target specific ranges within container queries using `@min-*` and `@max-*` variants together.

```html
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Named container

- For more complex layouts, Tailwind CSS allows us to define named containers using the `@container/{name}` utility, and for targeting specific named containers, use `@sm/{name}`, `@md/{name}`, etc.

```html
<div class="@container/main">
  <!-- ... -->
  <div class="flex flex-row @sm/main:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Using custom container sizes

- In `app.css`, we can define custom container sizes using the `--container-*` theme variables.

```css
@import "tailwindcss";
@theme {
  --container-8xl: 96rem;
}
```

- This add a new `8xl` container size that can be used with container queries.

### Using arbitrary values in container queries

- We can also use arbitrary values for container queries by using square brackets `[]`.
- Use container query length utils like `cqw` as arbitrary values.

```html
<div class="@container">
  <div class="w-[50cqw]">
    <!-- ... -->
  </div>
</div>
```

#### Container query length utils are

| Utility | Description            | CSS Example           | Explanation                        |
| ------- | ---------------------- | --------------------- | ---------------------------------- |
| `cqw`   | Container Query Width  | `width: 50cqw;`       | 50% of the container's width       |
| `cqh`   | Container Query Height | `height: 50cqh;`      | 50% of the container's height      |
| `cqi`   | Container Query Inline | `inline-size: 50cqi;` | 50% of the container's inline size |
| `cqb`   | Container Query Block  | `block-size: 50cqb;`  | 50% of the container's block size  |
| `cqmin` | Container Query Min    | `min-width: 50cqmin;` | 50% of the container's min width   |
| `cqmax` | Container Query Max    | `max-width: 50cqmax;` | 50% of the container's max width   |

## Container Size Reference

| Variant | Min-Width      | CSS                                   |
| ------- | -------------- | ------------------------------------- |
| `@3xs`  | 16rem (256px)  | `@container (width >= 16rem) { ... }` |
| `@2xs`  | 18rem (288px)  | `@container (width >= 18rem) { ... }` |
| `@xs`   | 20rem (320px)  | `@container (width >= 20rem) { ... }` |
| `@sm`   | 24rem (384px)  | `@container (width >= 24rem) { ... }` |
| `@md`   | 28rem (448px)  | `@container (width >= 28rem) { ... }` |
| `@lg`   | 32rem (512px)  | `@container (width >= 32rem) { ... }` |
| `@xl`   | 36rem (576px)  | `@container (width >= 36rem) { ... }` |
| `@2xl`  | 42rem (672px)  | `@container (width >= 42rem) { ... }` |
| `@3xl`  | 48rem (768px)  | `@container (width >= 48rem) { ... }` |
| `@4xl`  | 56rem (896px)  | `@container (width >= 56rem) { ... }` |
| `@5xl`  | 64rem (1024px) | `@container (width >= 64rem) { ... }` |
| `@6xl`  | 72rem (1152px) | `@container (width >= 72rem) { ... }` |
| `@7xl`  | 80rem (1280px) | `@container (width >= 80rem) { ... }` |
