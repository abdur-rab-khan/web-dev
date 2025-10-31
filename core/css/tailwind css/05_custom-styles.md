# Custom Styles for Tailwind CSS

> Tailwind CSS allows us to define custom styles in our CSS files. Below are examples of how to set up custom font variables using Tailwind's `@theme` directive.

## Arbitrary properties

- If you need to use CSS properties that are not natively supported by Tailwind, you can use arbitrary properties.

```html
<div class="[mask-type:luminance]">
  <!-- ... -->
</div>
```

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

## Handling whitespace

- When an arbitrary property contains whitespace, you need to use underscores (`_`) to represent spaces.

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

```html
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
```

## Resolving ambiguities

- Many utilities in Tailwind CSS share a common namespace but map to different CSS properties.
- When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

```html
<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>
<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>
```

- You need to give a "hint" to Tailwind by adding CSS data types before the value:

```html
<div class="text-(--my-var)">...</div>

<!-- YOU HAVE TO DO LIKE THIS -->
<!-- Will generate a font-size utility -->
<div class="text-(length:--my-var)">...</div>
<!-- Will generate a color utility -->
<div class="text-(color:--my-var)">...</div>
```

## Adding base styles

- To define styles for specific HTML elements, use the `@layer` directive with the `base` layer.

```css
@layer base {
  h1 {
    @apply text-4xl font-bold;
  }
  p {
    @apply text-base leading-7;
  }

  /* OR */
  h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    line-height: 1.75rem;
  }
}
```

## Adding components classes

- To create reusable component classes, use the `@layer` directive with the `components` layer.

  ```css
  @layer components {
    .card {
      background-color: var(--color-white);
      border-radius: var(--radius-lg);
      padding: --spacing(6);
      box-shadow: var(--shadow-xl);
    }
  }
  ```

## Using `variants`

- Use the `@variant` directive to apply a Tailwind variant within custom CSS:

  ```css
  .my-element {
    background: white;
    @variant dark {
      background: black;
    }
  }

  /* Compiled CSS  */

  .my-element {
    background: white;
    @media (prefers-color-scheme: dark) {
      background: black;
    }
  }
  ```

- If need to apply multiple variants, you can chain them together:

  ```css
  .my-element {
    background: white;
    @variant dark {
      @variant hover {
        background: black;
      }
    }
  }

  /* Compiled CSS */

  .my-element {
    background: white;
    @media (prefers-color-scheme: dark) {
      &:hover {
        @media (hover: hover) {
          background: black;
        }
      }
    }
  }
  ```

## Simple utilities

- Use the `@utility` directive to apply Tailwind utility classes within custom CSS:

  ```css
  @utility content-auto {
    content-visibility: auto;
  }
  ```

  - Now use this utility class in your HTML:

  ````html
  <div class="content-auto">
    <!-- Content goes here -->
  </div>

  - It will also works with variants: ```css
  <div class="hover:content-auto">
    <!-- ... -->
  </div>
  ````

## Advanced utilities with `--value()`

### Bare values

- Use `--value(integer)` or `--value(number)` to match simple numeric values:

  ```css
  @utility tab-* {
    tab-size: --value(integer);
  }
  ```

  - Matches utilities like `tab-1` or `tab-8`

### Literal values

- Use `--value("literal1", "literal2")` to match specific keyword values:

  ```css
  @utility tab-* {
    tab-size: --value("inherit", "initial", "unset");
  }
  ```

  - Matches utilities like `tab-inherit` or `tab-initial`

### Arbitrary values

- Use `--value([type])` to support arbitrary values with square brackets:

  ```css
  @utility tab-* {
    tab-size: --value([integer]);
  }
  ```

  - Matches utilities like `tab-[4]` or `tab-[12]`

### Combining multiple value types

- You can combine theme variables, bare values, and arbitrary values:

  ```css
  @theme {
    --tab-size-github: 8;
  }

  @utility tab-* {
    tab-size: --value(--tab-size- *, integer, [integer]);
  }
  ```

  - Matches `tab-github`, `tab-4`, and `tab-[6]`

### Using modifiers

- Use `--modifier()` to handle values after a slash:

  ```css
  @utility text-* {
    font-size: --value(--text- *, [length]);
    line-height: --modifier(--leading- *, [length]);
  }
  ```

  - Matches utilities like `text-xl/loose` or `text-[14px]/[20px]`

## Adding custom variants

- Use `@custom-variant` to create your own variant modifiers:

  ```css
  @custom-variant theme-midnight {
    &:where([data-theme="midnight"] *) {
      @slot;
    }
  }
  ```

  - Now use in HTML:

  ```html
  <html data-theme="midnight">
    <button class="theme-midnight:bg-black">...</button>
  </html>
  ```

- Shorthand syntax when nesting isn't needed:

  ```css
  @custom-variant theme-midnight (&:where([data-theme="midnight"] *));
  ```
