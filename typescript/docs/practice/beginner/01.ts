// <=====================> BEGINNER LEVEL <=====================>
// Question 1: Create a generic function identity that takes a value of any type and returns it.
function identity<T>(value: T) {
  return value;
}

// Question 2: Define a type Point with x and y as numbers. Then make a type ReadOnlyPoint where properties cannot be changed.
interface Point {
  x: number;
  y: number;
}

type MyReadOnly<T> = { readonly [K in keyof T]: T[K] };
type ReadOnlyPoint = MyReadOnly<Point>;

// Question 3: Create a type Optional<T> that makes all properties of T optional.
type Optional<T> = Partial<T>;

type MyOptional<T> = { [K in keyof T]?: T[K] };
type OptionalPoint = MyOptional<Point>;

// Question 4:  Write a type NonNullable<T> that removes null and undefined from a type.
type MyNonNullable<T> = T extends null | undefined ? never : T;

type NonNullable = MyNonNullable<string | null | undefined>;
