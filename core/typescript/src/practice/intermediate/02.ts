// Question 1: ExcludeKeys<T, U> – Create a type that removes properties of type U from T.
type ExcludeKeys<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type Person = { id: number; name: string; active: boolean };
type NoBoolean = ExcludeKeys<Person, boolean>;

// Question 2: FirstElement<T> – Extract the type of the first element in a tuple.
type FirstElement<T extends readonly unknown[]> = T[0];

type A = FirstElement<[string, number, boolean]>; // string
