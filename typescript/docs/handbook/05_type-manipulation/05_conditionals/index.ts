interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// Instead, we can using conditional with generic with out these overloading function
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

// Let's use them
function createLabelC<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
}

const a = createLabel("A"); // It's type of NameLabel
const b = createLabel(55); // It's type of IdLabel

// <======================> INFER <======================>
// infer is used to store data type into the variable that can use in some-other places.
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Num = GetReturnType<() => number>; // This is the type of number
type String = GetReturnType<() => string>; // This is the type of string.

// Inferring multiple values
interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

type T1 = ReturnType<typeof createLabel>; // IdLabel | NameLabel
