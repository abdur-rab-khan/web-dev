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
    - [Assertion Matchers](#assertion-matchers)
    - [Modifiers](#modifiers)
    - [Asynchronous Matchers](#asynchronous-matchers)
    - [Setup and Teardown](#setup-and-teardown)
      - [Repeating Setup](#repeating-setup)
      - [One-time Setup](#one-time-setup)
    - [Scoping](#scoping)
    - [Mock Functions](#mock-functions)

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

   - The function that can throw an exception needs to be wrapped in another function when passed to `expect`.

     ```javascript
     function sayHello(name) {
       if (name === "error") {
         throw new Error("Invalid name");
       }
       return `Hello, ${name}!`;
     }
     // ❌ Wrong - executes immediately
     expect(sayHello("error")).toThrow();

     // ✅ Correct - passes a function to execute later
     expect(() => sayHello("error")).toThrow();
     // expect() safely calls this function and catches the error
     ```

### Assertion Matchers

1. [`expect.assertions(number)`](examples/src/async.test.js#L62) - Using `assertions` we strictly tell to Jest how many assertions (test cases) we expect to be called during a test. This is useful for ensuring that all expected assertions are executed, especially in asynchronous tests.

   ```javascript
   test("assertions example", () => {
     expect.assertions(2);
     expect(true).toBe(true);
     expect(false).toBe(false);
     expect(1 + 1).toBe(2); // This will cause the test to fail because we only expected 2 assertions.
   });
   ```

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

- We can test asynchronous code using several approaches in Jest including callbacks, promises, and async/await.

1. [**Using Promise**](examples/src/async.test.js#L36) - Return a promise from the test function and use `.then` or `.catch` to handle the result.

   ```javascript
   const fetchData = () => Promise.resolve("peanut butter");

   test("the data is peanut butter", () => {
     return fetchData().then((data) => {
       expect(data).toBe("peanut butter");
     });
   });
   ```

2. [**Using async/await**](examples/src/async.test.js#L48) - Using async/await syntax we can write cleaner asynchronous tests.

   ```javascript
   const fetchData = () => Promise.resolve("peanut butter");

   test("the data is peanut butter", async () => {
     const data = await fetchData();
     expect(data).toBe("peanut butter");
   });
   ```

   - We can also use `.resolves` and `.rejects` with async/await.

     ```javascript
     //   Always use "await" or "return", otherwise it can't be work -> test will complete before resolve/reject happen
     test("Using async/await with resolves", async () => {
       await expect(demoPromise()).resolves.toBe("done");
     });

     test("using async/await with rejects", async () => {
       await expect(demoPromise("reject")).rejects.toBe("rejected");
     });
     ```

3. [**Using Callbacks**](examples/src/async.test.js#L72) - For testing code that uses callbacks, we have to use the `done` callback provided by Jest that tells Jest to wait until the `done` callback is called if `done` never called the test will fail after timeout.

   ```javascript
   const fetchData = (callback) => {
     setTimeout(() => {
       callback("peanut butter");
     }, 100);
   };

   test("the data is peanut butter", (done) => {
     function callback(data) {
       // We have to use try/catch block to catch any assertion errors inside the callback otherwise the test will timeout and fail without giving useful information.
       // assertion fail it will throw error that we can catch it in catch block
       try {
         expect(data).toBe("peanut butter");
         done(); // Call done() to indicate the test is complete
       } catch (error) {
         done(error); // Call done(error) if there is an error
       }
     }

     fetchData(callback);
   });
   ```

   - The default behavior of Jest is that if the they reach the end of the test of their execution that means the test is complete, but when we use `done` callback we need to call it explicitly to indicate that the test is finished.

### Setup and Teardown

- Often in tests, we need to perform some works before and after each test or once before and after all tests. Jest provides several functions to handle setup and teardown.

#### Repeating Setup

- Suppose we have a task that must be done before each test case, such as initializing database, starting a server, or logging a message. We can use the `beforeEach` function to run a setup function before each test in a file.

- [`beforeEach(fn, timeout?)`](./examples/src/setup_teardown.test.js#L17) - Runs a function before each test in the file. The optional `timeout` parameter specifies the maximum time to wait for the setup function to complete.

  ```javascript
  beforeEach(() => {
    console.log("Start Running Tests......");
  });

  test("testing setup teardown", () => {
    expect(2 + 2).toBe(4);
  });
  ```

- Similarly, we can use `afterEach` to run a teardown function after each test in a file.

#### One-time Setup

- If we have a task that needs to be done only once before/after all tests in a file, we can use `beforeAll` and `afterAll`.

- [`beforeAll/all(fn, timeout?)`](./examples/src/setup_teardown.test.js#L33) - Runs a function once before all tests in the file. The optional `timeout` parameter specifies the maximum time to wait for the setup function to complete.

  ```javascript
  beforeAll(() => {
    console.log("Setting up resources before all tests...");
  });

  afterAll(() => {
    console.log("Cleaning up resources after all tests...");
  });

  test("testing one-time setup teardown", () => {
    expect(3 + 3).toBe(6);
  });
  ```

### Scoping

- In Jest, we can limit the scope of setup and teardown functions to specific groups of tests using `describe` blocks.
- [`describe(name, fn)`](./examples/src/scope.test.js#L3) - Creates a block that groups together several related tests. We can nest `describe` blocks to create a hierarchy of test suites.

  ```javascript
  describe("Math operations", () => {
    beforeAll(() => {
      console.log("Setting up Math operations tests...");
    });

    afterAll(() => {
      console.log("Cleaning up Math operations tests...");
    });

    test("addition", () => {
      expect(1 + 1).toBe(2);
    });

    test("subtraction", () => {
      expect(2 - 1).toBe(1);
    });
  });
  ```

### Mock Functions

- Mock functions, let's us to simulate the behavior of real functions in a controlled way. They are useful for isolating the code being tested and for tracking how functions are called.
- [`jest.fn(implementation?)`](./examples/src/mock_function.test.js#L3) - Creates a new mock function. The optional `implementation` parameter allows us to provide a custom implementation for the mock function.

  ```javascript
  const myMock = jest.fn((x) => x + 1);

  test("mock function example", () => {
    expect(myMock(1)).toBe(2);
    expect(myMock).toHaveBeenCalled(); // Check if the mock function was called
    expect(myMock).toHaveBeenCalledWith(1); // Check if it was called with the argument 1
    expect(myMock).toHaveBeenCalledTimes(1); // Check if it was called exactly once

    expect(myMock.mock.calls[0][0]).toBe(1); // Access the first call's first argument
    expect(myMock.mock.results[0].value).toBe(2); // Access the first call's return value
    expect(myMock.mock.calls.length).toBe(1); // Total number of calls
  });
  ```
