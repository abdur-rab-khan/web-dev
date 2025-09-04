# Utility Types

> TypeScript provides several build-in utility types to facilitate common type transformations. These utility types help to manipulate and transform types in a more expressive way.

- [Utility Types](#utility-types)
  - [Utility Examples](#utility-examples)
    - [1. `Awaited<T>`](#1-awaitedt)
    - [2. `Partial<T>`](#2-partialt)
    - [3. `Required<T>`](#3-requiredt)
    - [4. `Readonly<T>`](#4-readonlyt)
    - [5. `Record<K, T>`](#5-recordk-t)
    - [`Pick<T, K>`](#pickt-k)
    - [`Omit<T, K>`](#omitt-k)
    - [`Exclude<T, U>`](#excludet-u)
    - [`Extract<T, U>`](#extractt-u)
    - [`ReturnType<T>`](#returntypet)

## Utility Examples

### 1. `Awaited<T>`

- It is a generic type that takes a type `T` and returns the resolved type of a Promise.
- If `T` is not a Promise, it simply returns `T`.

  ```ts
  type A = Promise<Boolean>;

  // AwaitedA is of type Boolean
  type AwaitedA = Awaited<A>; // Boolean
  ```

- If `T` is a nested Promise, it recursively unwraps the Promise until it reaches a non-Promise type.

  ```ts
  type B = Promise<Promise<string>>;

  // AwaitedB is of type string
  type AwaitedB = Awaited<B>; // string
  ```

### 2. `Partial<T>`

- It is a generic type that takes a type `T` and returns a new type with all properties of `T` set to optional.

  ```ts
  interface User {
    id: number;
    name: string;
    age: number;
  }

  // PartialUser has all properties of User as optional
  type PartialUser = Partial<User>;
  // Equivalent to:
  // { id?: number;
  //   name?: string;
  //   age?: number; }
  ```

### 3. `Required<T>`

- It is a generic type that takes a type `T` and returns a new type with all properties of `T` set to required.

  ```ts
  interface User {
    id?: number;
    name?: string;
    age?: number;
  }

  // RequiredUser has all properties of User as required
  type RequiredUser = Required<User>;
  // Equivalent to:
  // { id: number;
  //   name: string;
  //   age: number; }
  ```

### 4. `Readonly<T>`

- It is a generic type that takes a type `T` and returns a new type with all properties of `T` set to readonly.

  ```ts
  interface User {
    id: number;
    name: string;
    age: number;
  }

  // ReadonlyUser has all properties of User as readonly
  type ReadonlyUser = Readonly<User>;
  // Equivalent to:
  // { readonly id: number;
  //   readonly name: string;
  //   readonly age: number; }
  ```

### 5. `Record<K, T>`

- It is a generic type that takes two parameters: `K` (a union of string or number literals) and `T` (the type of the values). It constructs an object type with keys from `K` and values of type `T`.

  ```ts
  // Record with string keys and number values
  type StringNumberRecord = Record<string, number>;
  // Equivalent to:
  // { [key: string]: number; }

  // Record with specific keys and boolean values
  type SpecificRecord = Record<"id" | "name" | "age", boolean>;
  // Equivalent to:
  // { id: boolean;
  //   name: boolean;
  //   age: boolean; }
  ```

### `Pick<T, K>`

- It is a generic type that takes two parameters: `T` (an object type) and `K` (a union of keys from `T`). It constructs a new type by picking the properties from `T` that are specified in `K`.

  ```ts
  interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  // PickUser has only the 'id' and 'name' properties from User
  type PickUser = Pick<User, "id" | "name">;
  // Equivalent to:
  // { id: number;
  //   name: string; }
  ```

### `Omit<T, K>`

- It is a generic type that takes two parameters: `T` (an object type) and `K` (a union of keys from `T`). It constructs a new type by omitting the properties from `T` that are specified in `K`.

  ```ts
  interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  // OmitUser has all properties of User except 'email'
  type OmitUser = Omit<User, "email">;
  // Equivalent to:
  // { id: number;
  //   name: string;
  //   age: number; }
  ```

### `Exclude<T, U>`

- It is a generic type that takes two parameters: `T` (a union type) and `U` (a union type). It constructs a new type by excluding from `T` all types that are assignable to `U`.

  ```ts
  type T = "a" | "b" | "c" | "d";
  type U = "a" | "c";

  // ExcludeT is of type "b" | "d"
  type ExcludeT = Exclude<T, U>; // "b" | "d"

  // Exclude from object types
  interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  // Exclude 'email' property from User
  type ExcludeEmail = Exclude<keyof User, "email">; // "id" | "name" | "age"
  ```

### `Extract<T, U>`

- It is a generic type that takes two parameters: `T` (a union type) and `U` (a union type). It constructs a new type by extracting from `T` all types that are assignable to `U`.

  ```ts
  type T = "a" | "b" | "c" | "d";
  type U = "a" | "c" | "e";

  // ExtractT is of type "a" | "c"
  type ExtractT = Extract<T, U>; // "a" | "c"

  // Extract from object types
  interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  // Extract 'id' and 'name' properties from User
  type ExtractIdName = Extract<keyof User, "id" | "name" | "phone">; // "id" | "name"
  ```

### `ReturnType<T>`

- It is a generic type that takes a function type `T` and returns the return type of that function.

  ```ts
  // Function that returns a string
  function getString(): string {
    return "Hello, World!";
  }

  // ReturnTypeString is of type string
  type ReturnTypeString = ReturnType<typeof getString>; // string

  // Function that returns a Promise<number>
  function getNumberAsync(): Promise<number> {
    return Promise.resolve(42);
  }

  // ReturnTypeNumberAsync is of type Promise<number>
  type ReturnTypeNumberAsync = ReturnType<typeof getNumberAsync>; // Promise<number>
  ```
