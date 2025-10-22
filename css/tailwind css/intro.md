# Tailwind CSS

> **Tailwind CSS** is a utility-first CSS framework for rapidly building custom user interfaces. It provides a set of pre-defined CSS classes that can be directly applied to HTML elements to style them without writing custom CSS.

- [Tailwind CSS](#tailwind-css)
  - [Styling with utility classes](#styling-with-utility-classes)
  - [Styling hover and focus states](#styling-hover-and-focus-states)
  - [Media queries and breakpoints](#media-queries-and-breakpoints)
  - [Targeting dark mode](#targeting-dark-mode)
    - [How to enable dark mode in Tailwind CSS?](#how-to-enable-dark-mode-in-tailwind-css)
    - [Using a data attribute](#using-a-data-attribute)
  - [Using arbitrary values](#using-arbitrary-values)
  - [Complex selectors](#complex-selectors)
    - [`Group` variant](#group-variant)
      - [Nested complex selectors with `group`](#nested-complex-selectors-with-group)
    - [`Peer` variant](#peer-variant)
  - [When to use Inline Styles](#when-to-use-inline-styles)
  - [Using custom CSS](#using-custom-css)

## Styling with utility classes

- Styling using Tailwind CSS involves applying pre-defined utility style classes directly to HTML elements.
- For example:

```html
<div
  class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
>
  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

- In following example, we've used:

| Class        | Equivalent CSS Property                     |
| ------------ | ------------------------------------------- |
| `flex`       | `display: flex;`                            |
| `mx-auto`    | `margin-left: auto; margin-right: auto;`    |
| `p-6`        | `padding: 1.5rem;`                          |
| `rounded-xl` | `border-radius: 0.75rem;`                   |
| `bg-white`   | `background-color: #ffffff;`                |
| `text-xl`    | `font-size: 1.25rem; line-height: 1.75rem;` |

- It's feels like inline styling at first glance, but Tailwind CSS is beyond that.
- Using utility classes we can apply complex things like **responsiveness**, **dark mode**, **hover**, **focus** and more.

## Styling hover and focus states

- To style hover and focus states we use `hover:` and `focus:` prefixes before the utility class.

- For example

```html
<button class="bg-sky-500 hover:bg-sky-700">Hover me</button>
```

## Media queries and breakpoints

- `sm:`, `md:`, `lg:`, `xl:` prefixes are used to apply styles at different screen sizes.

- For example:

```html
<div class="grid grid-cols-2 sm:grid-cols-3">
  <!-- ... -->
</div>

<!-- grid-cols-3 triggers at the `sm` breakpoint which is 40rem out of the box -->
```

## Targeting dark mode

- Tailwind CSS provides very easy way to target dark mode using the `dark:` prefix.
- After `dark:` prefix style, will be applied when dark mode is active.

- For example:

```html
<div class="bg-white text-black dark:bg-black dark:text-white">
  <!-- Content -->
</div>
```

### How to enable dark mode in Tailwind CSS?

- By default, Tailwind CSS uses `prefers-color-scheme` CSS media feature to detect dark mode, but we can also make to toggle dark mode manually.
- To override the default behavior, we need use custom selector:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

- Now instead of `dark:*` utilities being applied based on system preference, they will be applied when an element with `dark` class is present in the DOM.

```html
<html class="dark">
  <body>
    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Content -->
    </div>
  </body>
</html>
```

### Using a data attribute

- To use a data attribute instead of a class just modify the custom variant like this:

```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme="dark], [data-theme="dark"] *));
```

- Now we can enable dark mode like this:

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

## Using arbitrary values

- Tailwind CSS allows using arbitrary (custom) value using square brackets `[]`.

- For Example:

```html
<div class="rounded-[15px] bg-[#1da1f2] p-[25px]">
  <!-- ... -->
</div>

<!-- We can also use CSS functions inside them. -->
<div class="max-h-[calc(100vh-4rem)] overflow-y-auto">
  <!--  -->
</div>

<!-- Also generate completely arbitary csss -->
<div class="box-shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
  <!--  -->
</div>
```

## Complex selectors

- Tailwind CSS allows us to style an element based on combination of conditions using complex selectors.
- For example, in dark mode, at a specific breakpoint, when hovered, and when the element has a specific data attribute.

```html
<button class="dark:lg:data-current:hover:bg-blue-500">
  <!--  -->
</button>

<!-- 
 It apply "hover:bg-blue-500", If these conditions are true "dark mode", "screen-size >= 1024", has data-current attribute 
-->

<div
  data-current="yes"
  class="h-10 w-10 bg-yellow-500 dark:lg:data-[current=yes]:hover:bg-orange-700"
></div>
<!-- 
- It apply "hover:bg-orange-700", If these conditions are true "dark mode", "screen-size >= 1024", has data-current attribute with value "yes"
 -->
```

### `Group` variant

- The `group` variant allows us to style child elements based on the state of a parent element.

```html
<a href="#" class="group"> <div class="bg-white p-4 group-hover:bg-gray-100">Hover over me</div></a>

<!-- 
 It apply "bg-gray-100" to the div when the parent anchor tag is hovered over.
 -->

<!-- 
  There are many more variants like "group-focus", "group-active" etc.
  -->
```

#### Nested complex selectors with `group`

```html
<ul>
  { persons.map(p => (
  <li class="group/item ...">
    <a class="group/edit">
      <span class="group-hover/edit:text-gray-700 ...">Call</span>
      <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-gray-500 ...">
        <!-- ... -->
      </svg>
    </a>
    )) }
  </li>
</ul>
```

### `Peer` variant

- The `peer` variant allows us to style sibling elements based on the state of a preceding sibling element.

```html
<input type="checkbox" id="toggle" class="peer" />
<label for="toggle" class="peer-checked :bg-blue-500 cursor-pointer bg-gray-200 p-4">
  Toggle me
</label>

<!-- 
 It apply "bg-blue-500" to the label when the checkbox is checked.
 -->
```

## When to use Inline Styles

- Inline styles are still very useful in Tailwind CSS mainly where dynamic soruces are involved.

- For example, setting background image from a dynamic source:

```jsx
<div className="h-64 w-64 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
```

## Using custom CSS

- This pattern is common where we need something that will be reused multiple times across the project, such as buttons, cards, modals, etc.
- We can define custom CSS inside `@layer components` directive to add our own utility classes.

- HTML

  ```html
  <button class="btn-primary">Click Me</button>
  ```

- CSS

  ```css
  @import "tailwindcss";

  @layer components {
    .btn-primary {
      @apply rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700;
    }
  }

  <!-- FOR MORE COMPLEXITY -- > @layer components {
    .btn-primary {
      border-radius: calc(infinity * 1px);
      background-color: var(--color-violet-500);
      padding-inline: --spacing(5);
      padding-block: --spacing(2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-white);
      box-shadow: var(--shadow-md);
      &:hover {
        @media (hover: hover) {
          background-color: var(--color-violet-700);
        }
      }
    }
  }
  ```
