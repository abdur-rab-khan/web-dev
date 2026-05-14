// It's used to handle type with union, Suppose in union all types belong to different type then we need to perform "type narrowing" before working on it.

function concatValue(a: string | number, b: string | number) {
  return a + b; // See are getting error, because a/b can be a number or string
}

// There are some ways to perform "type narrowing"
//  i. Using "typeof" -- Good for primitive type, Not for non-primitive
//  ii. Using "instance of" -- For classes and object
//  iii. "in" operator
//  iv. assignments operations ("toLowerCase" in a -> If it's true mean it's a string)

function concatValue(a: string | number, b: string | number) {
  // Let's use -- instance of
  if (typeof a === "string" && typeof b === "string") {
    // Both "a" and "b" are string;
    return a + b;
  }
}
