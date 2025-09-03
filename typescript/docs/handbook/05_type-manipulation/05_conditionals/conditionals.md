# Conditional Types

> TypeScript allow us to create types that depend on a condition using conditional types. This is useful when we want to create types that are based on other types.\
> Or when we want to create types that are more flexible and adaptable to different situations.

- [Conditional Types](#conditional-types)
  - [Example](#example)
  - [Conditional Type Constraints](#conditional-type-constraints)
  - [Inferring Within Conditional Types](#inferring-within-conditional-types)
  - [Distribution](#distribution)

## Example

```ts
type IsString<T> = T extends string ? true : false;
```

- In this example, we define a conditional type `IsString` that takes a type parameter `T`.
- If `T` extends `string` (i.e. if `T` is a string type), then the type resolves to `true`, otherwise it resolves to `false`.
- It's not seem like very useful in first glance, but we can use it to create more complex types.

- For example, let's create `createLabel` function that returns a label based on the type of the input:

  ```ts
  interface IdLabel {
    id: number;
  }

  interface NameLabel {
    name: string;
  }

  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }
  ```

- In the above it is the best example of function overloading. But we can use conditional types to achieve the same result:

  ```ts
  // Instead, we can using conditional with generic with out these overloading function
  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

  // Let's use them
  function createLabelC<T extends number | string>(nameOrId: T): NameOrId<T> {
    throw "unimplemented";
  }

  const a = createLabel("A"); // It's type of NameLabel
  const b = createLabel(55); // It's type of IdLabel
  ```

## Conditional Type Constraints

- Constraints in `TypeScript` are used to provide the kind of type that a generic type parameter can accept.
- We can use constraints with conditional types to create more specific types.

  ```ts
  type Message<T> = T["message"]; // ❌ Error: Type 'T' has no properties in common with type '{ message: any; }'.

  // To fix this error, we can add a constraint to the generic type parameter T
  type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

  // Let's use them
  interface Email {
    message: string;
  }

  interface Dog {
    bark(): void;
  }

  type EmailMessageContents = MessageOf<Email>; // string
  type DogMessageContents = MessageOf<Dog>; // never
  ```

- Let's see another example using `Flatten` type that takes an array type and returns the type of its elements:

  ```ts
  type Flatten<T> = T extends any[] ? T[number] : T;

  // Let's use them
  type Str = Flatten<string[]>; // string
  type Num = Flatten<number[]>; // number
  type Bool = Flatten<boolean>; // boolean
  ```

## Inferring Within Conditional Types

- `infer` in `TypeScript` is used to declare a type variable that can be used within a conditional type.
- We can use `infer` to extract types from other types.

  ```ts
  type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

  // Let's use them
  type Num = GetReturnType<() => number>; // number
  type Str = GetReturnType<() => string>; // string
  type Bool = GetReturnType<() => boolean>; // boolean
  ```

  - In this example, we define a conditional type `GetReturnType` that takes a type parameter `T`.
  - If `T` extends a function type (i.e. if `T` is a function), then we use `infer R` to extract the return type of the function mean we store the return type in a type variable `R`.

- We can also use `infer` to extract type multiple signature function

  ```ts
  // Inferring multiple values
  interface IdLabel {
    id: number;
  }

  interface NameLabel {
    name: string;
  }

  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }

  type T1 = ReturnType<typeof createLabel>; // IdLabel | NameLabel
  ```

## Distribution

- Conditional types are distributive when given a union type. This means that when a conditional type is applied to a union type, it is applied to each member of the union individually, and the results are combined into a new union type.

  ```ts
  type ToArray<T> = T extends any ? T[] : never;

  // Let's use them
  type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
  ```

  - In this example, we define a conditional type `ToArray` that takes a type parameter `T`.
  - If `T` extends `any` (which is always true), then the type resolves to `T[]`, otherwise it resolves to `never`.
  - When we apply `ToArray` to the union type `string | number`, it is applied to each member of the union individually, resulting in the union type `string[] | number[]`.
