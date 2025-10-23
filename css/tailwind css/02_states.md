# Hover, focus, and other states

> These variants allows us to style an element based on its state or interaction.
> Each utility class in Tailwind can be applied conditionally using these variants to the begining of the class name

- [Hover, focus, and other states](#hover-focus-and-other-states)
  - [Tailwind includes following variants by default](#tailwind-includes-following-variants-by-default)
  - [Example](#example)
  - [Usage of these variants](#usage-of-these-variants)
    - [:hover, :focus and :active](#hover-focus-and-active)
    - [Examples](#examples)
      - [First and Last Child](#first-and-last-child)
      - [Odd and Even](#odd-and-even)
      - [Specific Position](#specific-position)
      - [:required and :disabled](#required-and-disabled)
      - [:has()](#has)
      - [group-has-\*](#group-has-)
    - [Using styling based on the descendants of a peer](#using-styling-based-on-the-descendants-of-a-peer)
      - [peer-has-\*](#peer-has-)
  - [Styling direct children](#styling-direct-children)
  - [Quick reference](#quick-reference)
    - [Mouse \& Keyboard Interactions](#mouse--keyboard-interactions)
    - [Focus States](#focus-states)
    - [Link States](#link-states)
    - [Child Selectors](#child-selectors)
    - [Relational Selectors](#relational-selectors)
    - [Form Input States](#form-input-states)
    - [Form Validation](#form-validation)
    - [Pseudo-elements](#pseudo-elements)
    - [Responsive (Breakpoints)](#responsive-breakpoints)
    - [Container Queries](#container-queries)
    - [Media \& Feature Queries](#media--feature-queries)
    - [ARIA Attributes](#aria-attributes)
    - [Data Attributes \& Directionality](#data-attributes--directionality)
    - [Special States](#special-states)

## Tailwind includes following variants by default

- **_Pseudo-classes_** like `hover:`, `focus`, `active:`, `first-child:`, `last-child:`, etc.
- **_Pseudo-elements_**, like `::before:`, `::after:`, `::placeholder:` and `::selection`.
- **_media-and-feature-queries_**, like `sm:`, `md:`, `lg:`, `xl:`, `dark:`, `motion-reduce:`, etc.
- **_Attribute selectors_**, like `data-[state=open]:`, `aria-[expanded=true]:` and [open] etc.
- **_Child selectors_**, like `& > *`, `& + &`, etc.
- You can combine variants for complex styling.

## Example

```html
<button
  class="dark:md:hover:bg-blue-500 focus:scale-105 data-[state=open]:bg-red-500"
>
  Click Me
</button>
```

## Usage of these variants

### :hover, :focus and :active

Style elements on mouse hover, keyboard focus, and click.

```html
<button
  class="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-voilet-700 active:bg-violet-800"
>
  Save Changes
</button>
```

### Examples

#### First and Last Child

Remove padding from first and last items in a list.

```html
<ul role="list">
  <li class="py-4 first:pt-0 last:pb-0">...</li>
</ul>
```

#### Odd and Even

Alternate background colors for list items.

```html
<ul role="list">
  <li class="px-4 py-2 odd:bg-gray-100 even:bg-white">...</li>
</ul>
```

#### Specific Position

Target specific child positions.

```html
<!-- 3rd element gets underlined -->
<div class="nth-3:underline"></div>

<!-- 2nd from last gets margin-top -->
<div class="nth-last-2:mt-4"></div>
```

#### :required and :disabled

Style form inputs based on their state.

```html
<input
  type="text"
  disabled
  class="required:border-blue-500 invalid:border-red-500 focus:invalid:border-red-700"
/>
```

#### :has()

Style parent based on children state.

```html
<label class="has-checked:bg-indigo-50 has-checked:text-indigo-900">
  Google Pay
  <input type="radio" name="google" class="checked:border-indigo-500" />
</label>
```

#### group-has-\*

Style element based on group's children.

```html
<div class="group">
  <img src="..." />
  <h4>Lorem Ipsum</h4>
  <!-- SVG shows only when link exists in group -->
  <svg class="group-has-[a]:block hidden">...</svg>
  <p>Product Designer at <a href="...">planeteria.tech</a></p>
</div>
```

### Using styling based on the descendants of a peer

#### peer-has-\*

Style element based on sibling's children state.

```html
<div>
  <label class="peer">
    <input type="checkbox" checked />
    Create a to do list
  </label>
  <!-- SVG hides when checkbox is checked -->
  <svg class="peer-has-checked:hidden">...</svg>
</div>
```

## Styling direct children

Apply same styles to all direct children using `*:` variant.

```html
<div>
  <h2>Categories</h2>
  <ul class="*:rounded-full *:bg-gray-200 *:px-3 *:py-1 *:hover:bg-gray-300">
    <li>Books</li>
    <li>Electronics</li>
    <li>Clothing</li>
  </ul>
</div>
```

## Quick reference

### Mouse & Keyboard Interactions

| Variant   | CSS Equivalent                      | Description                |
| --------- | ----------------------------------- | -------------------------- |
| `hover:`  | `@media (hover: hover) { &:hover }` | When mouse is over element |
| `active:` | `&:active`                          | When element is clicked    |

### Focus States

| Variant          | CSS Equivalent    | Description                      |
| ---------------- | ----------------- | -------------------------------- |
| `focus:`         | `&:focus`         | When element is focused          |
| `focus-within:`  | `&:focus-within`  | When element or child is focused |
| `focus-visible:` | `&:focus-visible` | When focused using Tab key       |

### Link States

| Variant    | CSS Equivalent | Description                     |
| ---------- | -------------- | ------------------------------- |
| `visited:` | `&:visited`    | For visited links               |
| `target:`  | `&:target`     | When URL points to this element |

### Child Selectors

| Variant                   | CSS Equivalent            | Description                |
| ------------------------- | ------------------------- | -------------------------- |
| `*:`                      | `:is(& > *)`              | Direct children            |
| `**:`                     | `:is(& *)`                | All descendants            |
| `first:`                  | `&:first-child`           | First child element        |
| `last:`                   | `&:last-child`            | Last child element         |
| `only:`                   | `&:only-child`            | Only child of parent       |
| `odd:`                    | `&:nth-child(odd)`        | Odd positioned children    |
| `even:`                   | `&:nth-child(even)`       | Even positioned children   |
| `first-of-type:`          | `&:first-of-type`         | First of specific type     |
| `last-of-type:`           | `&:last-of-type`          | Last of specific type      |
| `only-of-type:`           | `&:only-of-type`          | Only one of specific type  |
| `nth-[...]:`              | `&:nth-child(...)`        | Specific child by position |
| `nth-last-[...]:`         | `&:nth-last-child(...)`   | Specific child from end    |
| `nth-of-type-[...]:`      | `&:nth-of-type(...)`      | Specific type by position  |
| `nth-last-of-type-[...]:` | `&:nth-last-of-type(...)` | Specific type from end     |
| `empty:`                  | `&:empty`                 | Element with no content    |

### Relational Selectors

| Variant        | CSS Equivalent               | Description                 |
| -------------- | ---------------------------- | --------------------------- |
| `has-[...]:`   | `&:has(...)`                 | Has specific descendant     |
| `group-[...]:` | `&:is(:where(.group)... *)`  | Descendant of group element |
| `peer-[...]:`  | `&:is(:where(.peer)... ~ *)` | Sibling of peer element     |
| `in-[...]:`    | `:where(...) &`              | Within specific context     |
| `not-[...]:`   | `&:not(...)`                 | Does not match selector     |

### Form Input States

| Variant              | CSS Equivalent             | Description                 |
| -------------------- | -------------------------- | --------------------------- |
| `disabled:`          | `&:disabled`               | Disabled form inputs        |
| `enabled:`           | `&:enabled`                | Enabled form inputs         |
| `checked:`           | `&:checked`                | Checked checkbox/radio      |
| `indeterminate:`     | `&:indeterminate`          | Partially checked checkbox  |
| `default:`           | `&:default`                | Default option in form      |
| `required:`          | `&:required`               | Required form field         |
| `optional:`          | `&:optional`               | Optional form field         |
| `read-only:`         | `&:read-only`              | Non-editable input          |
| `placeholder-shown:` | `&:placeholder-shown`      | When placeholder is visible |
| `autofill:`          | `&:autofill`               | When input is autofilled    |
| `inert:`             | `&:is([inert], [inert] *)` | Inert element               |
| `details-content:`   | `&:details-content`        | Details element content     |

### Form Validation

| Variant         | CSS Equivalent   | Description                |
| --------------- | ---------------- | -------------------------- |
| `valid:`        | `&:valid`        | Valid form input           |
| `invalid:`      | `&:invalid`      | Invalid form input         |
| `user-valid:`   | `&:user-valid`   | User-validated input       |
| `user-invalid:` | `&:user-invalid` | User-invalidated input     |
| `in-range:`     | `&:in-range`     | Input value within limits  |
| `out-of-range:` | `&:out-of-range` | Input value outside limits |

### Pseudo-elements

| Variant         | CSS Equivalent            | Description             |
| --------------- | ------------------------- | ----------------------- |
| `before:`       | `&::before`               | Before element content  |
| `after:`        | `&::after`                | After element content   |
| `first-letter:` | `&::first-letter`         | First letter of element |
| `first-line:`   | `&::first-line`           | First line of element   |
| `marker:`       | `&::marker, & *::marker`  | List item marker        |
| `selection:`    | `&::selection`            | Selected text           |
| `file:`         | `&::file-selector-button` | File input button       |
| `backdrop:`     | `&::backdrop`             | Dialog/modal backdrop   |
| `placeholder:`  | `&::placeholder`          | Input placeholder text  |

### Responsive (Breakpoints)

| Variant      | CSS Equivalent            | Description                   |
| ------------ | ------------------------- | ----------------------------- |
| `sm:`        | `@media (width >= 40rem)` | Small screens (640px+)        |
| `md:`        | `@media (width >= 48rem)` | Medium screens (768px+)       |
| `lg:`        | `@media (width >= 64rem)` | Large screens (1024px+)       |
| `xl:`        | `@media (width >= 80rem)` | Extra large screens (1280px+) |
| `2xl:`       | `@media (width >= 96rem)` | 2X large screens (1536px+)    |
| `min-[...]:` | `@media (width >= ...)`   | Custom minimum width          |
| `max-sm:`    | `@media (width < 40rem)`  | Below small (< 640px)         |
| `max-md:`    | `@media (width < 48rem)`  | Below medium (< 768px)        |
| `max-lg:`    | `@media (width < 64rem)`  | Below large (< 1024px)        |
| `max-xl:`    | `@media (width < 80rem)`  | Below XL (< 1280px)           |
| `max-2xl:`   | `@media (width < 96rem)`  | Below 2XL (< 1536px)          |
| `max-[...]:` | `@media (width < ...)`    | Custom maximum width          |

### Container Queries

| Variant       | CSS Equivalent                | Description                    |
| ------------- | ----------------------------- | ------------------------------ |
| `@3xs:`       | `@container (width >= 16rem)` | 3XS container (256px+)         |
| `@2xs:`       | `@container (width >= 18rem)` | 2XS container (288px+)         |
| `@xs:`        | `@container (width >= 20rem)` | XS container (320px+)          |
| `@sm:`        | `@container (width >= 24rem)` | Small container (384px+)       |
| `@md:`        | `@container (width >= 28rem)` | Medium container (448px+)      |
| `@lg:`        | `@container (width >= 32rem)` | Large container (512px+)       |
| `@xl:`        | `@container (width >= 36rem)` | XL container (576px+)          |
| `@2xl:`       | `@container (width >= 42rem)` | 2XL container (672px+)         |
| `@3xl:`       | `@container (width >= 48rem)` | 3XL container (768px+)         |
| `@4xl:`       | `@container (width >= 56rem)` | 4XL container (896px+)         |
| `@5xl:`       | `@container (width >= 64rem)` | 5XL container (1024px+)        |
| `@6xl:`       | `@container (width >= 72rem)` | 6XL container (1152px+)        |
| `@7xl:`       | `@container (width >= 80rem)` | 7XL container (1280px+)        |
| `@min-[...]:` | `@container (width >= ...)`   | Custom minimum container width |
| `@max-3xs:`   | `@container (width < 16rem)`  | Below 3XS (< 256px)            |
| `@max-2xs:`   | `@container (width < 18rem)`  | Below 2XS (< 288px)            |
| `@max-xs:`    | `@container (width < 20rem)`  | Below XS (< 320px)             |
| `@max-sm:`    | `@container (width < 24rem)`  | Below small (< 384px)          |
| `@max-md:`    | `@container (width < 28rem)`  | Below medium (< 448px)         |
| `@max-lg:`    | `@container (width < 32rem)`  | Below large (< 512px)          |
| `@max-xl:`    | `@container (width < 36rem)`  | Below XL (< 576px)             |
| `@max-2xl:`   | `@container (width < 42rem)`  | Below 2XL (< 672px)            |
| `@max-3xl:`   | `@container (width < 48rem)`  | Below 3XL (< 768px)            |
| `@max-4xl:`   | `@container (width < 56rem)`  | Below 4XL (< 896px)            |
| `@max-5xl:`   | `@container (width < 64rem)`  | Below 5XL (< 1024px)           |
| `@max-6xl:`   | `@container (width < 72rem)`  | Below 6XL (< 1152px)           |
| `@max-7xl:`   | `@container (width < 80rem)`  | Below 7XL (< 1280px)           |
| `@max-[...]:` | `@container (width < ...)`    | Custom maximum container width |

### Media & Feature Queries

| Variant               | CSS Equivalent                                   | Description                  |
| --------------------- | ------------------------------------------------ | ---------------------------- |
| `dark:`               | `@media (prefers-color-scheme: dark)`            | Dark color scheme            |
| `motion-safe:`        | `@media (prefers-reduced-motion: no-preference)` | Motion allowed               |
| `motion-reduce:`      | `@media (prefers-reduced-motion: reduce)`        | Reduced motion preferred     |
| `contrast-more:`      | `@media (prefers-contrast: more)`                | High contrast preferred      |
| `contrast-less:`      | `@media (prefers-contrast: less)`                | Low contrast preferred       |
| `forced-colors:`      | `@media (forced-colors: active)`                 | Forced colors mode active    |
| `inverted-colors:`    | `@media (inverted-colors: inverted)`             | Inverted colors              |
| `pointer-fine:`       | `@media (pointer: fine)`                         | Fine pointer (mouse)         |
| `pointer-coarse:`     | `@media (pointer: coarse)`                       | Coarse pointer (touch)       |
| `pointer-none:`       | `@media (pointer: none)`                         | No pointer                   |
| `any-pointer-fine:`   | `@media (any-pointer: fine)`                     | Any fine pointer available   |
| `any-pointer-coarse:` | `@media (any-pointer: coarse)`                   | Any coarse pointer available |
| `any-pointer-none:`   | `@media (any-pointer: none)`                     | No pointer available         |
| `portrait:`           | `@media (orientation: portrait)`                 | Portrait orientation         |
| `landscape:`          | `@media (orientation: landscape)`                | Landscape orientation        |
| `noscript:`           | `@media (scripting: none)`                       | JavaScript disabled          |
| `print:`              | `@media print`                                   | Print media                  |
| `supports-[…]:`       | `@supports (…)`                                  | Feature support query        |

### ARIA Attributes

| Variant          | CSS Equivalent            | Description           |
| ---------------- | ------------------------- | --------------------- |
| `aria-busy:`     | `&[aria-busy="true"]`     | Element is busy       |
| `aria-checked:`  | `&[aria-checked="true"]`  | Element is checked    |
| `aria-disabled:` | `&[aria-disabled="true"]` | Element is disabled   |
| `aria-expanded:` | `&[aria-expanded="true"]` | Element is expanded   |
| `aria-hidden:`   | `&[aria-hidden="true"]`   | Element is hidden     |
| `aria-pressed:`  | `&[aria-pressed="true"]`  | Element is pressed    |
| `aria-readonly:` | `&[aria-readonly="true"]` | Element is read-only  |
| `aria-required:` | `&[aria-required="true"]` | Element is required   |
| `aria-selected:` | `&[aria-selected="true"]` | Element is selected   |
| `aria-[…]:`      | `&[aria-…]`               | Custom ARIA attribute |

### Data Attributes & Directionality

| Variant     | CSS Equivalent                                   | Description           |
| ----------- | ------------------------------------------------ | --------------------- |
| `data-[…]:` | `&[data-…]`                                      | Custom data attribute |
| `rtl:`      | `&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)` | Right-to-left text    |
| `ltr:`      | `&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)` | Left-to-right text    |

### Special States

| Variant     | CSS Equivalent                       | Description                 |
| ----------- | ------------------------------------ | --------------------------- |
| `open:`     | `&:is([open], :popover-open, :open)` | Open state (details/dialog) |
| `starting:` | `@starting-style`                    | Starting style animation    |
