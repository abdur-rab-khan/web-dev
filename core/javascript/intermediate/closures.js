/*
+-----------------------------------------------------------------------+ CLOSURES +-----------------------------------------------------------------------+
|                                                                                                                                                          | 
| 🟡 Closures in Javascript is combination of a function bundled together (enclosed) with references of their surrounding state (the lexical environment). |
|     Suppose a function is defined inside another function, the inner function is called a closure, which create their own "lexical scope" and            | 
|     every function in Javascript has property "[[Scope]]" that references the lexical environment in which it was created.                               | 
|                                                                                                                                                          | 
| 🟡 Closures allow a function to access variables from an enclosing scope or function even after that outer function has finished executing.              | 
|     It's because of garbage collection mechanism in Javascript that doesn't immediately free up memory for variables that are still being referenced by  |  
|     inner functions.                                                                                                                                     | 
|                                                                                                                                                          | 
| 🟡 One of the most important things about javascript is that "let", "const" create block scope means every time when a blockIt's scope is created a new  |
|    lexical environment is created.                                                                                                                       |
|                                                                                                                                                          | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                        LEXICAL SCOPE                                                                     | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                          | 
| 🟡 A Lexical environment is a data structure that holds identifier-variable mapping In other words, it is a mapping of variable names to their values.  | 
|    environment has a reference to its outer environment.                                                                                                 | 
|                                                                                                                                                          | 
| 🟡 Every time "new lexical environment" is created when:                                                                                                |
|     1. A function is invoked.                                                                                                                            | 
|     2. A block is executed (for, if, while).                                                                                                             | 
|                                                                                                                                                          | 
| 🟡 When a variable is created by using "let" or "const" inside a block, it is stored in the lexical environment of that block, but that's not the case   | 
|     with "var" because "var" is function scoped, so if "var" is used inside a block, it is stored in the lexical environment of the nearest function.    | 
|                                                                                                                                                          | 
| 🟡 Because of this behavior the classic "for loop" with "var" creates many issues when used with asynchronous functions like  setTimeout.                |
|                                                                                                                                                          | 
| 🔵 Example:                                                                                                                                              |
|                                                                                                                                                          |
|     for(var i=1; i<=5; i++) {                                                                                                                            |
|         setTimeout(function() {                                                                                                                          |
|             console.log(i); // it will print 6 five times because "var" is function scoped so after the loop ends the value of i is 6                    | 
|         }, i * 1000);                                                                                                                                    |
|     }                                                                                                                                                    | 
|                                                                                                                                                          | 
| 🟡 So in the above what happens is when the setTimeout callback function is executed after 1 second, it will look for the value of "i" in its lexical    | 
|    environment, but we know that "var" is function scoped so the value of "i" at that time will be 6 (after the loop ends). Hence it prints 6 five times.| 
|                                                                                                                                                          | 
| 🔵 To fix this issue we can use "let" instead of "var" because "let" is block scoped so every iteration of the loop will create a new lexical environment| 
|     because of "let" and the value of "i" will be preserved for each iteration.                                                                          | 
|                                                                                                                                                          | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                      SCOPE CHAINING                                                                      | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                          | 
| 🟡 "Scope chaining" in Javascript is a mechanism where a function first looks for variables in its own scope, than in the outer scope and so on until it | 
|  global scope. I mean this behavior is similar to object prototype chaining where a property first looks in its own object till it reaches the top level |   
|  object.                                                                                                                                                 | 
|                                                                                                                                                          | 
| 🟡 When a function is invoked, a new execution context is created which contains the variable object, scope chain and "this" keyword. The scope chain   | 
|    consists of the current variable object and the variable objects of all its parent execution contexts.                                                | 
|                                                                                                                                                          | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                  PRIVATE IMPLEMENTATION                                                                  | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                          | 
| 🟡 By using closures, we can easily create private variables and methods, as we know that variables defined in a function are not accessible from        | 
|     outside that function, we can use this behavior to our advantage.                                                                                    | 
|                                                                                                                                                          | 
| 🔵 Example:                                                                                                                                              | 
|                                                                                                                                                          | 
| function privateCounter() {                                                                                                                              |
|       let count = 0; // private variable                                                                                                                 |
|                                                                                                                                                          |
|        const increase = () => {                                                                                                                          |
|            count++;                                                                                                                                      | 
|            return count;                                                                                                                                 |
|        }                                                                                                                                                 |
|                                                                                                                                                          |
|        const decrease = () => {                                                                                                                          |
|            count--;                                                                                                                                      |
|            return count;                                                                                                                                 |
|        }                                                                                                                                                 |
|                                                                                                                                                          |
|        return {                                                                                                                                          |
|            increase,                                                                                                                                     |
|            decrease                                                                                                                                      |
|        };                                                                                                                                                |
|    };                                                                                                                                                    |
|                                                                                                                                                          |
+--------------------------------------------------------------------------+ END +-------------------------------------------------------------------------+
*/

// By knowing inner functions from closures have access to outer function's variables, we can create multiple things like:

// Higher order function for DOM manipulation
function createElement(type) {
  return function (content) {
    const element = document.createElement(type);
    element.textContent = content;
    return element;
  };
}

const createParagraph = createElement("p");
const createHeading = createElement("h1");

document.body.appendChild(createHeading("Hello, World!"));
document.body.appendChild(
  createParagraph("This is a paragraph created using closures."),
);

// Function currying
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5)); // Output: 10

// Data encapsulation
function bankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      } else {
        return "Insufficient funds";
      }
    },
    getBalance() {
      return balance;
    },
  };
}

const myAccount = bankAccount(1000);

console.log(myAccount.deposit(500)); // Output: 1500
console.log(myAccount.withdraw(200)); // Output: 1300
console.log(myAccount.getBalance()); // Output: 1300
console.log(myAccount.balance); // Output: undefined (balance is private)

// Memoization
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(40));
