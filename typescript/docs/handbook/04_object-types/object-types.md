# Object Types in TypeScript

> In JavaScript the fundamental way to group data is using objects. In TypeScript we represent those through **_object types_**.

- [Object Types in TypeScript](#object-types-in-typescript)
  - [Object Types](#object-types)
  - [Property Modifiers](#property-modifiers)
    - [1. Optional Properties](#1-optional-properties)
    - [2. Readonly Properties](#2-readonly-properties)
    - [3. Index Signatures](#3-index-signatures)

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
