# EveryDay Types in TypeScript

- [EveryDay Types in TypeScript](#everyday-types-in-typescript)
  - [Primitives: `number`, `string`, `boolean`](#primitives-number-string-boolean)
    - [Arrays](#arrays)
    - [`any`](#any)
  - [Functions](#functions)
    - [Function Parameters](#function-parameters)
    - [Function Return Types](#function-return-types)
      - [Function Return a `Promise`](#function-return-a-promise)
    - [Anonymous Functions](#anonymous-functions)
  - [Object Types](#object-types)
    - [Optional Properties](#optional-properties)
  - [`Union Type`](#union-type)
    - [Working with `Union Types`](#working-with-union-types)
  - [Type Aliases](#type-aliases)
  - [Interfaces](#interfaces)
    - [Differences between Type Aliases and Interfaces](#differences-between-type-aliases-and-interfaces)
  - [Type Assertions](#type-assertions)
  - [Literal Types](#literal-types)
    - [Literal Inference](#literal-inference)

## Primitives: `number`, `string`, `boolean`

- Javascript has three most common primitive types: `number`, `string`, and `boolean`.
- In TypeScript, we can annotate variables with these types.

  ```ts
  let isDone: boolean = false;
  let decimal: number = 6;
  let color: string = "blue";
  ```

- It's optional to annotate types because TypeScript can infer them from the assigned values.

  ```ts
  let isDone = false; // inferred as boolean
  let decimal = 6;    // inferred as number
  let color = "blue"; // inferred as string

  // If you try to reassign a different type, TypeScript will give an error

  isDone = 42; ❌ // Error: Type 'number' is not assignable to type 'boolean'.
  decimal = "six"; ❌ // Error: Type 'string' is not assignable to type 'number'.
  ```

### Arrays

- To define an array of these types, you can use two syntaxes:

  ```ts
  // Number
  let list: number[] = [1, 2, 3]; // Array of numbers
  let list: Array<number> = [1, 2, 3]; // Generic array type

  // String
  let fruits: string[] = ["apple", "banana", "cherry"]; // Array of strings
  let fruits: Array<string> = ["apple", "banana", "cherry"]; // Generic array type

  // Boolean
  let flags: boolean[] = [true, false, true]; // Array of booleans
  let flags: Array<boolean> = [true, false, true]; // Generic array type
  ```

- Same syntax applies to other types as well.

### `any`

- In TypeScript, the `any` type is a special type that allows you to assign whatever value you want to a variable without any type checking.

  ```ts
  let notSure: any = 4; // Initially a number
  notSure = "maybe a string instead"; // Now a string
  notSure = false; // Now a boolean
  ```

- `noImplicitAny` flag can be enabled in `tsconfig.json` to avoid unintentional `any` types.

  ```json
  {
    "compilerOptions": {
      "noImplicitAny": true
    }
  }
  ```

- When `noImplicitAny` is enabled, TypeScript will raise an error if it cannot infer a type and defaults to `any`.

## Functions

- `Function` in TypeScript primarily refers to the type of both the **input** and **output** values of a function.

### Function Parameters

- You can specify types for function parameters.

  ```ts
  function greet(name: string): string {
    return "Hello, " + name;
  }

  console.log(greet("World")); // "Hello, World"
  ```

- We know about the TypeScript behavior, if we try to call `greet` with a non-string argument, it will raise an error.

  ```ts
  greet(42); ❌ // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
  ```

### Function Return Types

- You can also specify the return type of a function.

  ```ts
  function add(x: number, y: number): number {
    return x + y;
  }

  console.log(add(2, 3)); // 5
  ```

- Much as variable type annotations, return type annotations are optional if TypeScript can infer the return type.

#### Function Return a `Promise`

- If we want to annotate a function that returns a `Promise`, we can do it like this:

  ```ts
  function fetchData(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simulate an async operation
      setTimeout(() => {
        resolve("Data from " + url);
      }, 1000);
    });
  }

  fetchData("https://example.com").then((data) => console.log(data));
  ```

### Anonymous Functions

- Anonymous functions are different from function declarations. They are often used as arguments to other functions or assigned to variables.

  ```ts
  const numbers: number[] = [1, 2, 3];

  // Using an anonymous function with map
  const doubled = numbers.map(function (x: number): number {
    return x * 2;
  });

  console.log(doubled); // [2, 4, 6]
  ```

- This process is called a **_contextual typing_** where TypeScript infers the types of parameters based on the context in which the function is used.

## Object Types

- In TypeScript, the most commonly used type you'll encounter is the `object type`. This refers to JavaScript value with properties.
- To define an object type, we simply list it's properties along with their types.

  ```ts
  // Define an object type with specific properties
  let person: { name: string; age: number } = {
    name: "Alice",
    age: 30,
  };

  console.log(person.name); // "Alice"
  console.log(person.age); // 30

  // Unlike JavaScript, TypeScript will throw an error if you try to access a property that doesn't exist
  console.log(person.address); ❌ // Error: Property 'address' does not exist on type.
  ```

### Optional Properties

- In TypeScript, sometime you may want to define an object type where some properties are optional. You can do this by adding a `?` after the property name.

  ```ts
  // Define an object type with an optional property
  let person: { name: string; age?: number } = {
    name: "Bob",
  };

  console.log(person.name); // "Bob"
  console.log(person.age); // undefined

  person.age = person.age + 1; // ❌ Error: Object is possibly 'undefined'.

  // To fix this, you can use a conditional check
  if (person.age !== undefined) {
    person.age += 1;
  }

  // You can also provide the optional property
  person.age = 25;
  console.log(person.age); // 25
  ```

## `Union Type`

- In TypeScript, a `union type` allows to build a new type that can be one of several types.
- You can define a union type using the `|` (pipe) operator.

  ```ts
  // Define a variable that can be either a string or a number
  let value: string | number;

  value = "Hello"; // valid
  console.log(value); // "Hello"

  value = 42; // valid
  console.log(value); // 42

  value = true; ❌ // Error: Type 'boolean' is not assignable to type 'string | number'.
  ```

### Working with `Union Types`

- It's easy to provide a value to a variable with a union type, but when you want to perform certain operations which is specific to one of the types, you need to do some type checking.
- TypeScript will only allow an operation if it is valid for all types in the union. For example:

  ```ts
  let value: string | number;

  value = "Hello";

  console.log(value.length); // ❌ Error: Property 'length' does not exist on type 'string | number'.

  value = 42;

  console.log(value.toFixed(2)); // ❌ Error: Property 'toFixed' does not exist on type 'string | number'.

  // TO FIX THIS, we can use type narrowing with typeof checks
  if (typeof value === "string") {
    console.log(value.length); // Now it's valid, because TypeScript knows value is a string here
  } else {
    console.log(value.toFixed(2)); // Now it's valid, because TypeScript knows value is a number here
  }
  ```

- This is called **type narrowing**, where TypeScript narrows down the type of a variable within a specific block based on the checks you perform.
- Sometime we won't have to do type narrowing like in `number` and `string` some methods are common like `toString()`, so we can use them directly.

  ```ts
  let value: string | number;

  value = "Hello";
  console.log(value.toString()); // "Hello"

  value = 42;
  console.log(value.toString()); // "42"
  ```

- **`Union types`** appears to have the intersection of those type properties and methods.

## Type Aliases

- In the above examples, we directly annotated types inline. In TypeScript we can create a new name for a type using `type` keyword. This is called a **type alias**.

  ```ts
  // Create a type alias for a union type
  type StringOrNumber = string | number;

  let value: StringOrNumber;

  value = "Hello"; // valid
  console.log(value); // "Hello"

  value = 42; // valid
  console.log(value); // 42

  value = true; ❌ // Error: Type 'boolean' is not assignable to type 'StringOrNumber'.

  // <=================> TYPE ALIAS CAN ALSO BE USED WITH OBJECT TYPES <=================>
  type Point = {
    x: number;
    y: number;
  };

  // Exactly the same as the earlier example
  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }

  printCoord({ x: 100, y: 100 });
  ```

## Interfaces

- An `interface` is another way to name an object type. It is similar to a type alias, but it has some additional capabilities.
- You can define an interface using the `interface` keyword.

  ```ts
  // Define an interface for a Point object
  interface Point {
    x: number;
    y: number;
  }

  // Use the interface to type an object
  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }

  printCoord({ x: 100, y: 100 });
  ```

- It's works similar as type alias for object types, TypeScript only concerns about the structure of the object not the name.

  ```ts
  interface Point {
    x: number;
    y: number;
  }

  // This is valid because the structure matches the Point interface
  const pt = { x: 100, y: 100 };
  printCoord(pt); // valid

  // Second Example
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person): { name: string; age: number } {
    console.log("Hello, " + person.name);
    return person;
  }
  ```

### Differences between Type Aliases and Interfaces

- Both `type` aliases and `interface` can be used to define object types, but there are some differences:
  - **Extending**: Interfaces can be extended using the `extends` keyword, allowing you to create a new interface based on an existing one. Type aliases cannot be extended in the same way.
  - **Merging**: Interfaces with the same name will automatically merge their properties. Type aliases with the same name will cause an error.
  - **Capabilities**: Type aliases can represent more complex types like union types, intersection types, and tuples, while interfaces are primarily used for object shapes.
- All features in `interface` can be done using `type` alias but not all features of `type` alias can be done using `interface`.
- Extra features of `type` alias:

  - Can define union types
  - Can define intersection types
  - Can define tuples

    ```ts
    // Extending an interface
    interface Animal {
      name: string;
    }

    interface Dog extends Animal {
      breed: string;
    }

    // Extending a type via intersections
    type Animal = {
      name: string;
    };

    type Bear = Animal & {
      honey: boolean;
    };

    // Adding new fields to an existing interface
    interface Person {
      name: string;
    }

    interface Person {
      age: number;
    }

    // Adding new fields to an existing type alias ❌
    ```

## Type Assertions

- Sometimes we know about the type of a value more than TypeScript does. In such cases, we can use **type assertions** to tell the compiler about the type of a variable.
- Type assertions are done using the `as` keyword.
- For example, when working with the DOM, TypeScript may not know the exact type of an element returned by `document.getElementById`.

  ```ts
  // Without type assertion
  const myCanvas = document.getElementById("main_canvas");
  // myCanvas is of type HTMLElement | null

  // With type assertion
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  // Now myCanvas is of type HTMLCanvasElement

  // Now we can access properties specific to HTMLCanvasElement
  const context = myCanvas.getContext("2d");
  ```

- We can use `<>` syntax for type assertions, but it is not recommended in `.tsx` files because it conflicts with JSX syntax.

  ```ts
  const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
  ```

- Remainder: Type assertions do not perform any runtime checks or conversions. They are purely a compile-time construct to help the TypeScript compiler understand the type of a variable.
- TypeScript only allow type assertions when it is possible to convert between the types. For example, you cannot assert a `string` to a `number` because they are not compatible.

  ```ts
  let someValue: any = "this is a string";

  // Valid type assertion
  let strLength: number = (someValue as string).length;

  // Invalid type assertion ❌
  let numValue: number = someValue as number; // Error: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other.
  ```

## Literal Types

- In TypeScript, a **literal type** is a type that represents a specific value. You can create literal types using string literals, number literals, or boolean literals.
- For example, you can define a variable that can only hold the string value `"hello"`.

  ```ts
  let greeting: "hello" = "hello"; // valid
  greeting = "hi"; ❌ // Error: Type '"hi"' is not assignable to type '"hello"'.

  // You can also use number literals
  function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }
  ```

- We can also combine with union types

  ```ts
  interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
  configure({ width: 100 });
  configure("auto");
  configure("automatic"); // ❌ Error: Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
  ```

### Literal Inference

- When we initialize a variable with object, TypeScript assume that the properties of the object can be changed later. So it infers a wider type for the variable.
- For Example:

  ```ts
  const obj = { counter: 0 }; // inferred as { counter: number } not { counter: 0 }
  obj.counter = 1; // ✅ valid
  obj.counter = 2; // ✅ valid
  ```

- It's similarly applies to string or any other types.

  ```ts
  declare function handleRequest(url: string, method: "GET" | "POST"): void;

  const req = { url: "https://example.com", method: "GET" }; // TypeScript infers as { url: string; method: string; }

  handleRequest(req.url, req.method); // ❌ Error: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
  ```

- There are two ways to fix this:

  1. Use type assertions to tell TypeScript that `method` is specifically `"GET"`.

     ```ts
     const req = { url: "https://example.com", method: "GET" as "GET" }; // TypeScript infers as { url: string; method: "GET"; }
     handleRequest(req.url, req.method as "GET"); // ✅ valid, req.method is of type "GET"
     ```

  2. We can use `as const` to make the entire object readonly and its properties literal types.

     ```ts
     const req = { url: "https://example.com", method: "GET" } as const; // TypeScript infers as { readonly url: "https://example.com"; readonly method: "GET"; }
     handleRequest(req.url, req.method); // ✅ valid
     ```
