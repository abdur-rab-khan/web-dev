# Pseudo classes

> Pseudo-classes are a keyword followed by `selector:pseudo-class` that lets us to style an element when it is in a specific state, such as when a user hovers over it or when it is the first child of its parent.

- [Pseudo classes](#pseudo-classes)
  - [Overview](#overview)
  - [Common Pseudo-classes](#common-pseudo-classes)
    - [Element pseudo-classes](#element-pseudo-classes)
      - [1. `:headings`](#1-headings)
    - [User action pseudo-classes](#user-action-pseudo-classes)
      - [1. `:hover`](#1-hover)
      - [2. `:active`](#2-active)
      - [3. `:focus`](#3-focus)
      - [4. `:focus-visible`](#4-focus-visible)
      - [5. `:focus-within`](#5-focus-within)
    - [Tree structural pseudo-classes](#tree-structural-pseudo-classes)
      - [1. `:root`](#1-root)
      - [2. `:empty`](#2-empty)
      - [3. `:first-child`](#3-first-child)
      - [4. `:last-child`](#4-last-child)
      - [5. `:nth-child()`](#5-nth-child)
      - [6. `:only-child`](#6-only-child)
      - [7. `:nth-of-type()`](#7-nth-of-type)
      - [7. `:nth-last-of-type()`](#7-nth-last-of-type)
      - [Others](#others)
    - [Functional Pseudo-classes](#functional-pseudo-classes)
      - [1. `:is()`](#1-is)
      - [2. `:not()`](#2-not)
      - [3. `:where()`](#3-where)
      - [4. `:has()`](#4-has)
    - [Input Pseudo-classes](#input-pseudo-classes)
    - [Location pseudo-classes](#location-pseudo-classes)
    - [TODO Shadow DOM pseudo-classes](#todo-shadow-dom-pseudo-classes)
      - [1. `:open`](#1-open)
      - [2. `:popover-open`](#2-popover-open)
    - [TODO Page pseudo-classes](#todo-page-pseudo-classes)
    - [TODO View transition pseudo-classes](#todo-view-transition-pseudo-classes)
    - [TODO Element display state pseudo-classes](#todo-element-display-state-pseudo-classes)
    - [Resource state pseudo-classes](#resource-state-pseudo-classes)

## Overview

- Pseudo-classes helps to define style not only based on the document tree, but also based on user interaction or element state.
- A pseudo-class consits of a colon (`:`) followed by the pseudo-class name.
  - `a:hover` - Styles an anchor when user hovers.
  - `li:first-child` - Styles the first list item in a list.
  - `input:focus` - Styles an input field when it is focused.
- There are some functional pseudo-classes that take arguments within parentheses.
  - `a:lang(en)` - Styles an anchor element when the language is English.
  - `input:nth-child(2)` - Styles the second child input element.

## Common Pseudo-classes

### Element pseudo-classes

#### 1. `:headings`

- Selects all heading elements (`h1` to `h6`).
  - Example: `:headings { font-weight: bolder; }`
  - **Note:** It is is not compatible with all browsers yet.

### User action pseudo-classes

#### 1. `:hover`

- Selects an element when a mouse pointer over the item.

  - Example:

    ```css
    button:hover {
      background-color: blue;
    }
    ```

#### 2. `:active`

- Selects an elements when it beings active, such as when it is being clicked.

  - Example:

    ```css
    a:active {
      color: red;
    }
    ```

#### 3. `:focus`

- Selects an element when i received focus, It is generally happen when the user clicks or taps on an element or selects it using keyboard **`Tab`** key.

  - Example:

    ```css
    input:focus {
      border-color: green;
    }
    ```

#### 4. `:focus-visible`

- Applies when an element receives focus via keyboard navigation. Useful for accessibility to show which element is focused.

  - Example:

    ```css
    button:focus-visible {
      outline: 2px solid orange;
    }
    ```

#### 5. `:focus-within`

- Selects an element if it or any of its descendants (child elements) have received focus.

  - Example:

    ```css
    form:focus-within {
      border: 2px solid purple;
    }
    ```

### Tree structural pseudo-classes

- These pseudo-classes allows to select elements based on their position in the document tree.

#### 1. `:root`

- Selects the root element of the document. In HTML, it is equivalent to the `<html>` element.
- It is commonly used to define global CSS variables.

  - Example:

    ```css
    :root {
      --main-color: #3498db;
    }
    ```

#### 2. `:empty`

- Selects elements that have no children (including text nodes).

  - Example:

    ```css
    div:empty {
      display: none;
    }
    ```

#### 3. `:first-child`

- Selects an element that is the first child of its parent.

  - Example:

    ```css
    p:first-child {
      font-weight: bold;
    }
    ```

#### 4. `:last-child`

- Selects an element that is the last child of its parent.

  - Example:

    ```css
    li:last-child {
      color: red;
    }
    ```

#### 5. `:nth-child()`

- Selects an element based on its position among its siblings. It accepts a formula or keyword as an argument.
- It takes single argument that describes a pattern for matching element indexes.

  1. `odd` - Selects all odd-numbered children.
  2. `even` - Selects all even-numbered children.
  3. FUNCTIONAL NOTATION (`An + B`):
     - `A` - Step size (how many elements to skip).
     - `n` - A counter starting from 0 to infinity.
     - `B` - Offset (starting position).
     - `-` negative values can be used to count backwards from the end.
  4. `of` - Can be used to filter by type.
     - `:nth-child(2n of .item)` - Selects every second child with class `item`.

- Examples

  - `:nth-child(2n)` - every 2nd child: 2\*0 = 0, 2\*1 = 2, 2\*2 = 4, 2\*3 = 6, ...
  - `:nth-child(2n + 1)` - every odd child: 2\*0 + 1 = 1, 2\*1 + 1 = 3, 2\*2 + 1 = 5, ...
  - `:nth-child(3n + 2)` - every 3rd child starting from the 2nd: 3\*0 + 2 = 2, 3\*1 + 2 = 5, 3\*2 + 2 = 8, ...
  - `:nth-child(-n + 3)` - first three children: -0 + 3 = 3, -1 + 3 = 2, -2 + 3 = 1
  - `:nth-child(n + 2):nth-child(-n + 5)` - children from 2 to 5: 0 + 2 = 2, 1 + 2 = 3.... -0 + 5 = 5, -1 + 5 = 4, -2 + 5 = 3

#### 6. `:only-child`

- Selects an element that is the only child of its parent.

  - Example:

    ```css
    p:only-child {
      font-style: italic;
    }
    ```

#### 7. `:nth-of-type()`

- `:nth-of-type()` works similar as `:nth-child()`, but it helps to select elements based on their tag name (type) among its siblings.
- `.card p:nth-of-type(2)` will select the second `<p>` element inside `.card`, regardless of other sibling elements.

  - Example:

    ```css
    p:nth-of-type(2) {
      color: blue;
    }

    .card p:nth-of-type(2) {
      color: blue;
    }

    .container div:nth-of-type(3) {
      background-color: lightgray;
    }
    ```

  - This will select the second `<p>` element among its sibling `<p>` elements.

#### 7. `:nth-last-of-type()`

- `:nth-last-of-type()` works similar as `:nth-of-type()`, but it helps to select elements based on their tag name (type) among its siblings, counting from the end.
- `.card p:nth-last-of-type(1)` will select the last `<p>` element inside `.card`, regardless of other sibling elements.

  - Example:

    ```css
    p:nth-last-of-type(1) {
      color: green;
    }
    ```

  - This will select the last `<p>` element among its sibling `<p>` elements.

#### Others

| Pseudo-class     | Description                            | Example                           | Explanation                             |
| ---------------- | -------------------------------------- | --------------------------------- | --------------------------------------- |
| `:first-of-type` | Selects the first element of its type. | `p:first-of-type { color: red; }` | Selects the first `<p>` among siblings. |
| `:last-of-type`  | Selects the last element of its type.  | `p:last-of-type { color: blue; }` | Selects the last `<p>` among siblings.  |

### Functional Pseudo-classes

- These pseudo-classes accept a selector-list or forgiving selector as an argument.

#### 1. `:is()`

- `:is()` accepts a selector list as an argument and matches the element if found in any of the selectors in the list.
- It does not works with **pseudo elements** like `::before` or `::after`.

  - Example:

    ```css
    :is(h1, h2, h3) {
      color: darkblue;
    }

    #is-func :is(button:focus, input:focus, p):not(input:invalid) {
      color: yellow;
    }

    /* Browser will parse it into */
    h1,
    h2,
    h3 {
      color: darkblue;
    }

    #is-func button:focus:not(input:invalid),
    #is-func input:focus:not(input:invalid),
    #is-func p:not(input:invalid) {
      color: yellow;
    }
    ```

  - First example: Makes `h1`, `h2`, and `h3` elements dark blue.
  - Second example: Applies yellow text to focused `button`/`input` or any `p` inside `#is-func`, excluding invalid inputs.

#### 2. `:not()`

- The `:not()` pseudo-class is used to select elements that do not match a specified selector or group of selectors.

  - Example:

    ```css
    :not(.highlight) {
      background-color: lightgray;
    }

    #not-func :not(button:focus, input:focus, p):not(input:invalid) {
      color: yellow;
    }

    /* Browser will parse it into */
    :not(.highlight) {
      background-color: lightgray;
    }

    #not-func button:not(:focus):not(input:invalid),
    #not-func input:not(:focus):not(input:invalid),
    #not-func :not(p):not(input:invalid) {
      color: yellow;
    }
    ```

  - First example: Applies a light gray background to all elements that do not have the `highlight` class.
  - Second example: Applies yellow text to `button`/`input` that are not focused and not invalid, and any element that is not a `p` and not an invalid input inside `#not-func`.

#### 3. `:where()`

- `:where()` works exactly like `:is()` but with one key difference: it has **zero specificity**.
- This means other CSS rules can easily override it, making it useful when you want to keep your selectors flexible.

  - Example:

    ```css
    /* Using :where() - has zero specificity */
    :where(h1, h2, h3) {
      color: darkgreen;
    }

    /* This simple rule will override :where() */
    h1 {
      color: purple; /* h1 will be purple, not darkgreen */
    }

    /* Compare with :is() - has normal specificity */
    :is(h1, h2, h3) {
      color: darkblue;
    }

    /* This won't override :is() */
    h1 {
      color: orange; /* h1 will still be darkblue */
    }
    ```

  - **When to use `:where()`**: Perfect for creating default styles that you want to be easily overridable.
  - **Real-world example**:

    ```css
    /* Base button styles that are easy to override */
    :where(button, .btn, input[type="submit"]) {
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
    }

    /* Simple class can now override these styles */
    .btn-small {
      padding: 5px 10px; /* Works! */
    }
    ```

#### 4. `:has()`

- `:has()` allows us to select parent elements based on their children or descendants.
- It allows us to also use combinator selectors, pseudo-classes, and pseudo-elements within its argument.

  - Example:

    ```css
    /* Selects any div that contains an img element */
    div:has(img) {
      border: 2px solid blue;
    }

    /* Selects any section that has a heading (h1, h2, h3) */
    section:has(:is(h1, h2, h3)) {
      background-color: lightyellow;
    }

    /* Selects any article that contains a paragraph with class 'highlight' */
    article:has(p.highlight) {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    div:has(input:invalid) {
      border-color: red;
    }
    ```

  - First example: Adds a blue border to any `<div>` containing an `<img>`.
  - Second example: Sets a light yellow background for `<section>` elements containing any heading.
  - Third example: Applies a box shadow to `<article>` elements that contain a paragraph with the `highlight` class.
  - Fourth example: Changes the border color to red for `<div>` elements that contain an invalid input field.

### Input Pseudo-classes

| Pseudo-class         | Description                                                                                                                   | Example                                            | Explanation                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| `:checked`           | Selects checked radio buttons or checkboxes.                                                                                  | `input:checked { border-color: green; }`           | Styles checked inputs with a green border.                    |
| `:disabled`          | Selects disabled form elements.                                                                                               | `input:disabled { background-color: gray; }`       | Styles disabled inputs with a gray background.                |
| `:enabled`           | Selects enabled form elements.                                                                                                | `input:enabled { background-color: white; }`       | Styles enabled inputs with a white background.                |
| `:invalid`           | Selects form elements with invalid values.                                                                                    | `input:invalid { border-color: red; }`             | Styles invalid inputs with a red border.                      |
| `:valid`             | Selects form elements with valid values.                                                                                      | `input:valid { border-color: green; }`             | Styles valid inputs with a green border.                      |
| `:placeholder-shown` | Selects input fields showing placeholder text.                                                                                | `input:placeholder-shown { color: gray; }`         | Styles inputs showing placeholder text with gray color.       |
| `:required`          | Selects form elements that are required.                                                                                      | `input:required { border-left: 4px solid red; }`   | Styles required inputs with a red left border.                |
| `:optional`          | Selects form elements that are optional.                                                                                      | `input:optional { border-left: 4px solid green; }` | Styles optional inputs with a green left border.              |
| `:in-range`          | Selects input elements with values within a specified range.                                                                  | `input:in-range { border-color: blue; }`           | Styles inputs with values in range with a blue border.        |
| `:out-of-range`      | Selects input elements with values outside a specified range.                                                                 | `input:out-of-range { border-color: orange; }`     | Styles inputs with values out of range with an orange border. |
| `:default`           | Select the input which has already default value.                                                                             | `button:default { background-color: lightblue; }`  | Styles the default button with a light blue background.       |
| `:user-valid`        | Selects form elements with values valid according to user input.                                                              | `input:user-valid { border-color: green; }`        | Styles inputs with user-validated values with a green border. |
| `:user-invalid`      | Selects form elements with values invalid according to user input.                                                            | `input:user-invalid { border-color: red; }`        | Styles inputs with user-invalidated values with a red border. |
| `:autofill`          | Selects input fields that have been autofilled by the browser.                                                                | `input:autofill { background-color: yellow; }`     | Styles autofilled inputs with a yellow background.            |
| `:read-only`         | Selects input fields that are read-only.                                                                                      | `input:read-only { background-color: lightgray; }` | Styles read-only inputs with a light gray background.         |
| `:read-write`        | Selects input fields that are editable.                                                                                       | `input:read-write { background-color: white; }`    | Styles editable inputs with a white background.               |
| `:indeterminate`     | Select form elements (**checkbox**, **radio button**, **progress bars**) whose state is neither **checked** nor **unchecked** | `input:indeterminate { background-color: gray; }`  | Styles indeterminate checkboxes with a gray background.       |

### Location pseudo-classes

| Pseudo-class | Description                                                | Example                                             | Explanation                                                                        |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `:target`    | Selects the target element of a URL fragment identifier.   | `#section1:target { background-color: lightblue; }` | **`url:www.example.com#section1`** than element with **#section** will be selected |
| `:visited`   | Selects links that have been visited by the user.          | `a:visited { color: purple; }`                      | Styles visited links with purple color.                                            |
| `:link`      | Selects links that have not been visited by the user.      | `a:link { color: blue; }`                           | Styles unvisited links with blue color.                                            |
| `:any-link`  | Selects all links which are neither visited nor unvisited. | `a:any-link { text-decoration: underline; }`        | Underlines all links regardless of their visited state.                            |

### TODO Shadow DOM pseudo-classes

#### 1. `:open`

- It helps to select elements that has open and closed states such as **details**, **dialog**, **input**, **select**, only when it is in open state.

  ```css
  details:open {
    border: 2px solid green;
  }

  dialog:open {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  select:open {
    text-decoration: underline;
  }

  input:open {
    text-decoration: underline;
  }

  /* Or using :is() */
  :is(details, dialog, select, input):open {
    text-decoration: underline;
  }
  ```

#### 2. `:popover-open`

- It helps to select elements which have **`popover attribute`** and they are in open state.

  ```css
  [popover]:popover-open {
    border: 2px solid blue;
  }

  select:popover-open {
    text-decoration: underline;
  }

  input:popover-open {
    text-decoration: underline;
  }

  /* Or using :is() */
  :is(select, input):popover-open {
    text-decoration: underline;
  }
  ```

### TODO Page pseudo-classes

### TODO View transition pseudo-classes

### TODO Element display state pseudo-classes

### Resource state pseudo-classes
