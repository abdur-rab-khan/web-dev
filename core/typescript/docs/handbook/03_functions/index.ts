// <=========================> Generic Function <============================>
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const s = firstElement(["a", "b"]);

// Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const ex1 = map(["1", "2", "3"], (n) => n);
// We pass "Input" generic to "arr: Input[]" -- Passing in the place of arr as string[] -- Input[] == string[]
// Pass function that take string -- Input and return Output -- string

const ex2 = map(["1", "2", "3"], (n) => parseInt(n));
// We pass "Input" generic to "arr: Input[]" -- Passing in the place of arr as string[] -- Input[] == string[]
// Passing function that take string -- and the function will returning parseInt() -- Output (number) -- return will be Output[] -- number[]

// ****************** CONSTRAINTS ******************

// function longest<T>(a: T, b: T) {
//   if (a.length >= b.length) {
//     return a;
//   }
//   return b;
// } ❌ Wrong Way

const longest = <T extends { length: number }>(a: T, b: T) => {
  if (a.length >= b.length) {
    return a;
  }
  return b;
};

const longestArray = longest([1, 2, 3], [1, 2]);
const longestString = longest("Abdur Rab", "Khan");
// const longestNumber = longest(10, 100); ❌ Wrong: Because number does not have length property

// --------Example 2----------------
function getFromObj<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
  return obj[key];
}

const obj = { name: "Abdur Rab Khan", age: 21 };
console.log(getFromObj(obj, "name"));

// ****************** SPECIFYING TYPE ARGUMENTS ******************
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], [4, 5, 6]); // It workings properly [1, 2, 3, 4, 5, 6]
// const arr = combine([1, 2, 3], ["Hello"]); ❌ It fail because typescript infer "Type" as number, so it want a: number[], b:number[]. But b is string[] that's why we have to explicity define type.

const arr2 = combine<number | string>([1, 2, 3, 4], ["Hello"]); // [1, 2, 3, 4, "Hello"]

// ****************** FUNCTION ******************
function doSomething(f: Function) {
  // Give all properties of "Function" such as "bind", "call", "apply"
}
