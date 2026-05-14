// There are three things we have to know about function for "TypeScript".
// i. Argument Types
// ii. Return Types
// iii. Generic Types
// iv. Function Type Aliases

// i. Argument Types
function greet(name: string, msg: string): void {
  console.log(name + " " + msg);
}

greet("Abdur Rab Khan", "Hello!"); // Hello! Abdur Rab

// Don't have to specify return type, Because TS will automatically infer it.
function addNumber(...args: number[]) {
  return args.reduce((acc, curr) => curr + acc, 0);
}

// We can specify optional type using "?", but we have to add optional params at the end of the function.

// ii. Return Types
//      a. number, array[], object anything
//      b. void: If do not want to return anything
//      c. unknown: If same as any but before doing anything we have to check the type of it.
//      d. never: If narrow every type of union, the last type become never
//      e. this

function add(a: number, b: number): number {
  return a + b;
}

function subs(a: unknown, b: unknown) {
  const s = a - b; // error: because we have to check the type first.

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return -1;
}

function check(state: "pending" | "completed") {
  if (state === "completed") {
    // do some task
  } else if (state === "pending") {
    // do some task
  } else {
    // state become never because we check ever type.
    state;
  }
}

// iii. Generic Type
function concat<T>(a: T, b: T): T {
  return a;
}

// iv. Type Alias
type TFunction = (a: string) => void;
