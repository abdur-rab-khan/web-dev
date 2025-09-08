// <=====================> ADVANCED LEVEL <=====================>
// Question 1: Create a type DeepPartial<T> that makes all nested properties optional. Example:
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// ◎ Inside the type we can call "DeepPartial<T>", similar to recursive function.

type PersonA = { id: number; address: { city: string; zip: number } };
type PartialPerson = DeepPartial<PersonA>;

// Question 2: Implement a type TupleToUnion<T> that converts a tuple into a union. Example:
type TupleToUnion<T> = T[number];

type U = TupleToUnion<[1, 2, 3, 4]>;

// Question 3: Create a type Replace<T, From, To> that replaces all occurrences of type From in T with To.
type Replace<T, From, To> = {
  [K in keyof T]: T[K] extends From ? To : T[K];
};

type ImpReplace = Replace<{ a: string; b: number }, string, boolean>;
