// Type Manipulation: It's a ways to manipulate types based on conditions, It's often used to create advance types

// <=============================> keyOf <=============================>
// => It's used to extract the key of any "object type"
type Obj = {
  key1: "value-1";
  key2: "value-2";
  [key: number]: string; // Used to declare multiple object with "key -> number" and "value -> string"
};

type ObjKeys = keyof Obj; // "key1" | "key2" | numbers    --> Gives union of Obj keys
const x: ObjKeys = 22;

// => We can perform some advance stuff like:
type CustomObj = {
  [K in keyof Obj]: K extends "key1" ? boolean : K; // Using "in" we can loop through Keys and using "extends" we can add condition or define type of "Generic type".
}; // { key1 : boolean, ...other_will_be_the_same}

// <=============================> typeOf <=============================>
// => Used to extract the type of "JavaScript variable"
const method = "GET";
const method2: typeof method = "GET"; // Automatically Get the inferred type of "method"

function k() {
  return { x: 10, y: 3 };
}

type KReturnType = ReturnType<typeof k>; // "ReturnType" extract the return type from "k".

const kObj: KReturnType = { x: 2, y: "string" }; // Error because type says it should be a number not a string.

// <=============================> Conditionals <=============================>
// => We can build types based on conditions, Using "extends", So let's see how do we do that.
const checkIsString = <T>(v: T): T extends string ? "true" : "false" => {
  if (typeof v === "string") {
    return "true" as any;
  }
  return "false" as any;
};

const isString = checkIsString("hello"); // Return true because it's string.
const isString2 = checkIsString(55); // Return false because it's not a string.

// -> Suppose, I want to to return based on what user send me.
function createLabel<T>(value: T): T {
  return value;
}

const number = createLabel(5); // TypeScript will infer "number" type as "number".

// -> Let's building type utility type what flatten any array into type
type Flatten<T> = T extends any[] ? T[number] : T;
// Using "extends" first check whether it's array type or not.
// If yes then "T[number]", mean getting "All the type as a number"

type Data = [1, "one", true];
type TData = Data[number]; // It's giving union of "1" | "one" | true

type String = Flatten<string[]>; // Type will be string

// ==> "infer" Is a way to extract types, infer data type from it.
type GetReturnType<T> = T extends (...args: any[]) => infer R
  ? R extends string
    ? true
    : false
  : never;

type Number = GetReturnType<() => string>; // true, because we infer R and say If "R" is string then make type "true" otherwise "false"

// <=============================> Mapped Types in TypeScript <=============================>
// ==> "Mapped" is a way to new types by using an existing type as a template, there are some keyword like "as", "in" and modifiers like "+", "-" that we can use to achieve this.
// i. "in" --> It's used to iterate over keys like "Key in keyof OldType: boolean" (mean it create a new type from keyof OldType to boolean)
// ii. "as" This "clause" is used to change the default "K" from custom one "[K in keyof T] (mean key will be the keyof T)", but we can modify key using "K in keyof T as `get${Capitalize<string & K>}`", Now every key will look like this "getK".
// iii. "+" It's used to add modifiers like "readonly" "+readonly [P in keyof T]: T[P]" make everything optionals
// iv. "-" Or we can remove it using "[P in keyof T]-?: T[P]]"

// --> It's make our own Partial
type TPartial<T> = {
  [K in keyof T]?: T[K];
};

type Optional = TPartial<{
  id: string;
  age: number;
  isValid: boolean;
}>;

// --> It's make our own Required
type TRequired<T> = {
  [K in keyof T]-?: T[K];
};

type Required = TRequired<Optional>;

// --> let's use RE-Mapping
type Getter<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

const gettingObj: Getter<Required> = {
  getAge: () => 1,
  getId: () => "123",
  getIsValid: () => true,
};

// There are some more Re-Mapping (Template Literal) Utilities such as:
// i. Uppercase<S>
// ii. Lowercase<S>
// iii. Capitalize<S>
// iv. Uncapitalized<S>

type IPropsEventSource<T> = {
  on<Key extends string & keyof T>(
    event: `${Key}Changed`,
    callback: (newValue: T[Key]) => void,
  ): void;
};

function makeObject<T extends { name: string; age: number; location: string }>(
  obj: T,
): T & IPropsEventSource<T> {
  throw "";
}

const personI = makeObject({
  name: "Abdur Rab Khan",
  age: 21,
  location: "Mumbai",
});

personI.on("ageChanged", (x) => {}); // Type of x is: number
personI.on("locationChanged", () => {});
personI.on("nameChanged", () => {});
