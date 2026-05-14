// Question 1: DeepReadonly<T> – Recursively make all properties of T readonly.
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Person = { id: number; address: { city: string; zip: number } };
type ReadonlyPerson = DeepReadonly<Person>;
// { readonly id: number; readonly address: { readonly city: string; readonly zip: number } }

// Question 2: AllKeys<T> – Get a union of all keys from a union of objects.
type AllKeys<T> = T extends any ? keyof T : never; // ! NOTE: ALWAYS REMEMBER WHEN WE WRITE ANYTHING USING "extends" WE FORCE DISTRIBUTIVE BEHAVIOR.

type A1 = { id: number };
type B1 = { name: string };
type Keys = AllKeys<A | B>; // "id" | "name"

// Question 3: ReplaceKeys<T, K, R> – Replace the type of specific keys K in T with type R.
type ReplaceKeys<T, U, S> = {
  [K in keyof T]: K extends U ? S : T[K];
};

type A = { id: number; name: string; active: boolean };
type B = ReplaceKeys<A, "id" | "name", string[]>;
// { id: string[]; name: string[]; active: boolean }

// Question 4: UnionToIntersection<U> – Convert a union type into an intersection type.
type UnionToIntersection<T> = T;

type U = { name: string } | { age: number };
type I = UnionToIntersection<U>;
// { name: string } & { age: number }
