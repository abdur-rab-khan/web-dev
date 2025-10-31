# Indexed Access Types

> In TypeScript, indexed access type allow us to look up the type of a property in another type. This is useful when we want to reference a type that is nested within another type.

## Example

```ts
type Person = {
  name: string;
  age: number;
  location: {
    city: string;
    country: string;
  };
};

type Location = Person["location"];

// Location is now of type { city: string; country: string; }
const myLocation: Location = {
  city: "New York",
  country: "USA",
};

type Name = Person["name"]; // String
type Age = Person["age"]; // Number
```

- The indexing type is itself a type, so we can use with `Union`, `typeof`, and `keyof` operators.

```ts
type Person = {
  name: string;
  age: number;
  location: {
    city: string;
    country: string;
  };
};

type PersonProperty = Person["name" | "age"]; // string | number
type P2 = Person[keyof Person]; // string | number | { city: string; country: string; }

type Key = "name" | "age";
type P3 = Person[Key]; // string | number
```

- Another example with `typeof` operator using with `number` to get the type of an array element.

```ts
const arr = [
  {
    name: "Alice",
    age: 30,
  },
  {
    name: "Bob",
    age: 25,
  },
];

type Person = (typeof arr)[number]; // { name: string; age: number; }

// OR
type Person2 = (typeof arr)[0]; // { name: string; age: number; }

// Extract "name" property type
type Name = Person["name"]; // string

// OR
type Name = (typeof arr)[number]["name"]; // string
```
