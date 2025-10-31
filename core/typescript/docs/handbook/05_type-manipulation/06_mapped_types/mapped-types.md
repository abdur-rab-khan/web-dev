# Mapped Types in TypeScript

> In `TypeScript`, mapped types allow you to create new types by using an existing type as a template. This is particularly useful for transforming properties of an object type in a systematic way.

- [Mapped Types in TypeScript](#mapped-types-in-typescript)
  - [Basic Syntax](#basic-syntax)
  - [Mapped Type Modifiers](#mapped-type-modifiers)
  - [Key Remapping via `as`](#key-remapping-via-as)
  - [Further Exploration](#further-exploration)

## Basic Syntax

- Mapped types use the `in` keyword to iterate over the keys of an existing type. The general syntax is as follows:

  ```typescript
  type MappedType<OldType> = {
    [Key in keyof OldType]: boolean;
  };
  ```

  - In the above example, `MappedType` takes all keys from `OldType` and maps them to `boolean`.

- Here's a more concrete example:

  ```typescript
  type Features = {
    darkMode: () => void;
    isLoggedIn: () => void;
  };

  type FeaturesOptions = MappedType<Features>;
  ```

## Mapped Type Modifiers

- `Mapped Types Modifiers` allow us to modify the properties of the mapped type.
- There are two main modifiers: `?` for making properties optional and `readonly` for making properties read-only.
- We can also use `+` and `-` to add or remove these modifiers. If we don't specify any modifier then it assume `+`.

- Here are some examples:

  ```typescript
  type Partial<T> = {
    [P in keyof T]?: T[P]; // Makes all properties optional
  };

  type Readonly<T> = {
    readonly [P in keyof T]: T[P]; // Makes all properties read-only
  };

  type Mutable<T> = {
    -readonly [P in keyof T]: T[P]; // Removes the read-only modifier
  };

  type Required<T> = {
    [P in keyof T]-?: T[P]; // Removes the optional modifier
  };

  type CreateMutable<T> = {
    -readonly [K in keyof T]: T[K];
  };

  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };

  type UnlockAccount = CreateMutable<LockedAccount>;
  ```

## Key Remapping via `as`

- TypeScript 4.1 introduced key remapping in mapped types using the `as` clause. This allows you to transform the keys of the original type into new keys.

- Here's an example of how to use key remapping:

  ```typescript
  type Getter<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
  };

  interface Person {
    name: string;
    age: number;
    location: string;
  }

  type LazyPerson = Getter<Person>;
  ```

  - In this example, the `Getter` type takes each key from the `Person` and converts it into a getter method with the prefix `get` and `Capitalize` the first letter of the original key.
  - `Capitalize` is a built-in utility type that capitalizes the first letter of a string.

- We can filter out key by producing `never` type.

  ```typescript
  type RemoveKindField<T> = {
    [K in keyof T as K extends "kind" ? never : K]: T[K];
  };

  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface Square {
    kind: "square";
    sideLength: number;
  }

  type Shape = Circle | Square;

  type ShapeWithoutKind = RemoveKindField<Shape>;
  ```

  - In this example, the `RemoveKindField` type removes the `kind` property from the `Shape` type by mapping it to `never`.

- We can map over arbitrary unions, not just union of `string | number | symbol`.

  ```ts
  type EventConfig<Event extends { kind: string }> = {
    [K in Event as Event["kind"]]: (event: K) => void;
  };

  type SquareEvent = { kind: "square"; x: number; y: number };
  type CircleEvent = { kind: "circle"; radius: number };

  type Config = EventConfig<SquareEvent | CircleEvent>;
  ```

## Further Exploration

```typescript
type ExtractPII<Type> = {
  [Props in keyof Type]: Type[Props] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
```
