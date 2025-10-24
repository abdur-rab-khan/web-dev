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

| Variant    | CSS Equivalent | Description                                 |
| ---------- | -------------- | ------------------------------------------- |
| `visited:` | `&:visited`    | For links that user has already visited     |
| `target:`  | `&:target`     | When URL hash (#) matches this element's ID |

### Child Selectors

| Variant                   | CSS Equivalent            | Description                        | Example                                         |
| ------------------------- | ------------------------- | ---------------------------------- | ----------------------------------------------- |
| `*:`                      | `:is(& > *)`              | All immediate children             | `<div class="*:p-4">`                           |
| `**:`                     | `:is(& *)`                | All nested children (at any level) | `<div class="**:p-4">`                          |
| `first:`                  | `&:first-child`           | First child element                | `<li class="first:mt-0">`                       |
| `last:`                   | `&:last-child`            | Last child element                 | `<li class="last:mb-0">`                        |
| `only:`                   | `&:only-child`            | Element with no siblings           | `<div class="only:bg-red-500">`                 |
| `odd:`                    | `&:nth-child(odd)`        | 1st, 3rd, 5th children, etc.       | `<li class="odd:bg-gray-100">`                  |
| `even:`                   | `&:nth-child(even)`       | 2nd, 4th, 6th children, etc.       | `<li class="even:bg-white">`                    |
| `first-of-type:`          | `&:first-of-type`         | First element of its tag type      | `<li class="first-of-type:mt-0">`               |
| `last-of-type:`           | `&:last-of-type`          | Last element of its tag type       | `<li class="last-of-type:mb-0">`                |
| `only-of-type:`           | `&:only-of-type`          | Only element of its tag type       | `<div class="only-of-type:bg-red-500">`         |
| `nth-[...]:`              | `&:nth-child(...)`        | Target child at specific position  | `<div class="nth-3:underline">`                 |
| `nth-last-[...]:`         | `&:nth-last-child(...)`   | Target child counting from the end | `<div class="nth-last-2:mt-4">`                 |
| `nth-of-type-[...]:`      | `&:nth-of-type(...)`      | Target specific type at position   | `<div class="nth-of-type-2:text-red-500">`      |
| `nth-last-of-type-[...]:` | `&:nth-last-of-type(...)` | Target specific type from the end  | `<div class="nth-last-of-type-2:text-red-500">` |
| `empty:`                  | `&:empty`                 | Element with no children or text   | `<div class="empty:h-4">`                       |

### Relational Selectors

| Variant        | CSS Equivalent               | Description                                       | Example                                     |
| -------------- | ---------------------------- | ------------------------------------------------- | ------------------------------------------- |
| `has-[...]:`   | `&:has(...)`                 | Element contains specific child or element inside | `<label class="has-checked:bg-indigo-50">`  |
| `group-[...]:` | `&:is(:where(.group)... *)`  | Child of an element with 'group' class            | `<svg class="group-has-[a]:block hidden">`  |
| `peer-[...]:`  | `&:is(:where(.peer)... ~ *)` | Next sibling of element with 'peer' class         | `<svg class="peer-has-checked:hidden">`     |
| `in-[...]:`    | `:where(...) &`              | Element is inside a specific parent or context    | `<div class="in-article:text-lg">`          |
| `not-[...]:`   | `&:not(...)`                 | Element that doesn't match the condition          | `<div class="not-disabled:cursor-pointer">` |

### Form Input States

| Variant              | CSS Equivalent             | Description                                             | Example                                                                |
| -------------------- | -------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `disabled:`          | `&:disabled`               | Input that cannot be used                               | `<input class="disabled:opacity-50" disabled />`                       |
| `enabled:`           | `&:enabled`                | Input that can be used                                  | `<input class="enabled:border-blue-500" />`                            |
| `checked:`           | `&:checked`                | Checkbox or radio button that is selected               | `<input type="checkbox" class="checked:border-green-500" />`           |
| `indeterminate:`     | `&:indeterminate`          | Checkbox in mixed state (neither checked nor unchecked) | `<input type="checkbox" class="indeterminate:border-yellow-500" />`    |
| `default:`           | `&:default`                | Default selected option in a form                       | `<option class="default:bg-gray-200" selected>Choose...</option>`      |
| `required:`          | `&:required`               | Input that must be filled out                           | `<input class="required:border-red-500" required />`                   |
| `optional:`          | `&:optional`               | Input that can be left empty                            | `<input class="optional:border-green-500" />`                          |
| `read-only:`         | `&:read-only`              | Input that can be seen but not changed                  | `<input class="read-only:bg-gray-100" readonly />`                     |
| `placeholder-shown:` | `&:placeholder-shown`      | Input showing placeholder text (not yet filled)         | `<input class="placeholder-shown:text-gray-400" placeholder="Name" />` |
| `autofill:`          | `&:autofill`               | Input automatically filled by browser                   | `<input class="autofill:bg-yellow-100" />`                             |
| `inert:`             | `&:is([inert], [inert] *)` | Element that cannot be interacted with                  | `<div class="inert:opacity-50" inert>...</div>`                        |
| `details-content:`   | `&:details-content`        | Content inside a details/summary element                | `<div class="details-content:p-4">...</div>`                           |

### Form Validation

| Variant         | CSS Equivalent   | Description                              |
| --------------- | ---------------- | ---------------------------------------- |
| `valid:`        | `&:valid`        | Input with correct/valid data            |
| `invalid:`      | `&:invalid`      | Input with incorrect/invalid data        |
| `user-valid:`   | `&:user-valid`   | Input validated after user interaction   |
| `user-invalid:` | `&:user-invalid` | Input invalidated after user interaction |
| `in-range:`     | `&:in-range`     | Number input within min/max range        |
| `out-of-range:` | `&:out-of-range` | Number input outside min/max range       |

### Pseudo-elements

| Variant         | CSS Equivalent            | Description                          |
| --------------- | ------------------------- | ------------------------------------ |
| `before:`       | `&::before`               | Insert content before element        |
| `after:`        | `&::after`                | Insert content after element         |
| `first-letter:` | `&::first-letter`         | Style the first letter               |
| `first-line:`   | `&::first-line`           | Style the first line                 |
| `marker:`       | `&::marker, & *::marker`  | Style list bullets or numbers        |
| `selection:`    | `&::selection`            | Style highlighted/selected text      |
| `file:`         | `&::file-selector-button` | Style the "Choose File" button       |
| `backdrop:`     | `&::backdrop`             | Style background behind modal/dialog |
| `placeholder:`  | `&::placeholder`          | Style placeholder text in inputs     |

### Responsive (Breakpoints)

| Variant      | CSS Equivalent            | Description                         |
| ------------ | ------------------------- | ----------------------------------- |
| `sm:`        | `@media (width >= 40rem)` | Small screens (640px and up)        |
| `md:`        | `@media (width >= 48rem)` | Medium screens (768px and up)       |
| `lg:`        | `@media (width >= 64rem)` | Large screens (1024px and up)       |
| `xl:`        | `@media (width >= 80rem)` | Extra large screens (1280px and up) |
| `2xl:`       | `@media (width >= 96rem)` | 2X large screens (1536px and up)    |
| `min-[...]:` | `@media (width >= ...)`   | Custom minimum screen width         |
| `max-sm:`    | `@media (width < 40rem)`  | Smaller than 640px                  |
| `max-md:`    | `@media (width < 48rem)`  | Smaller than 768px                  |
| `max-lg:`    | `@media (width < 64rem)`  | Smaller than 1024px                 |
| `max-xl:`    | `@media (width < 80rem)`  | Smaller than 1280px                 |
| `max-2xl:`   | `@media (width < 96rem)`  | Smaller than 1536px                 |
| `max-[...]:` | `@media (width < ...)`    | Custom maximum screen width         |

### Container Queries

| Variant       | CSS Equivalent                | Description                   |
| ------------- | ----------------------------- | ----------------------------- |
| `@3xs:`       | `@container (width >= 16rem)` | Container 256px and larger    |
| `@2xs:`       | `@container (width >= 18rem)` | Container 288px and larger    |
| `@xs:`        | `@container (width >= 20rem)` | Container 320px and larger    |
| `@sm:`        | `@container (width >= 24rem)` | Container 384px and larger    |
| `@md:`        | `@container (width >= 28rem)` | Container 448px and larger    |
| `@lg:`        | `@container (width >= 32rem)` | Container 512px and larger    |
| `@xl:`        | `@container (width >= 36rem)` | Container 576px and larger    |
| `@2xl:`       | `@container (width >= 42rem)` | Container 672px and larger    |
| `@3xl:`       | `@container (width >= 48rem)` | Container 768px and larger    |
| `@4xl:`       | `@container (width >= 56rem)` | Container 896px and larger    |
| `@5xl:`       | `@container (width >= 64rem)` | Container 1024px and larger   |
| `@6xl:`       | `@container (width >= 72rem)` | Container 1152px and larger   |
| `@7xl:`       | `@container (width >= 80rem)` | Container 1280px and larger   |
| `@min-[...]:` | `@container (width >= ...)`   | Custom minimum container size |
| `@max-3xs:`   | `@container (width < 16rem)`  | Container smaller than 256px  |
| `@max-2xs:`   | `@container (width < 18rem)`  | Container smaller than 288px  |
| `@max-xs:`    | `@container (width < 20rem)`  | Container smaller than 320px  |
| `@max-sm:`    | `@container (width < 24rem)`  | Container smaller than 384px  |
| `@max-md:`    | `@container (width < 28rem)`  | Container smaller than 448px  |
| `@max-lg:`    | `@container (width < 32rem)`  | Container smaller than 512px  |
| `@max-xl:`    | `@container (width < 36rem)`  | Container smaller than 576px  |
| `@max-2xl:`   | `@container (width < 42rem)`  | Container smaller than 672px  |
| `@max-3xl:`   | `@container (width < 48rem)`  | Container smaller than 768px  |
| `@max-4xl:`   | `@container (width < 56rem)`  | Container smaller than 896px  |
| `@max-5xl:`   | `@container (width < 64rem)`  | Container smaller than 1024px |
| `@max-6xl:`   | `@container (width < 72rem)`  | Container smaller than 1152px |
| `@max-7xl:`   | `@container (width < 80rem)`  | Container smaller than 1280px |
| `@max-[...]:` | `@container (width < ...)`    | Custom maximum container size |

### Media & Feature Queries

| Variant               | CSS Equivalent                                   | Description                                        |
| --------------------- | ------------------------------------------------ | -------------------------------------------------- |
| `dark:`               | `@media (prefers-color-scheme: dark)`            | User prefers dark mode                             |
| `motion-safe:`        | `@media (prefers-reduced-motion: no-preference)` | User is okay with animations                       |
| `motion-reduce:`      | `@media (prefers-reduced-motion: reduce)`        | User prefers less animation                        |
| `contrast-more:`      | `@media (prefers-contrast: more)`                | User prefers higher contrast                       |
| `contrast-less:`      | `@media (prefers-contrast: less)`                | User prefers lower contrast                        |
| `forced-colors:`      | `@media (forced-colors: active)`                 | System is using forced colors (accessibility mode) |
| `inverted-colors:`    | `@media (inverted-colors: inverted)`             | System colors are inverted                         |
| `pointer-fine:`       | `@media (pointer: fine)`                         | User has a mouse or precise pointer                |
| `pointer-coarse:`     | `@media (pointer: coarse)`                       | User has touchscreen                               |
| `pointer-none:`       | `@media (pointer: none)`                         | No pointing device available                       |
| `any-pointer-fine:`   | `@media (any-pointer: fine)`                     | At least one precise pointer available (mouse)     |
| `any-pointer-coarse:` | `@media (any-pointer: coarse)`                   | At least one touch pointer available               |
| `any-pointer-none:`   | `@media (any-pointer: none)`                     | No pointing device at all                          |
| `portrait:`           | `@media (orientation: portrait)`                 | Screen is taller than wide (phone held upright)    |
| `landscape:`          | `@media (orientation: landscape)`                | Screen is wider than tall (phone held sideways)    |
| `noscript:`           | `@media (scripting: none)`                       | JavaScript is turned off                           |
| `print:`              | `@media print`                                   | Page is being printed                              |
| `supports-[…]:`       | `@supports (…)`                                  | Browser supports a specific CSS feature            |

### ARIA Attributes

| Variant          | CSS Equivalent            | Description                              |
| ---------------- | ------------------------- | ---------------------------------------- |
| `aria-busy:`     | `&[aria-busy="true"]`     | Element is loading or processing         |
| `aria-checked:`  | `&[aria-checked="true"]`  | Element is checked (accessibility)       |
| `aria-disabled:` | `&[aria-disabled="true"]` | Element is disabled (accessibility)      |
| `aria-expanded:` | `&[aria-expanded="true"]` | Element is expanded/open (like dropdown) |
| `aria-hidden:`   | `&[aria-hidden="true"]`   | Element is hidden from screen readers    |
| `aria-pressed:`  | `&[aria-pressed="true"]`  | Button is in pressed state               |
| `aria-readonly:` | `&[aria-readonly="true"]` | Element is read-only (accessibility)     |
| `aria-required:` | `&[aria-required="true"]` | Element is required (accessibility)      |
| `aria-selected:` | `&[aria-selected="true"]` | Element is selected (like in a list)     |
| `aria-[…]:`      | `&[aria-…]`               | Custom accessibility attribute           |

### Data Attributes & Directionality

| Variant     | CSS Equivalent                                   | Description                                    |
| ----------- | ------------------------------------------------ | ---------------------------------------------- |
| `data-[…]:` | `&[data-…]`                                      | Custom data attribute (like data-state="open") |
| `rtl:`      | `&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)` | Text flows right-to-left (Arabic, Hebrew)      |
| `ltr:`      | `&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)` | Text flows left-to-right (English, Spanish)    |

### Special States

| Variant     | CSS Equivalent                       | Description                                               |
| ----------- | ------------------------------------ | --------------------------------------------------------- |
| `open:`     | `&:is([open], :popover-open, :open)` | Element is open (details, dialog, popover)                |
| `starting:` | `@starting-style`                    | Initial style for animations (when element first appears) |
