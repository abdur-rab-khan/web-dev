# Object Types in TypeScript

> In JavaScript the fundamental way to group data is using objects. In TypeScript we represent those through **_object types_**.

- [Object Types in TypeScript](#object-types-in-typescript)
  - [Object Types](#object-types)
  - [Property Modifiers](#property-modifiers)
    - [1. Optional Properties](#1-optional-properties)
    - [2. Readonly Properties](#2-readonly-properties)
    - [3. Index Signatures](#3-index-signatures)
  - [Excess Property Checks](#excess-property-checks)
  - [Extending Types](#extending-types)
  - [Intersection Types](#intersection-types)
  - [Generic Object Types](#generic-object-types)
    - [Generic `Array` Types](#generic-array-types)
    - [Generic `ReadOnlyArray` Types](#generic-readonlyarray-types)
    - [Tuple Types](#tuple-types)
    - [`ReadOnly` Tuple Types](#readonly-tuple-types)

## Object Types

- In TypeScript, we represent objects using **_object types_**.

```typescript
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

- Or using an interface

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

- Or using a type alias

```typescript
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

## Property Modifiers

- Each property in an object type can be marked as either **_required_**, **_optional_**, **_readonly_**, **_indexable_**.
- By default, properties are **_required_**.

### 1. Optional Properties

- In such cases where we want to describe that the shape of an object may have some properties that are not necessarily present, we can use **_optional properties_**.
- We can do this by adding a `?` after the property name.

```typescript
interface Person {
  firstName: string;
  lastName?: string; // lastName is optional
  age: number;
  address?: string; // address is optional
}

function greet(person: Person) {
  console.log("Hello " + person.firstName);

  //   Always check for optional properties before using them
  if (person.lastName) {
    console.log("Your last name is " + person.lastName);
  }

  // We can also use nullish coalescing operator to provide a default value
  console.log("Your address is " + (person.address ?? "not provided"));
}
```

### 2. Readonly Properties

- We can use the `readonly` modifier to mark properties as **_readonly_**.
- This means that once the object is created, the property cannot be changed.
- `readonly` modifier does not mean the value itself is immutable, it just means the property itself can't be re-written to.

```typescript
interface Person {
  readonly id: number; // id is readonly
  firstName: string;
  lastName?: string; // lastName is optional
  age: number;
}

let person: Person = {
  id: 1,
  firstName: "John",
  age: 30,
};

person.firstName = "Jane"; // OK
person.id = 2; ❌ // Error: Cannot assign to 'id' because it is a read-only property.
```

- Using the `readonly` modifier doesn't neccersarily mean the value itself is immutable.
- In other words, that its internal state can't be changed. It's just mean the property itself can't be re-written to.

```typescript
interface Home {
  readonly residents: {
    name: string;
    age: number;
  };
}

function visitForBirthday(home: Home) {
  // We can't re-assign the residents property
  // home.residents = {name:"Jane",age:30} ❌ // Error: Cannot assign to 'residents' because it is a read-only property.

  // But we can change the internal state of the residents object
  home.residents.age += 1; // OK
}

let myHome: Home = {
  residents: {
    name: "John",
    age: 30,
  },
};

visitForBirthday(myHome);
console.log(myHome.residents.age); // 31
```

### 3. Index Signatures

- In some cases, we may not know all the property names an object will have ahead of time, but we do know the shape of the values.
- In such cases, we can use **_index signatures_** to describe the types of properties that are not known ahead of time.
- There are only three types that can be used as index signatures: `string`, `number`, and `symbol`, `template string` and `union of literals`.

```typescript
interface StringArray {
  [index: number]: string; // index signature
}

let myArray: StringArray = {
  0: "Hello",
  1: "World",
};

console.log(myArray[0]); // Hello
console.log(myArray[1]); // World
```

- String index signatures are powerful way to describe object patterns, they also enforce that all properties of the object conform to the specified type.

```typescript
interface StringDictionary {
  [key: string]: number; // index signature
  length: number; // ✅ OK, length is a number
  // name: string; ❌ Error: Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

- In the above example, Error happen because of the `name` property is of type `string`, which is not assignable to the index signature type `number`.
- Which mean that if we use **`[key: string]: number`**, all properties of the object must be of type `number`.

```typescript
interface NumberDictionary {
  [key: string]: number; // index signature
  length: number; // ✅ OK, length is a number
  // name: string; ❌ Error: Property 'name' of type 'string' is not assignable to string index type 'number'.
}

// FIX
interface FlexibleNumberDictionary {
  [key: string]: number | string; // index signature
  length: number; // ✅ OK, length is a number
  name: string; // ✅ OK, name is a string
}
```

- In the above example, we fixed the error by changing the index signature to `number | string`, which allow both `number` and `string` types for the properties of the object.

## Excess Property Checks

- In TypeScript, how and where object is assigned matters a type system can behave differently based on that.
- One of the key example is **_excess property checks_**, which validate the object more thoroughly when the object is assigned directly to a variable or passed as an argument to a function.

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color ?? "white",
    area: (config.width ?? 1) ** 2,
  };
}

let mySquare = createSquare({ colour: "red", width: 100 }); // ❌ Error: Object literal may only specify known properties, and 'colour' does not exist in type 'SquareConfig'.
```

- In the above example, we have an interface `SquareConfig` with two optional properties: `color` and `width`.
- But the problem is why `colour` property is not allowed even both `color` and `width` are optional?
  - This is because of **_excess property checks_**.
  - It's a special check that TypeScript performs when an object literal is assigned to a variable or passed as an argument to a function.
  - It ensures that the object literal only contains properties that are defined in the target type. Otherwise, it raises an error.
  - In the above example, `colour` is not defined in the `SquareConfig` interface, so TypeScript raises an error.

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // ✅ OK
```

- To manage this, we can use a type assertion to tell TypeScript to treat the object as a `SquareConfig`.
- But there are better ways to handle this using index signatures or by assigning the object to a variable first.

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // index signature
}

let mySquare = createSquare({ colour: "red", width: 100 }); // ✅ OK
```

- In the above example, we added an index signature to the `SquareConfig` interface, which allows any additional properties with any type.

## Extending Types

- In TypeScript, we can extend type using the `extends` keyword.
- This allows us to create a new type that inherits the properties of an existing type.

  ```typescript
  interface Shape {
    color: string;
  }

  interface Square extends Shape {
    sideLength: number;
  }

  let square: Square = {
    color: "blue",
    sideLength: 10,
  };
  ```

- The `extends` keyword allow us to copy all properties from the `Shape` interface to the `Square` interface.
- We can also extend multiple types using the `&` operator.

```typescript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {}

let square: Square = {
  color: "blue",
  penWidth: 5,
};

console.log(square);
```

- In the above example, the `Square` interface extends both the `Shape` and `PenStroke` interfaces, inheriting their properties.

## Intersection Types

- In TypeScript, we can create a new type by combining multiple types using the `&` operator. Which is called **_intersection types_**.

  ```typescript
  interface Shape {
    color: string;
  }

  interface PenStroke {
    penWidth: number;
  }

  type Square = Shape & PenStroke;

  let square: Square = {
    color: "blue",
    penWidth: 5,
  };
  console.log(square);
  ```

## Generic Object Types

- As we know, generic provide a way to create reusable components. By using generics, we can create a component that can work with any data type.

- Let's see the example we does not use generics.

```typescript
interface Box {
  content: any;
}

const box: Box = { content: 1 };

// "any" type is not safe, that can lead to accidental runtime errors
// box.content.toLowerCase(); ✔️ Does not causing any error.

// "any" type is not safe, that can lead to accidental runtime errors
interface SafeBox {
  content: unknown;
}

const sBox: SafeBox = { content: "44" };

// sBox.content.toLowerCase() ❌ Cause an error

if (typeof sBox.content === "string") {
  console.log(sBox.content.toLowerCase());
}

// One type safe approach would be to instead scaffold out different Box types for every type of contents.
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

- As we see above, this approach quickly becomes unmanageable as we need to create a new interface for every type of content we want to support.
- A better approach would be to use generics to create a single `Box` interface that can work with any type of content.

  ```typescript
  interface Box<T> {
    contents: T;
  }

  const stringBox: Box<string> = { contents: "hello" };
  const numberBox: Box<number> = { contents: 42 };
  const booleanBox: Box<boolean> = { contents: true };

  function setContents<T>(box: Box<T>, newContents: T): void {
    box.contents = newContents;
  }

  setContents(stringBox, "world"); // ✅ OK
  setContents(numberBox, 100); // ✅ OK
  ```

  - In the above example, we created a generic `Box` interface that takes a type parameter `T`.
  - Think `T` as a placeholder for the type that will be used when creating an instance of the `Box`.
  - `Box<string>` here TypeScript will replace `T` with `string` in the `Box` interface.

  - `Box` is reusable we can substitute `T` with any type we want when creating an instance of the `Box`.

```typescript
// Using generic with interface
interface KeyValue<K, V> {
  key: K;
  value: V;
}

// Using generic with type alias
type Pair<K, V> = {
  key: K;
  value: V;
};
```

### Generic `Array` Types

- Sometime you can use the generic `Array` type to represent an array of a specific type.

  ```typescript
  let stringArray: Array<string> = ["hello", "world"];
  let numberArray: Array<number> = [1, 2, 3];
  let booleanArray: Array<boolean> = [true, false, true];
  ```

### Generic `ReadOnlyArray` Types

- This is special kind of array that prevent modification of the array.

  ```typescript
  let readOnlyStringArray: ReadonlyArray<string> = ["hello", "world"];

  // readOnlyStringArray.push("!"); ❌ Error: Property 'push' does not exist on type 'readonly string[]'.
  // readOnlyStringArray[0] = "hi"; ❌ Error: Index signature in type 'readonly string[]' only permits reading.
  ```

### Tuple Types

- Tuple types are a special kind of array that allow you to express an array with a fixed number of elements whose types are known.

  ```typescript
  let tuple: [string, number] = ["hello", 42];

  tuple[0]; // It's a string
  tuple[1]; // It's a number

  // Accessing tuple elements
  console.log(tuple[0]); // "hello"
  console.log(tuple[1]); // 42

  // Tuple methods
  tuple.push(100); // ✅ OK
  console.log(tuple); // ["hello", 42, 100]

  // tuple[2] = "world"; ❌ Error: Type 'string' is not assignable to type 'number'.
  ```

- In the above example, we created a tuple type `[string, number]` which means the first element must be a `string` and the second element must be a `number`.
- We can build tuple types using spread operators.

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleanNumbers = [string, ...boolean[], number];

let arr: StringNumberBooleans = ["hello", 42, true, false, true];
console.log(arr); // ["hello", 42, true, false, true]

let arr2: StringBooleanNumbers = ["hello", true, false, true, 42];
console.log(arr2); // ["hello", true, false, true, 42]
```

### `ReadOnly` Tuple Types

- We can create a readonly tuple type using the `readonly` modifier.

```typescript
let readOnlyTuple: readonly [string, number] = ["hello", 42];

// readOnlyTuple[0] = "hi"; ❌ Error: Index signature in type 'readonly [string, number]' only permits reading.
// readOnlyTuple.push(100); ❌ Error: Property 'push' does not exist
console.log(readOnlyTuple); // ["hello", 42]
```
