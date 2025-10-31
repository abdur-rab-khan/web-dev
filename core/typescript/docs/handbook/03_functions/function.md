# More on Functions in TypeScript

> In terms of Functions in TypeScript, it is similar to JavaScript, but with added type annotations and some additional features.

- [More on Functions in TypeScript](#more-on-functions-in-typescript)
  - [Function Types](#function-types)
  - [Call Signatures](#call-signatures)
  - [Generic Functions](#generic-functions)
    - [Inference](#inference)
    - [Constraints](#constraints)
    - [Specifying Type Arguments](#specifying-type-arguments)
    - [Guidelines for Writing Good Generic Functions](#guidelines-for-writing-good-generic-functions)
      - [1. Push Type Parameters Down](#1-push-type-parameters-down)
      - [2. Use fewer Type Parameters](#2-use-fewer-type-parameters)
      - [3. Type Parameters should appear twice](#3-type-parameters-should-appear-twice)
  - [Optional Parameters](#optional-parameters)
    - [Other Types to Know About](#other-types-to-know-about)
      - [1. `void`](#1-void)
      - [2. `unknown`](#2-unknown)
      - [3. `never`](#3-never)
      - [4. `this` types](#4-this-types)
      - [5. `Function`](#5-function)
  - [Rest Parameters and Arguments](#rest-parameters-and-arguments)
    - [Rest Parameters](#rest-parameters)
  - [Rest Arguments](#rest-arguments)

## Function Types

- Function types can be defined using `type aliases`, `interfaces`, or inline type annotations.

```typescript
function greet(fn: (a: string) => void) {
  fn("Hello, World!");
}

function printToConsole(s: string) {
  console.log(s);
}

greet(printToConsole);

// <=======================> DEFINE TYPE USING TYPE ALIAS <=======================>
type GreetFunction = (a: string) => void;

function greet2(fn: GreetFunction) {
  fn("Hello, World!");
}

greet2(printToConsole);
```

- `(a : string) => void` describes a function type that takes a single `string` argument and does not return any thing (`void`).

## Call Signatures

- Functions in JavaScript can have properties besides being callable.
- Function type expressions don't support property declarations.
- To describe callable objects with properties, use call signatures in object types.

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = "This function checks if a number is greater than 3";
doSomething(myFunc);
```

- In the example above, `DescribableFunction` is an object type with a `description` property and a call signature that takes a `number` and returns a `boolean`.
- `myFunc` is a function that matches the `DescribableFunction` type, allowing it to be passed to `doSomething`.

## Generic Functions

- In `TypeScript`, generic functions are refers to functions that can work with multiple types while providing type safety.
- `Generics` are useful there the function are related to type of input parameters and return values.

```typescript
function firstElement(arr: any[]) {
  return arr[0];
}
```

- It works fine but, but it doesn't provide any type safety because it uses `any`. It can improve using generics.

```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Example usage:
const s = firstElement(["a", "b", "c"]); // Type is string | undefined
const n = firstElement([1, 2, 3]); // Type is number | undefined
const u = firstElement([]); // Type is undefined
```

- By using `<T>`, we created a link between the input type and the output type.
- Now, if we call `firstElement` with an `string array`, TypeScript knows the return type will be `string | undefined`.
- One more thing we notice, we didn't specify the type argument `<string>` or `<number>`, TypeScript inferred it based on the argument we passed. But we can also explicitly specify the type `firstElement<string>(["a", "b", "c"])`.

### Inference

- TypeScript can often infer the type arguments for generic functions based on the types of the arguments passed to them.

```typescript
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const ex1 = map(["1", "2", "3"], (n) => n);
// We pass "Input" generic to "arr: Input[]" -- Passing in the place of arr as string[] -- Input[] == string[]
// Pass function that take string -- Input and return Output -- string

const ex2 = map(["1", "2", "3"], (n) => parseInt(n));
// We pass "Input" generic to "arr: Input[]" -- Passing in the place of arr as string[] -- Input[] == string[]
// Passing function that take string -- and the function will returning parseInt() -- Output (number) -- return will be Output[] -- number[]
```

- In the `map` function, TypeScript infers the types of `Input` and `Output` based on the arguments provided when calling the function.
- In `ex1`, `Input` is inferred as `string` and `Output` is also inferred as `string`.
  - `Output` is inferred as `string` because the arrow function `(n) => n` returns a `string`.
- In `ex2`, `Input` is inferred as `string` and `Output` is inferred as `number` because `parseInt` returns a number.
  - `Output` is inferred as `number` because the arrow function `(n) => parseInt(n)` returns a `number`.

### Constraints

- In TypeScript, sometime we want to make function that can work on any kind of type, but something we want to restrict the kinds of types that can be used.
- We can achieve this using `constraints` on generics.

```typescript
function longest<T>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}
```

- The above code will give an error because `T` could be any type, and not all types have a `length` property.
- To fix this, we can add a constraint to `T` to ensure it has a `length` property.

```typescript
const longest = <T extends { length: number }>(a: T, b: T) => {
  if (a.length >= b.length) {
    return a;
  }
  return b;
};

const longestArray = longest([1, 2, 3], [1, 2]);
const longestString = longest("Abdur Rab", "Khan");
// const longestNumber = longest(10, 100); ❌ Wrong: Because number does not have length property
```

- In this example, `a` and `b` must be a value that has a `length` property (like arrays or strings).
- We can also use `keyof` operator to create constraints based on the keys of an object type.

```typescript
function get<T, K extends keyof T>(obj: T, k: K): T[K] | undefined {
  return obj[k] ?? undefined;
}
const person = { name: "Alice", age: 30 };
const personName = get(person, "name"); // Type is string | undefined
const personAge = get(person, "age"); // Type is number | undefined
// const personAddress = get(person, "address"); ❌ Wrong: Because "address" is not a key of person
```

### Specifying Type Arguments

- TypeScript can often infer the type arguments for generic functions, but sometimes you may want to specify them explicitly.

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], [4, 5, 6]); // It workings properly [1, 2, 3, 4, 5, 6]
// const arr = combine([1, 2, 3], ["Hello"]); ❌ It fail because typescript infer "Type" as number, so it want a: number[], b:number[]. But b is string[] that's why we have to explicity define type.

const arr2 = combine<number | string>([1, 2, 3, 4], ["Hello"]); // [1, 2, 3, 4, "Hello"]
```

### Guidelines for Writing Good Generic Functions

- Writing generic functions is fun, but it can also be tricky to get right.
- Having too many type parameters can make your code hard to read and understand.
- Here are some guidelines to help you write better generic functions:

#### 1. Push Type Parameters Down

- Try to make your type parameters as specific as possible.

```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function firstElementBad<T extends any[]>(arr: T): T[0] | undefined {
  return arr[0];
}

// ✅ Good
const s = firstElement(["a", "b", "c"]); // Type is string | undefined

// ❌ Bad
const sBad = firstElementBad(["a", "b", "c"]); // Type as any | undefined
```

- Rule: When possible, use the type parameter in a way that it can be inferred from the arguments passed to the function. not by constraints on the type parameter itself.

#### 2. Use fewer Type Parameters

- Here's an example of a functions.

```typescript
function filterGood<T>(arr: T[], func: (arg: T) => boolean): T[] {
  return arr.filter(func);
}

function filterBad<T, F extends (arg: T) => boolean>(arr: T[], func: F): T[] {
  return arr.filter(func);
}
```

- In the `filterBad` we have two type parameters `T` and `F`, but we can simplify it to just one type parameter `T` in `filterGood`.
- Rule: Avoid introducing unnecessary type parameters. If a type parameter can be inferred from another type parameter, consider removing it.

#### 3. Type Parameters should appear twice

- Sometimes we format that function does not need to be generic.

```typescript
// ❌ Bad
function greet<T extends string>(name: T): string {
  return `Hello, ${name}!`;
}

// ✅ Good
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

- **Rule:** If a type parameter appears only once in a function signature, consider whether the function really needs to be generic.

## Optional Parameters

- In TypeScript, you can define optional parameters in functions using the `?` symbol after the parameter name, or by providing a default value.

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

let result1 = buildName("Bob"); // works correctly now
let result2 = buildName("Bob", "Adams"); // ah, just right

function buildNameWithDefault(firstName: string, lastName = "Smith"): string {
  return `${firstName} ${lastName}`;
}

let result3 = buildNameWithDefault("Bob"); // works correctly now, lastName defaults to "Smith"
let result4 = buildNameWithDefault("Bob", "Adams"); // ah, just right
```

- In without optional parameter, If you provide `lastName`. `TypeScript` will automatically infer the type of `lastName` as `string | undefined`.

### Other Types to Know About

- There are some additional types that are useful when working with functions in TypeScript:

#### 1. `void`

- The `void` type represents the absence of a value. It is commonly used to indicate that a function does not return a value.

```typescript
function noop(): void {
  console.log("This function returns nothing.");
}
```

- In JavaScript, if a function does not return any value then it return `undefined` by default.
- However, `void` and `undefined` are not the same in TypeScript.

#### 2. `unknown`

- The `unknown` type represents any value, but unlike `any`, it forces you to perform type checks before performing operations on it.

```typescript
// ❌ BAD
function f1(a: any) {
  a.toFixed(); // ✅ No error
}

// ✅ GOOD
function f2(a: unknown) {
  a.toFixed(); // ❌ Error: Object is of type 'unknown'.

  // We have to perform type checking before using 'a'
  if (typeof a === "number") {
    a.toFixed(); // ✅ No error
  }
}
```

#### 3. `never`

- The `never` type represents values that never occur. It is often used to indicate that a function will never return (e.g., it always throws an error or has an infinite loop).
- `never` also appears in union types when TypeScript determines that a certain code path is impossible.

```typescript
// Example 1.
function error(message: string): never {
  throw new Error(message);
}

// Example 2.
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something with string
  } else if (typeof x === "number") {
    // do something with number
  } else {
    x; // Type is 'never' here because all possible types have been handled
  }
}
```

#### 4. `this` types

- In TypeScript, you can specify the type of `this` in functions to ensure that it refers to the correct type.

```typescript
interface User {
  name: string;
  age: number;
  greet(this: User): string;
}

const user: User = {
  name: "Alice",
  age: 30,
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  },
};

console.log(user.greet()); // "Hello, my name is Alice and I am 30 years old."
```

#### 5. `Function`

- The `Function` type represents any function. It describe all properties and methods of functions like `call`, `apply`, and `bind`.
- However, using `Function` is not recommended because it does not provide type safety for the function's parameters and return type.

```typescript
let myFunc: Function;

myFunc = function (a: number, b: number): number {
  return a + b;
};
```

## Rest Parameters and Arguments

### Rest Parameters

- The `rest parameters` syntax allows indefinite number of arguments as an array.
- The `rest parameters` appears at the end of the function parameter list and is prefixed with `...`.

```typescript
function multiply(factor: number, ...numbers: number[]): number[] {
  return numbers.map((n) => n * factor);
}
const result = multiply(2, 1, 2, 3); // [2, 4, 6]
```

## Rest Arguments

- The `rest arguments` syntax allows you to pass an indefinite number of arguments to a function.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

const num = [1, 2, 3, 4];
const total = sum(...num); // 10
```

- Note that in general, TypeScript does not assume that arrays are immutable. So, if you have a function that takes a rest parameter, and you pass an array to it, TypeScript will not assume that the array is immutable. If you want to ensure that the array is treated as immutable, you can use a tuple type or `as const` assertion.

```typescript
function logStrings(...strings: readonly string[]) {
  strings.forEach((s) => console.log(s));
}

const arr = ["a", "b", "c"];
logStrings(...arr); // OK

const tuple = ["a", "b", "c"] as const;
logStrings(...tuple); // OK

const mutableArr: string[] = ["a", "b", "c"];
logStrings(...mutableArr); // Error: Argument of type 'string[]' is not assignable to parameter of type 'readonly string[]'.
```
