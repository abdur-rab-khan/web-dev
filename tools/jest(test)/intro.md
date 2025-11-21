# Jest

> **Jest** is a popular JavaScript testing framework by Facebook, designed to ensure correctness of any JavaScript codebase. It is widely used for testing React applications but can be used with other JavaScript frameworks as well.

- [Jest](#jest)
  - [Basics](#basics)
    - [Matchers](#matchers)
      - [Commonly Used Matchers](#commonly-used-matchers)
      - [Numbers Matchers](#numbers-matchers)
      - [String Matchers](#string-matchers)
      - [Array and Iterable Matchers](#array-and-iterable-matchers)
      - [Exception Matchers](#exception-matchers)
    - [Modifiers](#modifiers)
    - [Asynchronous Matchers](#asynchronous-matchers)

## Basics

### Matchers

- Jest `expect` function let's us to test values with different matchers, If the value meets the condition of the matcher, the test passes; otherwise, it fails.

  ```javascript
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
  ```

  - In this example, we are testing if the sum of `1 + 2` equals `3` using the `toBe` matcher.

#### Commonly Used Matchers

1. [`toBe(value)`](./examples/src/matcher.test.js#L3) - checks if the received value is exactly equal to the expected value, using `Object.is`. It does not works with floating point numbers.
2. [`toEqual(value)`](./examples/src/matcher.test.js#L23) - It recursively checks the equality of all properties of an object or array.
3. [`toBeNull()`](./examples/src/matcher.test.js#L43) - Checks if the received value is `null`, commonly used with `.not` to ensure a value is not null.
4. [`toBeTruthy()`](./examples/src/matcher.test.js#L53) - Checks if the received value is truthy, meaning all things are truthy except `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
5. [`toBeFalsy()`](./examples/src/matcher.test.js#L57) - Checks if the received value is falsy, meaning all things are falsy except `true`, non-zero numbers, non-empty strings, objects, and arrays.
6. `toBeNaN()` - Checks if the received value is `NaN`.

#### Numbers Matchers

1. [`toBeGreaterThan(number)`](./examples/src/matcher.test.js#L67) - Checks if the received value is greater than the expected number.
2. [`toBeGreaterThanOrEqual(number)`](./examples/src/matcher.test.js#L71) - Checks if the received value is greater than or equal to the expected number.
3. [`toBeLessThan(number)`](./examples/src/matcher.test.js#L75) - Checks if the received value is less than the expected number.
4. [`toBeLessThanOrEqual(number)`](./examples/src/matcher.test.js#L79) - Checks if the received value is less than or equal to the expected number.
5. [`toBeCloseTo(number, numDigits?)`](./examples/src/matcher.test.js#L83) - Checks if the received value is close to the expected number, useful for floating point comparisons. The optional `numDigits` parameter specifies the number of decimal places to check (default is 2).

#### String Matchers

1. [`toMatch(regexpOrString)`](./examples/src/matcher.test.js#L89) - Checks if the received string matches the expected regular expression or string.

#### Array and Iterable Matchers

1. [`toContain(item)`](./examples/src/matcher.test.js#L99) - Checks if the received array or iterable contains the expected item, it's similar to `Array.prototype.includes`.

#### Exception Matchers

1. [`toThrow(error?)`](./examples/src/matcher.test.js#L109) - Checks if the received function throws an error when called. The optional `error` parameter can be a string, regex, or error class to match against the thrown error.

### Modifiers

- Jest provides modifiers that can be used with matchers to change their behavior.

1. `.not` - Inverts the matcher, so the test passes if the condition is not met.

   ```javascript
   test("adds 1 + 2 to not equal 4", () => {
     expect(1 + 2).not.toBe(4);
   });
   ```

2. `.resolves` - Used with promises, it unwraps the value of a resolved promise before applying the matcher.

   ```javascript
   const fetchData = () => Promise.resolve("peanut butter");

   test("the data is peanut butter", () => {
     return expect(fetchData()).resolves.toBe("peanut butter");
   });
   ```

3. `.rejects` - Used with promises, it unwraps the reason of a rejected promise before applying the matcher.

   ```javascript
   const fetchData = () => Promise.reject("error");

   test("the fetch fails with an error", () => {
     return expect(fetchData()).rejects.toBe("error");
   });
   ```

### Asynchronous Matchers
