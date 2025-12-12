/* eslint no-unused-vars: warn */
const x = "ESLint Project Index";
const foo = 42;
const bar = 51;

console.log(foo + bar);
console.log(x);

console.log(/* eval removed */);

// testing avoidMoreThaThreeArgs rule
function testFunction(a, b, c, d, e) {
  return a + b + c + d + e;
}

testFunction(1, 2, 3, 4, 5);
