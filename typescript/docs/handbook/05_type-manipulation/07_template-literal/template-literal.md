# Template Literal Types

> Just like string literals, in TypeScript/JavaScript, template literal types are a way to create new string-like types by combining other string-like types. They use backticks (`` ` ``) and can include placeholders for other types, denoted by `${}`.

- [Template Literal Types](#template-literal-types)
  - [Basic Usage](#basic-usage)
  - [String Union Types](#string-union-types)

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
        eventName: `${keyof T & string}Changed`,
        callback: (newValue: T[keyof T]) => void
      ): void;
    };

    declare function makeWatchedObject<Type>(
      obj: Type
    ): Type & PropEventSource<Type>;
    ```

    ```typescript
    const person = makeWatchedObject({
      firstName: "Saoirse",
      lastName: "Ronan",
      age: 26,
    });

    person.on("firstNameChanged", () => {});
    ```
