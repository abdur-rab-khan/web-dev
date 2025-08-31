# Narrowing in TypeScript

> Narrowing is the process of refining the type of a variable within a specific scope. TypeScript uses various techniques to narrow down types, allowing for more precise type checking and better code safety.

- [Narrowing in TypeScript](#narrowing-in-typescript)
  - [Basic Example to Illustrate Narrowing](#basic-example-to-illustrate-narrowing)
  - [`typeof` Type Guards](#typeof-type-guards)
  - [Truthiness Narrowing](#truthiness-narrowing)
  - [Equality narrowing](#equality-narrowing)
    - [The `in` operator narrowing](#the-in-operator-narrowing)
    - [`instanceof` narrowing](#instanceof-narrowing)
    - [Assignments](#assignments)
    - [Using type predicates](#using-type-predicates)
  - [Discriminated unions](#discriminated-unions)
  - [The `never` type](#the-never-type)
    - [Exhaustiveness checking](#exhaustiveness-checking)

## Basic Example to Illustrate Narrowing

- Imaging we have a function that takes a parameters of type `string | number` and we want to perform different operations based on the actual type of the parameter.

  ```ts
  declare function padLeft(value: string, padding: string | number): string {
    throw new Error("Not implemented");
  };
  ```

- Here, if the padding is `number`, we want to number of spaces to the left and prepend them to the value. If the padding is a `string`, we simply prepend it to the value.

  ```ts
  function padLeft(value: string, padding: number | string): string {
    return " ".repeat(padding) + value; // ❌ Error: Argument of type 'string | number' is not assignable to parameter of type 'number'.
  }
  ```

- In the above code, `repeat` method expects a `number` argument, but it got `string | number`. TypeScript raises an error because it cannot guarantee that `padding` is a `number`.
- To fix this, we have to explicitly check the type of `padding` and narrow it down to either `string` or `number`.

  ```ts
  function padLeftFIX(value: string, padding: number | string): string {
    if (typeof padding === "number") {
      return " ".repeat(padding) + value;
    }
    return padding + value;
  }
  ```

- It's looks like a JavaScript code, but under the hood, TypeScript is using the `typeof` check to narrow down the type of `padding` within each branch of the `if` statement.
- In the first branch, TypeScript knows that `padding` is a `number`, so it allows us to call `repeat` without any errors. In the second branch, it knows that `padding` is a `string`, so concatenation works as expected.

## `typeof` Type Guards

- In JavaScript, the `typeof` operator is used to get the basic information about type of a variable. TypeScript leverages this operator to perform type narrowing.

1. `string`
2. `number`
3. `boolean`
4. `symbol`
5. `bigint`
6. `undefined`
7. `object`
8. `function`

- In the below example, we have a function that takes a parameter which can be either `string`, `string[]`, or `null`. We want to print all the strings if it's an array, or just print the string if it's a single string.
- But the following code will raise an error. Because of the fact that in JavaScript, both `array` and `null` are considered as `object` type.
- TypeScript know about the JavaScript behavior and raises an error to prevent potential runtime issues.

  ```ts
  function printAll(strs: string | string[] | null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        // ❌ Error: Because in JavaScript "array" and "null" both are object.
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
  ```

- Because of JavaScript behavior, that consider `array` and `null` both as `object` type, we cannot use `typeof` to narrow down the type to `string[]`.

- To fix this, we use technique called **Truthiness Narrowing**.

## Truthiness Narrowing

- In JavaScript, values like `null`, `undefined`, `0`, `NaN`, and empty strings (`""`) are considered as "falsy" values, while all other values are considered as "truthy".

  ```ts
  function getUserOnlineMessage(numUsersOnline: number) {
    // numUsersOnline could be 0, which is a falsy value otherwise it is a truthy value
    if (numUsersOnline) {
      return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
  }
  ```

- In JavaScript, if any condition is there in `if` statement, it will be coerced (converted) to a boolean value. If the value is "truthy", the block will be executed, otherwise it will be skipped.
- We can check them by using `Boolean` constructor.

  ```ts
  Boolean(0); // false
  Boolean(1); // true
  Boolean(""); // false
  Boolean("hello"); // true
  Boolean(null); // false
  Boolean(undefined); // false
  Boolean([]); // true
  Boolean({}); // true
  ```

- We can take advantage of this JavaScript behavior especially when dealing with values like `null` or `undefined`.

- In the below example, we can use truthiness check to narrow down the type of `strs` to `string[]` by checking if it's truthy.

  ```ts
  function printAllFIX(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      // strs is truthy, so it must be string[]
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      // strs is a string
      console.log(strs);
    }
  }
  ```

## Equality narrowing

- Equality narrowing is another most common way to narrow down types in TypeScript. It works by using `switch` statements or equality checks (`===` or `!==` or `==` `!=` ) to compare a variable against specific values.

  ```ts
  function example(x: string | number, y: string | boolean) {
    if (x === y) {
      // If x === y, which means "x" and "y" both are the string, bcz y: string | boolean if they matched means y is a string and x is also string.
      x.toLocaleLowerCase();

      x.toLowerCase();
    } else {
      console.log(x); // Here x will be a number

      console.log(y); // Here y will be a boolean
    }
  }
  ```

  - In the above example, within the `if` block, TypeScript knows that both `x` and `y` must be of type `string` because they are equal. In the `else` block, it knows that `x` must be a `number` and `y` must be a `boolean` since they are not equal.

- In the below example, we can use equality narrowing to fix the previous `printAll` function without using truthiness check.

  ```ts
  function printAll(strs: string | string[] | null) {
    if (strs !== null) {
      if (typeof strs === "object") {
        for (const s of strs) {
          console.log(s);
        }
      } else if (typeof strs === "string") {
        console.log(strs);
      }
    }
  }
  ```

  - First we check if `strs` is not `null`, which narrows down the type to `string | string[]`. Then we can safely use `typeof` to further narrow it down to either `string` or `string[]`.

- In JavaScript we can also use `looser equality` operators (`==` and `!=`) for equality narrowing, If something == `null` it not just checks for `null` but also checks for `undefined`.

  ```ts
  interface Container {
    value: number | null | undefined;
  }

    function multiplyValue(container: Container, factor: number) {
    if (container.value === null) {
        console.log(container.value); // It will be null
    }

    // If we use looser equality, it just not only check for "null" but also "undefined"
    if (container.value != null) {
        return container.value \* factor;
    }

    // return container.value \* factor; // ❌ Error:
    }
  ```

### The `in` operator narrowing

- In JavaScript, the `in` operator is used to check if an object or prototype chain has a specific property. TypeScript leverages this operator to perform type narrowing based on the presence of properties in objects.

  ```ts
  type Fish = { swim: () => void };
  type Bird = { fly: () => void };

  function move(animal: Fish | Bird) {
    if ("swim" in animal) {
      // Which means animal is a "fish"
      animal.swim();
    } else {
      // Which mean animal is "bird"
      animal.fly();
    }
  }
  ```

  - In the above example, we have two types `Fish` and `Bird`, each with their own unique method. The `move` function takes a parameter of type `Fish | Bird`.
  - By using the `in` operator, we can check if the `swim` property exists in the `animal` object. If it exits, TypeScript narrows down the type of `animal` to `Fish` and allow us to call all method belonging to `Fish`.
  - Otherwise, it narrows down the type to `Bird` and allow us to call all method belonging to `Bird`.

### `instanceof` narrowing

- In JavaScript, the `instanceof` operator is used to check if an object is an instance of a specific class or constructor function. TypeScript leverages this operator to perform type narrowing based on the prototype chain of objects.

  ```ts
  class Dog {
    bark() {
      console.log("Woof!");
    }
  }

  class Cat {
    meow() {
      console.log("Meow!");
    }
  }

  function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
      // animal is a Dog
      animal.bark();
    } else {
      // animal is a Cat
      animal.meow();
    }
  }
  ```

  - In the above example, we have two classes `Dog` and `Cat`, each with their own unique method. The `speak` function takes a parameter of type `Dog | Cat`.
  - By using the `instanceof` operator, we can check if the `animal` object is an instance of the `Dog` class. If it is, TypeScript narrows down the type of `animal` to `Dog` and allow us to call all method belonging to `Dog`.
  - Otherwise, it narrows down the type to `Cat` and allow us to call all method belonging to `Cat`.

### Assignments

- As we know that TypeScript, When we assign a new value to a variable, it will looks at the **right side** of the assignment to determine the type of the variable on the **left side**.

  ```ts
  let x = Math.random() < 0.5 ? 10 : "hello world";
  // x is of type string | number

  x = "goodbye!"; // x is now of type string

  x = 42; // x is now of type number
  ```

- In the above example, we have a variable `x` which is initially assigned a value that can be either `number` or `string`. TypeScript infers the type of `x` as `string | number`.
- When we try to assign a new value to `x`, We have to assign a value that is compatible with the current type of `x`. So we can assign either a `string` or a `number` to `x`.

- However, if we assign a value of a different type, TypeScript will raise an error.

  ```ts
  let x = Math.random() < 0.5 ? 10 : "hello world";
  // x is of type string | number

  x = true; // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
  ```

### Using type predicates

- Type predicates are a powerful feature in TypeScript that allows us to define custom type guards. A type predicate is a special return type for a function that tells TypeScript what the type of a variable is within a specific scope.
- The syntax for a type predicate is `parameterName is Type`, where `parameterName` is the name of the parameter being checked, and `Type` is the type that we want to narrow down to.

  ```ts
  interface Cat {
    name: string;
    meow(): void;
  }

  interface Dog {
    name: string;
    bark(): void;
  }

  function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
  }

  function makeSound(animal: Cat | Dog) {
    if (isCat(animal)) {
      // animal is a Cat
      animal.meow();
    } else {
      // animal is a Dog
      animal.bark();
    }
  }
  ```

  - In the above example, we have two interfaces `Cat` and `Dog`, each with their own unique method. The `isCat` function is a type predicate that checks if the `animal` parameter is of type `Cat`.
  - TypeScript is smart enough to understand that if `isCat` returns `true`, then `animal` must be of type `Cat`. Otherwise, it must be of type `Dog`.

    ```ts
    const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
    const underWater1: Fish[] = zoo.filter(isFish);
    // or, equivalently
    const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

    // The predicate may need repeating for more complex examples
    const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
      if (pet.name === "sharkey") return false;
      return isFish(pet);
    });
    ```

## Discriminated unions

- So of the examples as we seen so far have focused on narrowing single variables. But often we want to narrow for more complex structures, like objects with multiple properties.
- Let's imagine we have a shapes like **circle**, **square**. Circles have a `radius` property and squares have a `sideLength` property. We'll use `kind` field to determine which shape it is.

  ```ts
  interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
  }
  ```

- We use `string literal` types to define the `kind` property, which can be either `"circle"` or `"square"`.
- By using `string literal` types, We can prevent from misspelling

  ```ts
  function handleShape(shape: Shape) {
    if (shape.kind === "rect") {
      // ❌ Error: Because there is not rect in shape ==> kind.
    }
  }
  ```

- Now we write `getArea` function that takes a `Shape` and returns its area.

  ```ts
  function getArea(shape: Shape) {
    return Math.PI * shape.radius ** 2;
  }
  ```

  - In the above code, TypeScript raises an error because `radius` is optional which is either `number` or `undefined`.
  - If we try to narrow down by using `kind` property, TypeScript still raised an error because `radius` is also optional.
  - To fix this, we can use `non-null assertion operator` (`!`) to tell TypeScript that we are sure that `radius` is not `undefined` in this branch.

  ```ts
  function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius! ** 2; // We are sure that radius is not undefined here
    }
  }
  ```

- But using `non-null assertion operator` is not a good practice because it can lead to runtime errors if we are wrong.
- A better approach is to use `discriminated unions` to define our shapes. We can create separate interfaces for each shape and use a common `kind` property to discriminate between them.

  ```ts
  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface Square {
    kind: "square";
    sideLength: number;
  }

  type Shape = Circle | Square;

  function getAreaFIX(shape: ShapeUnion) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    } else {
      return shape.sideLength ** 2;
    }
  }
  ```

  - In the above code, we have defined separate interfaces for `Circle` and `Square`, each with their own properties. The `Shape` type is now a union of these two interfaces.
  - In the above approach, TypeScript simply narrow down the type of `shape` based on the value of `kind` property. TypeScript knows that if `kind` is `"circle"`, then `shape` must be of type `Circle`, and if `kind` is `"square"`, then `shape` must be of type `Square`.
  - But if we use `kind` property as a`string literal union`, after narrowing TypeScript will not be to narrow down the type of `shape` to either `Circle` or `Square`.

## The `never` type

- When narrowing types, we reduce the options of a union to point where there are no options left, no options means `never`.

### Exhaustiveness checking

- Exhaustiveness checking is a technique used in TypeScript to ensure that all possible cases of a union type are handled. This is particularly useful when working with discriminated unions, where each variant of the union has a unique property that can be used to differentiate between them.
- After checking all the possible cases, and return a value in each cases from the `function`. the default case will be of type `never`.

  ```ts
  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    }
  }
  ```

  - In the above code, we narrow down the type of `shape` using a `switch` statement based on the `kind` property. We handle both cases: `"circle"` and `"square"`.
  - So the `default` case will never be reached, and TypeScript infers the type of `shape` in the `default` case to be `never`.

- After adding new shape.

  ```ts
  interface Triangle {
    kind: "triangle";
    sideLength: number;
  }

  type Shape = Circle | Square | Triangle;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    }
  }
  ```
