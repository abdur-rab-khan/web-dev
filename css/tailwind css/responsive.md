# Responsive in Tailwind CSS

> Tailwind CSS provides easier and more intuitive ways to create responsive designs using its built-in responsive utility variants.

## Overview

- Every tailwind utility class can be appliend conditionally based on the screen size using responsive variants.
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
