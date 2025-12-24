# KeyOf Type Operator

> As we know that `typeof` operator in JavaScript returns the type of a variable. Similarly, in TypeScript, `keyof` operator is used to get the keys of a type. `typeof` is used to get the type of a variable, function, or property.

## Example

```ts
let s = "hello";
let n: typeof s; // n is of type string
```

- It's seems that it's not very useful, but it is when we want to capture the type of a variable or property.
- By using `typeof` with `ReturnType` utility type, it make them more powerful.

```ts
type Predicate = (x: unknown) => boolean;
type K = ReturnType<typeof Predicate>; // K is of type boolean
```

- If we try to use `ReturnType` without `typeof`, by passing the function name directly, it will give an error.

```ts
function f() {
  return { x: 10, y: 3 };
}

type P = ReturnType<f>; // Error: 'f' refers to a value, but is being used as a type here.

// INSTEAD, we should use typeof
type P = ReturnType<typeof f>; // P is of type { x: number; y: number; }
```
