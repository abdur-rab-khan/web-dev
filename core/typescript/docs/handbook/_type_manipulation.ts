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
