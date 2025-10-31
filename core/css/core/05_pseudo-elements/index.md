# Pseudo elements

> Pseudo-elements is a keyword (starting with `::`) added to a selector that lets us to style a specific part of the selected element(s).

- [Pseudo elements](#pseudo-elements)
  - [Typographic pseudo-elements](#typographic-pseudo-elements)
    - [1. `::first-letter`](#1-first-letter)
    - [2. `::first-line`](#2-first-line)
  - [Highlight pseudo-elements](#highlight-pseudo-elements)
    - [1. `::selection`](#1-selection)
  - [Form Related Pseudo-elements](#form-related-pseudo-elements)
    - [1. `::file-selector-button`](#1-file-selector-button)
    - [2. `::placeholder`](#2-placeholder)
    - [3. `::picker()`](#3-picker)
    - [4. `::checkmark`](#4-checkmark)
    - [5. `::picker-icon`](#5-picker-icon)
  - [Tree Abiding pseudo-elements](#tree-abiding-pseudo-elements)
    - [1. `::before`](#1-before)
    - [2. `::after`](#2-after)
    - [3. `::backdrop`](#3-backdrop)
    - [TODO 4. `::marker`](#todo-4-marker)
    - [TODO 5. `::scroll-button()`](#todo-5-scroll-button)
    - [TODO 6. `::scroll-marker`](#todo-6-scroll-marker)
    - [TODO 7. `::scroll-marker-group`](#todo-7-scroll-marker-group)

## Typographic pseudo-elements

### 1. `::first-letter`

- It allows to style the first letter of the first line of a block-level element.
- See what are the styles allowed on `::first-letter` [here](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter#allowable_properties).

  ```css
  div#typo p:first-of-type {
    color: lightblue;

    &::first-letter {
      font-size: 32px;
      color: black;
      padding: 6px 12px;
      margin-right: 6px;
      border-radius: 6px;
      box-shadow: 3px 3px 0 red;
      background-color: yellow;
    }
  }

  div#typo p:last-of-type {
    color: orange;

    &::first-letter {
      font-size: 32px;
    }
  }
  ```

### 2. `::first-line`

- It allows to style the first line of a block-level element.
- See what are the styles allowed on `::first-line` [here](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line#allowable_properties).

  ```css
  div#typo p:first-of-type {
    color: lightblue;

    &::first-line {
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  div#typo p:last-of-type {
    color: orange;

    &::first-line {
      font-weight: bold;
      text-decoration: underline;
    }
  }
  ```

## Highlight pseudo-elements

### 1. `::selection`

- It allows to style the portion of an element that is selected by the user.
- See what are the styles allowed on `::selection` [here](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection#allowable_properties).

  ```css
  div#typo p::selection {
    background-color: lightgreen;
    color: darkgreen;
    text-shadow: 1px 1px 2px white;
  }
  ```

## Form Related Pseudo-elements

### 1. `::file-selector-button`

- It allows to style the button part of an `<input type="file">` element.

  ```css
  form input::file-selector-button {
    background-color: lightblue;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  form input::file-selector-button:hover {
    background-color: deepskyblue;
  }
  ```

### 2. `::placeholder`

- It allows to style the placeholder text of an `<input>` or `<textarea>` element.

  ```css
  form input::placeholder,
  form textarea::placeholder {
    color: gray;
    font-style: italic;
    opacity: 1; /* To ensure full opacity across browsers */
  }
  ```

### 3. `::picker()`

- It helps to select the picker part of an element, for example the drop-down picker.
- It takes an argument which specifies the type of picker to select.

  - `select` - for `<select>` elements

- It helps to style the drop-down picker of a `<select>` element.
- To make this functionality workable we need to have `appearance: base-select;` on both the `select` and `option`.

```css
form ::picker(select) {
  border: 2px solid black;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;
}
```

### 4. `::checkmark`

- It helps to target the checkmark placed inside the currently-selected **option** element.
- It is used to provide a visual indication of which option is selected.
- To make this functionality workable we need to have `appearance: base-select;` on both the `select` and `option`.

  ```css
  option::checkmark {
    order: 1;
    margin-left: auto;
    content: "☑️";
  }
  ```

### 5. `::picker-icon`

- It helps to target the icon part of a picker element (such as a dropdown arrow in a `<select>` element) 🔼.
- Let's animate the picker icon of a `<select>` element on hover.
- To make work this animation we need to have `appearance: base-select;` on both the `select` and `::picker(select)`.

  ```css
  select,
  ::picker(select) {
    appearance: base-select;
  }

  select::picker-icon {
    color: #999999;
    transition: 0.4s rotate;
  }

  select:open::picker-icon {
    rotate: 180deg;
  }
  ```

## Tree Abiding pseudo-elements

- These pseudo-elements work just like normal HTML elements in your page.
- They fit naturally into the box model (with margins, padding, borders, etc.).
- Think of them as actual child elements that you can style directly inside their parent element.

### 1. `::before`

- It creates a pseudo-element that is the first child of the selected element.
- It is often used to add decorative content before the actual content of an element.
- The `::before` pseudo-element is inline by default.
- It content is not provided it behave like `display: none;`.

  ```css
  div#tree p::before {
    content: "🌲 ";
    margin-right: 6px;
  }
  ```

### 2. `::after`

- It creates a pseudo-element that is the last child of the selected element.
- It is often used to add decorative content after the actual content of an element.
- The `::after` pseudo-element is inline by default.
- We can also use **css functions** like `attr()` inside the `content` property.

  ```css
  div#tree p::after {
    content: " 🌳";
    margin-left: 6px;
  }
  ```

### 3. `::backdrop`

- It is a box the size of **viewport** that appears behind a modal element when it is displayed.
- It is commonly used with following elements:
  - `<dialog>` element.
  - Elements with `popover` attribute.
  - It also works with **Fullscreen API** when it is in fullscreen mode.

### TODO 4. `::marker`

### TODO 5. `::scroll-button()`

### TODO 6. `::scroll-marker`

### TODO 7. `::scroll-marker-group`
