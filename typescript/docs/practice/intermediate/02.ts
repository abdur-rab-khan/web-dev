// Question 1: FunctionReturn<T> – Extract the return type of a function type.
type FunctionReturn<T> = T extends (...p: any) => infer U ? U : never;

type FnR = (a: number, b: number) => string;
type R = FunctionReturn<FnR>; // string

// Question 2: FunctionParameters<T> – Extract parameters of a function as a tuple.
type FunctionParameters<T> = T extends (...p: infer U) => void ? U : never;

type Fn = (id: number, name: string) => void;
type P = FunctionParameters<Fn>; // [number, string]

// Question 3: Merge<A, B> – Combine two object types, but if a property exists in both, B overrides.
type Merge<T extends object, U extends object> = {
  [K in keyof T & U]: string;
};
type A = { id: number; name: string };
type B = { name: boolean; active: boolean };
type C = Merge<A, B>;
// { id: number; name: boolean; active: boolean }
