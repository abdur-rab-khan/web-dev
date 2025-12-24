# `Keyof` Type Operator

> `keyof` in TypeScript is a type operator that takes an object type and produces a string or numeric literal union of its keys.

## Basic Usage

```typescript
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```

- In this example, `PersonKeys` will be a union type of the keys of the `Person` interface, which are `"name"` and `"age"`.

## Example with Index Signatures

```typescript
interface Dictionary {
  [key: string]: number;
}
type DictionaryKeys = keyof Dictionary; // string | number
```

- Here, `DictionaryKeys` will be `string | number` because the index signature allows for any string key, and JavaScript objects can also be accessed with numeric keys.
- There is a question occur here: why not just `string`? The reason is that in JavaScript, when you use a number as a key, it is coerced to a string. However, TypeScript treats numeric keys as a separate type when dealing with index signatures.
- Example:

```typescript
const dict: Dictionary = { one: 1, two: 2 };

const value1 = dict["one"]; // valid
const value2 = dict[1]; // valid, because 1 is coerced to "1"
```

- Therefore, `keyof Dictionary` results in `string | number`.

## Using keyof with Mapped Types

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

type CarProperties = {
  [K in keyof Car]: Car[K];
};
```
