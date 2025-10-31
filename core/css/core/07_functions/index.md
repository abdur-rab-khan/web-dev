# CSS value functions

> CSS value functions are special functions that helps to calculate or manipulate to return a CSS value for a CSS property.

- [CSS value functions](#css-value-functions)
  - [Syntax](#syntax)
  - [Common CSS Value Functions](#common-css-value-functions)
    - [Transform Functions](#transform-functions)
    - [Math Functions](#math-functions)
      - [Basic Arithmetic Functions](#basic-arithmetic-functions)
    - [Filter Functions](#filter-functions)
    - [Gradient functions](#gradient-functions)
    - [References Functions](#references-functions)
    - [Tree Counting functions](#tree-counting-functions)

## Syntax

```css
selector {
  property: function-name(argument1, argument2, ...);
}
```

- Function starts with the function name followed by parentheses.
- Inside the parentheses, you can pass one or more arguments separated by commas.
- Example: `rgb(255, 0, 0)`.

## Common CSS Value Functions

### Transform Functions

- **Transform functions**

| Function               | Description                                                                             | Example                                      | Explanation                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `translate(x, y)`      | Move an element from its current position to new position using **x** and **y** values. | `transform: translate(50px, 100px);`         | Moves the element 50 pixels to the right and 100 pixels down.                           |
| `translateX(x)`        | Move an element horizontally by **x** value.                                            | `transform: translateX(50px);`               | Moves the element 50 pixels to the right.                                               |
| `translateY(y)`        | Move an element vertically by **y** value.                                              | `transform: translateY(100px);`              | Moves the element 100 pixels down.                                                      |
| `translateZ(z)`        | Move an element along the Z-axis by **z** value (3D transformation).                    | `transform: translateZ(30px);`               | Moves the element 30 pixels closer to the viewer.                                       |
| `translate3d(x, y, z)` | Move an element in 3D space using **x**, **y**, and **z** values.                       | `transform: translate3d(50px, 100px, 30px);` | Moves the element 50 pixels right, 100 pixels down, and 30 pixels closer to the viewer. |

- **Rotation functions**

| Function                   | Description                                                                  | Example                    | Explanation                                                                |
| -------------------------- | ---------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| `rotate(angle)`            | Rotates an element around a fixed point on the 2D plane                      | `transform: rotate(90)`    | Rotate element in 90deg                                                    |
| `rotateX()`                | Rotates an element around x-axis, animation may looks like **top to bottom** | `rotateX(180deg)`          | Form like a flip around top to bottom                                      |
| `rotateY()`                | Rotates an element around y-axis, animation may looks like **left to right** | `rotateY(180deg)`          | Animation ma y looks like "right to left"                                  |
| `rotateZ`                  | Rotates an element around a fixed axis in 3D space                           |                            |                                                                            |
| `rotate3D(x, y, z, angle)` | Helps to rotate in a 3D                                                      | `rotate3D(1, 0, 0, 45deg)` | Rotate around x-axis by 45deg, 1 means apply rotation, 0 means no rotation |

- **Scaling functions**

| Function           | Description                                                            | Example                          | Explanation                                                                                          |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `scale(x, y)`      | Scales an element in 2D space using **x** and **y** values.            | `transform: scale(1.5, 2);`      | Scales the element to 1.5 times its width and 2 times its height.                                    |
| `scaleX(x)`        | Scales an element horizontally by **x** value.                         | `transform: scaleX(2);`          | Scales the element to 2 times its width.                                                             |
| `scaleY(y)`        | Scales an element vertically by **y** value.                           | `transform: scaleY(0.5);`        | Scales the element to half its height.                                                               |
| `scaleZ(z)`        | Scales an element along the Z-axis by **z** value (3D transformation). | `transform: scaleZ(1.5);`        | Scales the element to 1.5 times its size along the Z-axis.                                           |
| `scale3d(x, y, z)` | Scales an element in 3D space using **x**, **y**, and **z** values.    | `transform: scale3d(1.5, 2, 1);` | Scales the element to 1.5 times its width, 2 times its height, and 1 time its size along the Z-axis. |

- **Skew functions**

| Function                 | Description                                                  | Example                          | Explanation                                                                    |
| ------------------------ | ------------------------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------ |
| `skew(x-angle, y-angle)` | Skews an element along the X and Y axes by specified angles. | `transform: skew(20deg, 10deg);` | Skews the element 20 degrees along the X-axis and 10 degrees along the Y-axis. |
| `skewX(x-angle)`         | Skews an element along the X-axis by specified angle.        | `transform: skewX(15deg);`       | Skews the element 15 degrees along the X-axis.                                 |
| `skewY(y-angle)`         | Skews an element along the Y-axis by specified angle.        | `transform: skewY(25deg);`       | Skews the element 25 degrees along the Y-axis.                                 |

- **Perspective function**

- It helps to sets the distance between the user and the z=0 plane (the plane on which the 3D elements appear).
- It provides a way to create a sense of depth.
- `perspective(200px);` sets the 200 pixels distance between the user and the z=0 plane.

- Example:

```css
.container {
  perspective: 500px; /* Sets the perspective for 3D transformations */
}
```

### Math Functions

#### Basic Arithmetic Functions

1. `calc()`

   - It allows to perform calculations when specifying CSS property values such as widths, heights, margins, paddings, etc. (that required numerical values).
   - It can be used with **length**, **frequency**, **angle**, **time**, **percentage**, **number** and **color functions** values.
   - `Calc()` supports the following arithmetic operators:

     - Addition: `+`
     - Subtraction: `-`
     - Multiplication: `*`
     - Division: `/`

   - Example:

     ```css
     calc(100% - 80px); /* Calculates that value by subtracting 80px from 100% */

     calc(100px * sin(pi / 2)) /* Calculating value with a CSS function */

     calc(var(--hue) + 180) /* Using CSS variable in calculation */

     lnc(from aquamarine l c calc(50% + 20px) a); /* Using calc() inside color function */
     ```

   - Invalid Usages:

     ```css
     calc(100 / 3)%; /* ❌ Invalid: percentage sign after calc() */
     calc(100% / 3); /* ✅ Valid */

     /* THE "CALC" VALUE MUST BE COMPATIBLE WITH THE CONTEXT IN WHICH IT IS USED */
     margin: calc(1px + 2px); /* ✅ Valid: margin accepts length values */
     margin: calc(1 + 2); /* ❌ Invalid: margin does not accept number values (3) */

     /* "CALC" CAN BE USE TO GET A ROUNDED TO THE NEAREST INTEGER */
     calc(10.5px); /* ✅ Valid: results in 11px */

     /* "CALC" CAN BE USE TO CALCULATE INTRISIC SIZE VALUE (AUTO, FIT-CONTENT) => USE "CALC-SIZE"  */

     ```

2. `calc-size()`

   - It allows to perform calculations specifically for intrinsic size values like `auto`, `fit-content()`, etc.
   - The first argument of `calc-size()` will be following intrinsic size values:

     1. `auto`
     2. `fit-content()`
     3. `min-content`
     4. `max-content`
     5. `content` for container sized using flex-basis

   - Example:

     ```css
     section {
       hight: 2.5rem;
       overflow: hidden;
       transition: height 0.3s ease;
     }

     section:hover,
     selection:focus {
       height: calc-size(max-content, size + 2.5rem);
     }
     ```

     - `size` keyword refers to the size of the max-content of the element.

3. `min()`, `max()`, and `clamp()`

   - These functions help to set minimum, maximum, or clamped values for CSS properties.

   - `min()`: Returns the smallest value among the arguments provided, it calculate in real-time as the viewport or container size changes.
   - In the following example, If the `50%` is less than `300px`, the width will be `50%`, otherwise it will be `300px`.

     ```css
     width: min(50%, 300px); /* The width will be the smaller of 50% or 300px */

     width: calc(
       min(100vw, 600px) - 20px
     ); /* Width will be viewport width or 600px minus 20px */
     ```

   - `max()`: Returns the largest value from a list of comma-separated values.
   - In the following example, If the `10vw` is greater than `200px`, the width will be `10vw`, otherwise it will be `200px`.

     ```css
     width: max(
       200px,
       10vw
     ); /* The width will be the larger of 200px or 10% of viewport width */
     ```

   - `clamp()`: Clamps a value between an upper and lower bound.
   - It takes three arguments:

     1. Minimum value: The lowest (most negative value), this value will choose if preferred value is less than this.
     2. Preferred value: The ideal value it value will be use if it falls between the minimum and maximum values.
     3. Maximum value: The highest value, this value will choose if preferred value is greater than this.

   - It is helpful when we want the preferred value does not have to go larger than **max** and not go smaller than **min**.

   ```css
   font-size: clamp(
     1rem,
     2.5vw,
     2rem
   ); /* Font size will be at least 1rem, at most 2rem, and scale with viewport width */
   ```

### Filter Functions

- `filter` property in CSS allows us to make the element blur, brighten, contrast, it directly apply on the element itself.

1. `blur()`

   - It applies a Gaussian blur to the element itself (like an image, div).
   - The higher the value, the more blurred the element will appear.
   - To make a blur effect on background only, use `backdrop-filter` property instead with `blur()` function.

     ```css
     filter: blur(5px); /* Applies a blur effect with a radius of 5 pixels */
     ```

2. `drop-shadow()`

- It applies a drop shadow effect to the element itself (like an image, div).
- The shadow appears only around the non-transparent parts of the element.
- **Syntax**

  `drop-shadow(offset-x offset-y blur-radius color)`

### Gradient functions

1. `linear-gradient()`

   - It creates a linear gradient background that transitions between two or more colors along a straight line.

- **Syntax**

  ```css
  background: linear-gradient(direction, color1 stop1, color2 stop2, ...);
  ```

- **Direction** (in which the gradient will flow), you can use either:

  - Keywords: `to right`, `to left`, `to top`, `to bottom`, `to top right`, etc.
  - Angles: `45deg`, `90deg`, `180deg`, etc.

- **Color stops** are the colors you want in your gradient and where they should appear.

  - You can specify:

    - Just the color: `red, blue` (colors will be evenly distributed)
    - Color with position: `red 0%, blue 100%` (red starts at 0%, blue ends at 100%)
    - Multiple colors: `red, yellow, green` (gradient transitions smoothly between all colors)

- **Example:**

  ```css
  linear-gradient(red) /* A gradient with single color (solid red) */

  /* A gradient tilted 45 degrees starts from red to blue */
  linear-gradient(45deg, red, blue)

  /* A gradient from top to bottom with three colors */
  linear-gradient(to left top, blue, red)

  /* A gradient from left to right with specified color stops */
  linear-gradient(to right, #ff0000 0%, #00ff00 50%, #0000ff 100%);
  ```

2. `radial-gradient()`

   - It helps to create a gradient which transitions between two or more colors colors that radiate from an origin.
   - It may be circular or elliptical.

- **Syntax**

  ```css
  background: radial-gradient(
    shape size at position,
    color1 stop1,
    color2 stop2,
    ...
  );
  ```

- **Shape**: It defines the shape of the gradient, it can be either:

  - `circle`: The gradient will be circular.
  - `ellipse`: The gradient will be elliptical.

- **Size**: It defines the size of the gradient, it can be:

  - `closest-side`: The gradient will extend to the closest side of the element.
  - `farthest-side`: The gradient will extend to the farthest side of the element.
  - `closest-corner`: The gradient will extend to the closest corner of the element.
  - `farthest-corner`: The gradient will extend to the farthest corner of the element.

  - **Note:** We can also use custom sizes like `100px 50px`.

- **Position**: It defines the center point of the gradient, it can be specified using keywords like:

  - `center`: The gradient will be centered within the element.
  - `top left`, `top right`, `bottom left`, `bottom right`: The gradient will start from the specified corner.
  - Custom positions using length or percentage values like `50% 50%`, `100px 200px`.

- **Color stops**: Similar to `linear-gradient()`, you can specify colors and their positions.

### References Functions

1. `var()`

   - It is special type of function in CSS that is used to insert the value of a CSS variable (custom property `--variable-name`).

   - **Syntax**

     ```css
     var(--variable-name, fallback-value);
     ```

   - `--variable-name`: The name of the CSS variable you want to use.
   - `fallback-value` (optional): A value that will be used if the CSS variable is not defined.

2. `env()`

3. `attr()`

   - `attr()` function is used to retrieve the attribute value of selected HTML element and use it in CSS property.

   - **Syntax**

     ```css
     attr(attribute-name type?,fallback-value?); /* "?" means optional */
     ```

   - We can detect the support of `attr()` function in CSS using `@supports` rule.

   ```css
   @supports (width: attr(data-width px)) {
     .box {
       width: attr(data-width px);
     }
   }
   ```

   - Example:

     ```html
     <div class="box" data-width="200">Content</div>
     ```

     ```css
     .box {
       width: attr(
         data-width px
       ); /* Sets the width based on the data-width attribute */
       height: 100px;
       background-color: lightblue;
     }
     ```

4. `url()`

- The `url()` function is used to include a files, the following are common user files:

  1. **an absolute URL**
  2. **a relative URL**
  3. **a blob URL**
  4. **a data URL**

- **Syntax**

  ```css
  background-image: url("path/to/image.jpg");
  ```

- **Example :**

  ```css
  /* absolute URL */
  background-image: url("https://example.com/image.jpg");

  /* relative URL */
  background-image: url("/images/local-image.png");

  /* data URL */
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");

  /* blob URL */
  background-image: url("blob:https://example.com/550e8400-e29b-41d4-a716-446655440000");
  ```

5. `env()`

   - The `env()` function is used to access environment variables provided by the user agent (browser) or operating system.

   - It is commonly used to retrieve the values of safe area insets on devices with notches or rounded corners.

   - **Syntax**

     ```css
     padding: env(safe-area-inset-top, fallback-value);
     ```

   - **Common ENV variables**

     1. `safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom`, `safe-area-inset-left`: These variables provide the safe distance from the edges of the viewport to avoid notches or rounded corners.
     2. `titlebar-area-x`, `titlebar-area-y`, `titlebar-area-width`, `titlebar-area-height`: These variables provide information about the title bar area of the window.
     3. `viewport-segment-top`, `viewport-segment-right`, `viewport-segment-bottom`, `viewport-segment-left`, `viewport-segment-width`, `viewport-segment-height`: These variables provide information about the segments of the viewport.

### Tree Counting functions

1. `sibling-index()`

   - It return the index of current element among its siblings.
   - The index is one-based, meaning the first sibling has an index of 1.

   - **Syntax**

     ```css
     selector {
       property: sibling-index();
     }
     ```

   - **Example:**

     ```css
     .item {
       animation-delay: calc(0.2s * sibling-index());
     }
     ```

2. `sibling-count()`

   - It returns the total number of sibling elements that share the same parent as the current element.

   - **Syntax**

     ```css
     selector {
       property: sibling-count();
     }
     ```

   - **Example:**

     ```css
     .item {
       width: calc(100% / sibling-count());
     }
     ```
