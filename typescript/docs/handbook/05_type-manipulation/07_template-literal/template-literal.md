# Template Literal Types

> Just like string literals, in TypeScript/JavaScript, template literal types are a way to create new string-like types by combining other string-like types. They use backticks (`` ` ``) and can include placeholders for other types, denoted by `${}`.

- [Template Literal Types](#template-literal-types)
  - [Basic Usage](#basic-usage)
  - [String Union Types](#string-union-types)
  - [Inference with Template Literals](#inference-with-template-literals)
  - [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)
    - [`Uppercase<S>`](#uppercases)
    - [`Lowercase<S>`](#lowercases)
    - [`Capitalize<S>`](#capitalizes)
    - [`Uncapitalize<S>`](#uncapitalizes)

## Basic Usage

- You can create a template literal type by combining string literals and other types. For example:

  ```typescript
  type World = "world";
  type Greeting = `hello ${World}`; // "hello world"
  ```

- When `union` types are used within template literals, TypeScript generates a union of all possible combinations:

  ```typescript
  type Event = "click" | "scroll" | "mousemove";
  type EventHandler = `on${Capitalize<Event>}`; // "onClick" | "onScroll" | "onMousemove"
  ```

- For each member of the union, TypeScript creates a new string literal type by substituting the member into the template.

  ```typescript
  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
  type Lang = "en" | "ja" | "pt";

  type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
  // "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id"
  // | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id"
  // | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
  ```

## String Union Types

- The power of template literal use in when declaring a new string based on existing information inside a type.
- Let's consider an function called `makeWatchedObject` adds new function on object called `on`.
- The `on` function takes two arguments, the name of the property + "Changed" and return `void`.
- We can imagine the base object as looking like this:

  ```typescript
  interface Person {
    name: string;
    age: number;
    location: string;
  }
  ```

  - The `makeWatchedObject` function would return a type that looks like this:

    ```typescript
    const person = makeWatchedObject({
      firstName: "Saoirse",
      lastName: "Ronan",
      age: 26,
    });

    // makeWatchedObject has added `on` to the anonymous Object
    person.on("firstNameChanged", (newValue) => {
      console.log(`firstName was changed to ${newValue}!`);
    });
    ```

  - Let's build a type for `on` function.

    ```typescript
    type PropEventSource<T> = {
      on(
        event: `${string & keyof T}Change`,
        callback: (newValue: any) => void
      ): void;
    };

    function makeObject<Type>(obj: Type): Type & PropEventSource<Type> {
      throw "unimplemented";
    }
    ```

    - Now, we can use `makeObject` function to create an object that has `on` method with type safety.
    - If the above `PropEventSource` see `${string $ keyof T}Change`, it means that it will take all the keys of the object `T` and create a new string by appending "Change" to each key.
    - Here `string & keyof T` is used to ensure that the keys are treated as strings, which is necessary for template literal types.

      ```typescript
      const person = makeObject({
        name: "Abdur Rab Khan",
        age: 21,
        location: "Mumbai",
      });

      // person.on("fho", () => {}); ❌ Error: You can either use "nameChange" | "ageChange" | "locationChange"

      person.on("ageChange", () => {}); // ✔️
      ```

## Inference with Template Literals

- Notice, In the above example, we extract the keys + "Change" to create the event names.
- But the callback function takes `any` type as the new value. We can improve this by inferring the type of the property from the object `T`.

  ```typescript
  type IPropEventSource<T> = {
    on<Key extends string & keyof T>(
      event: `${Key}Changed`,
      callback: (newValue: T[Key]) => void
    ): void;
  };

  function makeObjectI<Type>(obj: Type): Type & IPropEventSource<Type> {
    throw "unimplemented";
  }

  const personI = makeObjectI({
    name: "Abdur Rab",
    age: 21,
    location: "Mumbai",
  });

  personI.on("nameChanged", (newName) => {
    console.log(`new name is ${newName}`);
  });

  personI.on("ageChanged", (newAge) => {
    console.log(`new age is ${newAge}`);
  });
  ```

  - In this improved version, the `on` method uses a generic type parameter `Key` that extends `string & keyof T`. This allows us to infer the type of the property from the object `T` and use it in the callback function.
  - Now, when you call `personI.on("nameChanged", ...)`, TypeScript knows that `newName` is of type `string`, and when you call `personI.on("ageChanged", ...)`, it knows that `newAge` is of type `number`.

## Intrinsic String Manipulation Types

- TypeScript provides several intrinsic string manipulation types that can be used in conjunction with template literal types to perform common string operations at the type level. These include:

### `Uppercase<S>`

- Converts all characters in the string `S` to uppercase.

  ```typescript
  type Shout = Uppercase<"hello">; // "HELLO"
  ```

### `Lowercase<S>`

- Converts all characters in the string `S` to lowercase.

  ```typescript
  type Whisper = Lowercase<"HELLO">; // "hello"
  ```

### `Capitalize<S>`

- Capitalizes the first character of the string `S`.

  ```typescript
  type Greeting = Capitalize<"hello">; // "Hello"
  ```

### `Uncapitalize<S>`

- Converts the first character of the string `S` to lowercase.

  ```typescript
  type lowerGreeting = Uncapitalize<"Hello">; // "hello"
  ```
