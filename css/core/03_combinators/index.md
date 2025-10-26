# Combinator in CSS

> Combinator are special characters that helps to select elements based on their relationship in the HTML structure.

## Types of Combinator

| Combinator    | Symbol | Description                     |
| ------------- | ------ | ------------------------------- |
| Descendant    | space  | Selects all nested elements     |
| Child         | `>`    | Selects direct children only    |
| Next Sibling  | `+`    | Selects immediate next sibling  |
| All Siblings  | `~`    | Selects all following siblings  |
| Selector List | `,`    | Groups multiple selectors       |
| Namespace     | `\|`   | Selects elements in a namespace |

## [Child Combinator](./example/child-combinator.css)

- `>` placed between two selectors to select direct children of a first selector.
- `div > p` selects all `<p>` elements that are direct children of a `<div>`.

  ```css
  div > p {
    color: red;
  }

  div[data-name="child-combo"] > .child {
    color: yellow;
  }

  div[data-name="child-combo"] > p {
    color: red;
  }
  ```

## [Descendant Combinator](./example/descendant-combinator.css)

- ` ` (space) placed between two selectors to select all nested elements.
- `div p` selects all `<p>` elements that are descendants of a `<div>`.

  ```css
  div p {
    color: blue;
  }

  div[data-name="descendant-combo"] p {
    color: blue;
  }
  ```

## [Namespace Combinator](./example/namespace-combinator.css)

## [Next Sibling Combinator](./example/next-sibling-combinator.css)

- `+` placed between two selectors to select the immediate next sibling.
- `img + p` selects the `<p>` element that is came immediately after an `<img>`.

  ```css
  img + p {
    color: green;
  }

  div[data-name="next-sibling-combo"] img + p {
    color: green;
  }

  li:first-child + li {
    color: orange;
  }

  /* 
    HTML Structure:
    <div data-name="next-sibling-combo">
        <img src="image.jpg" alt="An image" />
        <p>This paragraph will be green.</p>
    </div>
    */
  ```

- We can also combine it with any pseudo-class selectors like `:first-child`, `:last-child`, etc.

## [Selector List Combinator](./example/selector-list-combinator.css)

- `,` placed after each selector to target multiple elements at once, and apply the same styles to all of them.
- `h1, h2, h3` selects all `<h1>`, `<h2>`, and `<h3>` elements.

  ```css
  h1,
  h2,
  h3 {
    font-family: "Arial", sans-serif;
  }

  div[data-name="selector-list-combo"] h1,
  div[data-name="selector-list-combo"] h2,
  div[data-name="selector-list-combo"] h3 {
    font-family: "Arial", sans-serif;
  }
  ```

- We can combine and make a complex selector list as well.

  ```css
  div[data-name="selector-list-combo"] {
    & p,
    & span,
    & div,
    & h1,
    & h2,
    & h3 {
      color: lightseagreen;
      font-weight: bold;
      user-select: none;
      transition: all 0.3s ease;

      &:hover {
        color: orange;
      }

      /* Only add hover effect from "p", "span", "div", "h1", "h2", "h3" which has next sibling "div"  */
      &:has(+ div):hover {
        color: crimson;
      }
    }
  }
  ```

## [Subsequent Sibling Combinator](./example/subsequent-sibling-combinator.css)

- `~` placed between two selectors and selects all immediate siblings that come after a specified element.
- `h2 ~ p` selects all `<p>` elements that are siblings of an `<h2>` and come after it.

  ```css
  h2 ~ p {
    color: purple;
  }

  div[data-name="subsequent-sibling-combo"] h2 ~ p {
    color: purple;
  }
  ```

- Here is some complex one.

  ```css
  div[data-name="subsequent-sibling-combo"] .foo p ~ span {
    color: blue;
    font-weight: bold;

    &:after {
      content: " (subsequent sibling of p in .foo)";
      font-weight: normal;
      font-size: 0.9em;
      color: lightgray;
    }
  }

  div[data-name="subsequent-sibling-combo"] .foo p ~ .foo span {
    color: green;
    font-weight: bold;

    &:after {
      content: " (subsequent sibling of p in .foo followed by span in .foo)";
      font-weight: normal;
      font-size: 0.9em;
      color: lightgray;
    }
  }
  ```

- `.foo p ~ span` selects `<span>` siblings that come after `<p>` inside `.foo`.
- `.foo p ~ .foo span` selects `<span>` inside a `.foo` element that comes after `<p>` in the parent `.foo`.
