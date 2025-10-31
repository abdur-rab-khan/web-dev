# Theme variable in Tailwind CSS

> Tailwind CSS allows use to customize themes using CSS variables.

## Introduction

- Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.
- For example, we can add a new color using a theme variable.

```css
@import "tailwindcss";

@theme {
  --color-primary: #1da1f2;
  --color-mint-500: #3eb489;
}
```

- Let's use them

  ```html
  <div class="bg-primary text-mint-500">
    <!--  -->
  </div>
  ```

- Tailwind also generate regular CSS variables for these theme variables, so we can use them in our inline styles or custom CSS.

  ```html
  <div
    class="p-4"
    style="background-color: var(--color-primary); color: var(--color-mint-500);"
  >
    <!--  -->
  </div>
  ```

## Relationship to utility classes

- `flex`, `object-cover` these are static they are always the same from project to project.
- But many others are driven by the theme variables, and only works if the corresponding theme variable is defined.

- For example, `--font-*` namespaces determine all of the `font-family-*` utilities that exits in a projects.

  ```css
  /* ./node_modules/tailwindcss/theme.css */
  @theme {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
    /* ... */
  }
  ```

  - The `font-sans`, `font-serif` utilities only exits by default because Tailwind's default theme defines the `--font-sans` and `--font-serif` theme variables.

- If we want to add a new font family utility, we can define a new theme variable.

  ```css
  @import "tailwindcss";

  @theme {
    --font-custom: "Comic Sans MS", cursive, sans-serif;
  }
  ```

  - Now we can use the `font-custom` utility class in our project.

  ```html
  <div class="font-custom">
    <!--  -->
  </div>
  ```

## Default theme variables

- When we import `tailwindcss` at the top of our CSS file, it automatically includes a set of default theme variables.
- Here's what we actually import:

  ```css
  <!-- node_modules/tailwindcss/index.css
  -->
  @layer theme, base, components, utilities;
  @import "./theme.css" layer(theme);
  @import "./preflight.css" layer(base);
  @import "./utilities.css" layer(utilities);
  ```

  - That `theme.css` file includes the default color palette, type scale, shadows, fonts, and more:

## Extending default theme variables

- Use `@theme` to define new theme variables and extend the default theme.

  ```css
  @import "tailwindcss";

  @import "tailwindcss";
  @theme {
    --font-script: Great Vibes, cursive;
  }
  ```

  - It will add a new `font-script` utility class to our project.

  ```html
  <div class="font-script">
    <!--  -->
  </div>
  ```

## Overriding default theme variables

- Override a default theme variable value by **redefining** it within `@theme`:

  ```css
  @import "tailwindcss";

  @theme {
    --breakpoint-sm: 30rem;
  }
  ```

  - Now the `sm:*` variant will be triggered at `30rem` instead of the default `640px` (`40rem`).

- To completely override a entire namespace in the default theme, set the entire namespace to `initial` using the special astrisk `*` variable.

  ```css
  @import "tailwindcss";

  @theme {
    --color-*: initial;
    --color-primary: #ff5733;
    --color-secondary: #33c1ff;
  }
  ```

  - This will remove all default colors and only add `primary` and `secondary` colors to the project.

## Using a custom theme

- To completely disable the default theme and use only custom values, set the global theme variable namespace to initial:

```css
@import "tailwindcss";

@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
  --color-driftwood: oklch(0.79 0.06 74.59);
  --color-tide: oklch(0.49 0.08 205.88);
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

- Now none of the default utility classes that are driven by theme variables will exist in the project, only the ones we defined ourselves.

## Defining animation keyframes

- Define the `@keyframes` rules for our `--animation-*` theme variables within the `@theme` directive.

```css
@import "tailwindcss";
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;
  @keyframes fade-in-scale {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

- Now we can use the `animate-fade-in-scale` utility class in our project.

```html
<div class="animate-fade-in-scale">
  <!--  -->
</div>
```

## Referencing other variables

### 1. `inline`

- Use the `inline` keyword when a theme variable references another theme variable.

  ```css
  @import "tailwindcss";

  @theme inline {
    --font-sans: var(--font-inter);
  }
  ```

  - This makes `--font-sans` use the value from `--font-inter`.
