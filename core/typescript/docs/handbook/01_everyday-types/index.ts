const number = [1, 2, 3, 4, 5];

const double = number.map((n) => n * 2); // TypeScript automatically infer the parameters of that function to given types.

const person: { name: string; age?: number } = {
  name: "Abdur Rab Khan",
};

console.log(person.name); // Print "Abdur Rab Khan"

// person.age = person.age + 1; // ❌ Wrong Way

// ✅ Correct Way
if (person.age !== undefined) {
  person.age = person.age + 1;
}

// <=============================> UNION TYPE <=============================>

function printId(id: number | string) {
  console.log("Your id is: " + id);
}

printId(101); //  ✅
printId("202"); //  ✅
printId({ myID: 22342 }); // ❌

// Type Narrowing
function say(value: string | number) {
  // console.log(value.length); ❌
  // It allows only methods which are available for all there members. Solution is "type narrowing", where type script narrow down the type of a variable

  if (typeof value === "string") {
    console.log(value.toLowerCase());
  } else {
    console.log(value);
  }
}

// <=============================> INTERFACE <=============================>

type TCoordinates = {
  x: number;
  y: number;
};

interface ICoordinates {
  x: number;
  y: number;
}

// It works fine because typescript only concern about structure of value, it only cares that it has the expected properties
function printCoordinates(pt: { x: number; y: number }): TCoordinates {
  return pt;
}

// <=============================> TYPE ASSERTIONS <=============================>
const canvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// <=============================> Literal Inference <=============================>
const obj = { counter: 0 }; // TypeScript infer obj as { counter : number } not { counter : 0}

if (true) {
  obj.counter = 1;
}

declare function handleRequest(url: string, method: "GET" | "POST"): void;

let req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

// OPTIONS 1:
req = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req.url, req.method as "GET");

// OPTIONS 2:
const reqC = { url: "https://example.com", method: "GET" } as const;
handleRequest(reqC.url, reqC.method);
