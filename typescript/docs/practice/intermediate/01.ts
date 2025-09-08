// <=====================> INTERMEDIATE LEVEL <=====================>

// Question 1: Given a type "type User = { id: number; name: string; email?: string }"
type User = { id: number; name: string; email?: string };

type MyRequired<T> = { [K in keyof T]-?: T[K] };
type RequiredUser = MyRequired<User>;

// Question 2: Create a type PickByType<T, U> that extracts only properties of type U from T. Example:
type PickByType<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] };

type Person = { id: number; name: string; active: boolean };
type StringKeys = PickByType<Person, string>;

// Question 3: Build a type Mutable<T> that removes readonly from all properties.
interface Point {
  x: number;
  y: number;
}

type ReadOnlyX = Readonly<Point>;

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
type RemovedReadOnlyX = Mutable<Point>;

// Question 4: Define a utility type Flatten<T> that turns an array type into its element type:
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

// ◎ "T extends (infer U)[]" means, infer U refers to type of T, we infer type of T into U.
// ◎ And check if they are array simply call again until we got type without any array.

type A = Flatten<String[]>;
type B = Flatten<number[][]>;
