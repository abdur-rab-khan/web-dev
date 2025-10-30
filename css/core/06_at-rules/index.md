# At-rules in CSS

> **At-rules** are special rules in CSS that begins with **@** symbol, that tell browser how to process the CSS code, rather than just applying style elements directly.

- [At-rules in CSS](#at-rules-in-css)
  - [Syntax](#syntax)
  - [Common At-rules](#common-at-rules)
    - [`@import`](#import)
    - [`@layer`](#layer)
  - [Statement at-rules](#statement-at-rules)
    - [`@media`](#media)
      - [Important Media Queries](#important-media-queries)
      - [Logical Operators](#logical-operators)
      - [Media Types](#media-types)
      - [Example](#example)
    - [`@font-face`](#font-face)
      - [Descriptors](#descriptors)
      - [Common way to load fonts](#common-way-to-load-fonts)
      - [Font MIME Types](#font-mime-types)
    - [`@supports`](#supports)
      - [**Declaration syntax**](#declaration-syntax)
      - [**Functional syntax**](#functional-syntax)
    - [`@keyframes`](#keyframes)
      - [Values](#values)

## Syntax

- At-rules follow standard CSS syntax, with specific rules defined in their respective modules.
- They come in two basic forms:
  1. **Simple form**: `@identifier RULE;` (ends with a semicolon)
  2. **Block form**: `@identifier RULE { ... }` (contains nested rules inside curly braces)
- Some at-rules can contain nested CSS rules inside `{}`, depending on the type of at-rule.
- Simple at-rules end with a semicolon `;`, while block at-rules use curly braces `{}`.

## Common At-rules

### `@import`

- The `@import` at-rule is used to import styles from valid CSS files into current one.
- It have to be placed at the top of the CSS before any other rules or any other styles.
- **Syntax**

  ```css
  /* Simple form */
  @import url("styles.css");

  /* Or without url() */
  @import "styles.css";

  /* With media queries */
  @import url("print.css") print;

  /* Import with multiple media queries */
  @import url("responsive.css") screen and (max-width: 600px);

  /* Layer name */
  @import url("layered.css") layer(layerName);

  /* Using @supports */
  @import url("supports.css") supports(display: grid);
  ```

- **Importing CSS rules conditional on media queries**

  ```css
  @import "fine-print.css" print;
  @import "bluish.css" print, screen;
  @import "common.css" screen;
  @import "landscape.css" screen and (orientation: landscape);
  ```

  - First line imports styles for printing.
  - Second line imports styles for both print and screen.
  - Third line imports styles for screen devices only.
  - Fourth line imports styles for screens in landscape orientation only.

- **Importing CSS rules conditional on feature support**

  ```css
  @import "grid.css" supports(display: grid) screen and (width <= 400px);
  @import "flex.css" supports((not (display: grid)) and (display: flex)) screen and
    (width <= 400px);
  ```

  - First line imports styles if the browser supports CSS Grid and the screen width is 400px or less.
  - Second line imports styles if the browser does not support CSS Grid but supports Flexbox, and the screen width is 400px or less.

### `@layer`

## Statement at-rules

### `@media`

- `@media` at-rules is used to apply CSS style based on the result of one or more media queries.
- So specify media-query conditions with CSS styles that apply to the document if media query matches.
- **Syntax**

  ```css
  @media media-query {
    /* CSS rules here */
  }
  ```

#### Important Media Queries

| Media Feature            | Description                    | Example                                           |
| ------------------------ | ------------------------------ | ------------------------------------------------- |
| `width`                  | Width of the viewport          | `@media (max-width: 600px) { ... }`               |
| `height`                 | Height of the viewport         | `@media (min-height: 800px) { ... }`              |
| `orientation`            | Device orientation             | `@media (orientation: landscape) { ... }`         |
| `resolution`             | Screen resolution              | `@media (min-resolution: 300dpi) { ... }`         |
| `prefers-color-scheme`   | User's color scheme preference | `@media (prefers-color-scheme: dark) { ... }`     |
| `prefers-reduced-motion` | User's motion preference       | `@media (prefers-reduced-motion: reduce) { ... }` |
| `aspect-ratio`           | Aspect ratio of the viewport   | `@media (min-aspect-ratio: 16/9) { ... }`         |

- **Note:** We can also apply **`min- (>=)`** or **`max- (<=)`** prefixes to these media features to create responsive designs.

  1. `min-width` and `max-width` are commonly used to target different screen sizes.
  2. `min-height` and `max-height` can be used to adjust styles based on viewport height.
  3. `min-resolution` and `max-resolution` can be used to target devices with specific screen resolutions.
  4. `min-aspect-ratio` and `max-aspect-ratio` can be used to target devices based on their aspect ratios.

#### Logical Operators

| Operator   | Description                                        | Example                                                          |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| `and`      | Combines multiple conditions that must all be true | `@media (min-width: 600px) and (orientation: landscape) { ... }` |
| `or (',')` | At least one condition must be true                | `@media (max-width: 400px), (max-height: 300px) { ... }`         |
| `not`      | Negates a condition                                | `@media not all and (monochrome) { ... }`                        |
| `only`     | Applies styles only if the entire query matches    | `@media only screen and (max-width: 600px) { ... }`              |

#### Media Types

- Media types define the category of device for which the styles are intended. Common media types include:
  - `all`: Suitable for all devices.
  - `print`: Intended for printed documents and print previews.
  - `screen`: Designed for computer screens, tablets, smartphones, etc.

#### Example

```css
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

### `@font-face`

- The `@font-face` at-rule allows us to define custom fonts from local or remote sources.
- It enables the use of fonts that are not installed on the user's device.
- **Syntax**

  ```css
  @font-face {
    font-family: "CustomFont";
    src: local("CustomFont"), url("CustomFont.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  ```

#### Descriptors

| Descriptor      | Description                                                                                        | Example                     |
| --------------- | -------------------------------------------------------------------------------------------------- | --------------------------- |
| `font-family`   | Specifies the name of the font                                                                     | `font-family: "MyFont";`    |
| `src`           | Defines the source of the font                                                                     | `src: url("font.woff2");`   |
| `font-weight`   | Specifies the weight of the font                                                                   | `font-weight: bold;`        |
| `font-style`    | Specifies the style of the font                                                                    | `font-style: italic;`       |
| `unicode-range` | Defines the range of characters supported by the font                                              | `unicode-range: U+000-5FF;` |
| `font-display`  | Controls how the font is displayed while loading means it could be swap, block, fallback, optional | `font-display: swap;`       |
| `font-stretch`  | Specifies the width of the font                                                                    | `font-stretch: condensed;`  |

#### Common way to load fonts

1. `src: local("FontName")`: First tries to use the font if it's already installed on the user's system.
2. `src: local("FontName), url("FontFile.woff2") format("woff2")`: If the font is not available locally, it fetches the font from the specified URL in WOFF2 format.

#### Font MIME Types

| Format     | MIME Type    | Description            |
| ---------- | ------------ | ---------------------- |
| `woff2`    | `font/woff2` | Web Open Font Format 2 |
| `woff`     | `font/woff`  | Web Open Font Format   |
| `truetype` | `font/ttf`   | TrueType Font          |
| `opentype` | `font/otf`   | OpenType Font          |

- **NOTE:** We can't load fonts within a CSS selectors block; it must be defined at the top level of the CSS file.

### `@supports`

- The `@supports` at-rules let's us apply CSS styles conditionally based on whether the browser supports specific CSS features.
- It is useful for implementing progressive enhancement and ensuring compatibility across different browsers.
- **Syntax**

  ```css
  @supports (property: value) {
    /* CSS rules here */
  }
  ```

- It can declare multiple conditions using logical operators like `and`, `or`, and `not`.

  ```css
  @supports (display: grid) and (not (display: flex)) {
    /* CSS rules for browsers that support grid but not flexbox */
  }
  ```

- There are two ways to use `@supports`:

#### **Declaration syntax**

- Checks if a specific CSS property-value pair is supported.

  ```css
  @supports (display: grid) {
    /* CSS rules here */
  }
  ```

#### **Functional syntax**

- It allows use to check if a browser supports values or expressions within function.

  1. **selection()**

     - Checks if a specific CSS selector is supported.

       ```css
       @supports selector(h2 > p) {
         /* CSS rules here */
       }

       @supports selector(:has(img)) {
         /* CSS rules here */
       }

       @supports selector(:nth-child(1n + 3)) {
         /* CSS rules here */
       }
       ```

- **Note:** We can also combine these with logical operators like `and`, `or`, and `not` to create complex conditions.

### `@keyframes`

- The `@keyframes` at-rule is used to create animations in a sequence manner by defining styles for keyframes at specific points during the animation.
- **Syntax**

  ```css
  @keyframes animation-name {
    from {
      /* Initial styles */
    }
    to {
      /* Final styles */
    }
  }
  ```

#### Values

1. **animation-name**: Specifies the name of the animation.
2. **from**: Defines the starting state of the animation (equivalent to 0%).
3. **to**: Defines the ending state of the animation (equivalent to 100%).
4. **percentage** is use to change styles at specific points during the animation (e.g., `0%`, `50%`, `100%`).
5. **timeline-range-name (percentage)**
