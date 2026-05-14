// Typescript supports ever primitive and non-primitive data types.

// <==========================> Introduction <==========================
let number = 22; // TypeScript has ability to infer automatically
let num: number = 22; // Both are same

number = "String"; // Going to give an error, because typescript infer "number" as number.

// String
const myName: string = "Abdur Rab";

// Boolean
const isActive: boolean = true;

// <==========================> Array <==========================
const scores: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Abdur Rab Khan", 21]; // Going to give an error.

const namesAge: (string | number)[] = ["Abdur Rab Khan", 21]; // Now it will allow to do that.

// <==========================> Object <==========================
// => There are two ways for defining Object data type.
//      i. "type": Used to define object types, union or advance types.
//      ii. "interface": Only used to define object types.
type State = "pending" | "completed";
type ConditionalType<T> = T extends string ? "String" : "Boolean";

let string: ConditionalType<string> = "String";
let boolean: ConditionalType<boolean> = "Boolean";

// ==> Let's create some object
type TShape = {
  type: "Rectangle" | "Square"; // Union: Usually use to define more than one types, It union is combinations of multiples types, We need to use "type narrow" if we can to access inheritance properties.
  size: number;
  isActive: boolean;
};

interface IShape {
  type: "Rectangle" | "Square";
  size: number;
  isActive: boolean;
  colorProperties?: {
    // "?" is used to make any optional field, mean "typescript" won't show any error if we did'nt provided.
    color: string;
    opacity: number;
  };
}

// <==========================> Functions <==========================
// "Void" mean it does not return any thing, We can add any type at that place if we want, "Promise<type>" If It return Promise
const sayMyName = (name: string): void => {
  console.log(`Your name is ${name}`);
};

const getGreetMsg = (name: string): string => {
  return `Hello! ${name}`;
};

const greetMsg = getGreetMsg("Abdur Rab Khan"); // "greetMsg" type is string, typescript automatically infer it based on "getGreetMsg" type.

// <==========================> Type Assertion <==========================
// ==> Sometime we know about the type of any value, So instead of "TypeScript" infer the type iwe can use "type assertion" to tell about the "type" to "TypeScript"
const canvas = document.getElementById("canvas"); // Infer as "HTMLElement | null", but we know the actual type which is "HTMLCanvasElement";

let canvasI = canvas as HTMLCanvasElement;
const context = canvasI.getContext("2d");

// <==========================> Literal Inference <==========================
// ==> Sometime we want to define "Literal" type instead of string.
const method: string = "GET"; // Suppose instead of using string we want "GET" | "POST" | "PUT" type
const methods: "GET" | "PUT" | "POST" = "GET";

// Type default, When we create anything "TypeScript" type to infer it's type like "string, number".
// But we can directly tell them to infer as Literal to do this.
const req = { url: "https://example.com", method: "GET" } as const; // So instead of inferring string, string It infer as "GET" and "https://example.com"
