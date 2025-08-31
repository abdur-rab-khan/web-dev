function padLeft(value: string, padding: number | string): string {
  return " ".repeat(padding) + value;
}

function padLeftFIX(value: string, padding: number | string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

// <============================> typeof Type Guards <==============================>
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      // ❌ Error: Because in JavaScript "array" and "null" both are object.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

function printAllFIX(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

printAllFIX(null);

// <============================> EQUALITY NARROWING <==============================>
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // If x === y, which means "x" and "y" both are the string, bcz y: string | boolean if they matched means y is a string and x is also string.
    x.toLocaleLowerCase();

    x.toLowerCase();
  } else {
    console.log(x); // Here x will be a number

    console.log(y); // Here y will be a boolean
  }
}

// Using looser equality
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  if (container.value === null) {
    console.log(container.value); // It will be null
  }

  // If we use looser equality, it just not only check for "null" but also "undefined"
  if (container.value != null) {
    return container.value * factor;
  }

  //   return container.value * factor; // ❌ Error:
}

// <============================> in Operator <==============================>
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // Which means animal is a "fish"
    animal.swim();
  } else {
    // Which mean animal is "bird"
    animal.fly();
  }
}

// <============================> Using Type Predicates <==============================>

interface Cat {
  name: string;
  meow(): void;
}

interface Dog {
  name: string;
  bark: () => void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    // animal is a Cat
    animal.meow();
  } else {
    animal.bark();
  }
}

// <============================> ## Discriminated unions <==============================>
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function handleShape(shape: Shape) {
  if (shape.kind === "rect") {
    // ❌ Error: Because there is not rect in shape ==> kind.
  }
}

// Get Area of a circle
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
}

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type ShapeUnion = Circle | Square;

function getAreaFIX(shape: ShapeUnion) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.sideLength ** 2;
  }
}
