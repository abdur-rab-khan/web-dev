# Selector in CSS

> Selectors allows us to target HTML elements to apply styles, there are various ways to select following are the most common selectors used in CSS.

## Types of Selectors

| Selector Type                                                      | Description                                                 |
| ------------------------------------------------------------------ | ----------------------------------------------------------- |
| [Universal Selector (`*`)](#universal-selector-example)            | Selects all elements on the page.                           |
| [Type Selector (`element`)](#type-selector-example)                | Selects all elements of a specific type (e.g., `div`, `p`). |
| [Class Selector (`.class`)](#class-selector-example)               | Selects all elements with a specific class.                 |
| [ID Selector (`#id`)](#id-selector-example)                        | Selects a single element with a specific ID.                |
| [Attribute Selector (`[attr=value]`)](#attribute-selector-example) | Selects elements with a specific attribute value.           |
| [Nesting Selectors](#nesting-selectors-example)                    | Combines multiple selectors to target specific elements.    |

### Universal Selector Example

- Targeting all elements on the page.
- It is useful for applying global styles.

  ```css
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 2px solid blue;
  }

  /*
    *#id means selecting all elements with specific id, which not possible in HTML as id should be unique.  
  */
  *#id {
    border: 1px solid red;
  }
  ```

### Type Selector Example

- Targeting all elements of a specific type.
- It is useful for applying styles to all elements of a certain type.

  ```css
  p {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }
  ```

### Class Selector Example

- Targeting all elements with a specific class.
- It is useful for applying styles to multiple elements that share the same class.

  ```css
  .highlight {
    background-color: yellow;
    font-weight: bold;
  }
  ```

### ID Selector Example

- Targeting a single element with a specific ID.
- Its is best where want to apply styles to a unique element on the page.

  ```css
  #header {
    background-color: blue;
    color: white;
    padding: 10px;
  }
  ```

### [Attribute Selector Example](../02_selectors/example/attribute.css)

- Targeting an elements based on an attribute name or with their values.
- It provides flexibility to select elements based on attributes:

  | Selector                  | Description                                 |
  | ------------------------- | ------------------------------------------- |
  | `[attr]`                  | Has attribute `attr`                        |
  | `[attr=value]`            | Attribute `attr` equals `value`             |
  | `[attr~=value]`           | Attribute `attr` contains word `value`      |
  | `[attr\|=value]`          | Attribute `attr` starts with `value`        |
  | `[attr^=value]`           | Attribute `attr` begins with `value`        |
  | `[attr$=value]`           | Attribute `attr` ends with `value`          |
  | `[attr*=value]`           | Attribute `attr` contains substring `value` |
  | `[attr operator=value i]` | Case-insensitive match                      |
  | `[attr operator=value s]` | Case-sensitive match (default)              |

### [Nesting Selectors Example](../02_selectors/example/nesting.css)

- It helps to apply styles to specific elements in a hierarchical manner.
- `&` refers to the parent selector in nested styles.
- `&` is commonly used for pseudo-classes, styling child elements can be done without using `&`.

  ```css
  .parent {
    color: blue;

    & .child {
      color: red;
    }

    &:hover {
      color: green;
    }
  }

  /* BROWSER PARSE IT INTO THIS WAY */
  .parent {
    color: blue;
  }

  .parent .child {
    color: red;
  }

  .parent:hover {
    color: green;
  }

  .parent {
    & p:hover,
    & div:hover {
      color: orange;
    }
  }

  /* BROWSER PARSE IT INTO THIS WAY */
  .parent p:hover,
  .parent div:hover {
    color: orange;
  }
  ```

- `&` can also be used for reverse nesting.

  ```css
  .card {
    /* Styles for card */
    .title & {
      /* .title .card style */
    }
  }

  /* BROWSER PARSE IT INTO THIS WAY */
  .card {
    /* Styles for card */
  }

  .title .card {
    /* .title .card style */
  }

  /* 
  .title .card style means selecting .card element inside .title element
  */
  ```

- **NOTE:** If class name has special characters like ?, ., #, etc. we need to escape them with backslash.

  ```css
  /* Class name is "btn.primary" */
  /* Class name is item.one */

  .btn\.primary {
    /* Styles */
  }

  .item\.one {
    /* Styles */
  }
  ```
