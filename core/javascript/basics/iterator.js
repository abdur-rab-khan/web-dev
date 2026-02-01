/*
+-----------------------------------------------------------------------+ ITERATOR +-----------------------------------------------------------------------+
|                                                                                                                                                          | 
|  🟡 Iterator in Javascript is an object that defines "iterator protocol" and returns iterator object to traverse over a collection by using "next()"     |
|       method, as a result of "next()" method call, it returns an object with two properties: "value" and "done".                                         |
|                                                                                                                                                          | 
|  🟡 Generator function is a special type of function that can be exited and later re-entered, maintaining its context (variable bindings) across         |
|     re-entrances. It is defined using function* syntax and uses "yield" keyword to produce a series of values on demand.                                 | 
|                                                                                                                                                          | 
|  🟡 Every time "next()" is called on generator object, it runs until it hits the next "yield" statement. To stop the generator, we can use "return()"    |
|       method which will terminate the generator and return the given value.                                                                              |
|                                                                                                                                                          | 
|  🟡 To make any object iterable through "for...of", "spread operator", "destructuring", etc., we need to implement [Symbol.iterator]() method which      |
|      returns an iterator object. So these "for...of", "spread operator", etc. needs an iterable object to work with.                                     | 
|                                                                                                                                                          | 
|  🟡 In Javascript some build-in objects like Array, String, Map, Set, etc., have already [Symbol.iterator]() method implemented in their prototype,     |
|       making them iterable by default.                                                                                                                   |
|                                                                                                                                                          | 
|  🔵 We can build our own custom iterable objects by implementing [Symbol.iterator]() method in them using "generator function"                          |
|                                                                                                                                                          | 
|                                                                                                                                                          | 
+--------------------------------------------------------------------------+ END +-------------------------------------------------------------------------+
*/

function* itt(start = 0, end = Infinity) {
  let count = 0;
  for (let i = 0; i < end; i++) {
    count++;
    yield count;
  }
  console.log("Calling return().....");
  return count;
}

gen.next();

const obj = {
  arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // At the start we use "*" to define generator function, we can pass arguments into "generator function" through "next()" method
  *[Symbol.iterator](...args) {
    for (let i = 0; i < this.arr.length; i++) {
      yield this.arr[i];
    }
  },
};

// By default object is not iterable using for...of, but after implementing [Symbol.iterator]() method, it becomes iterable
for (const i of obj) {
  console.log(i);
}

console.log([...obj]);

const [a, b, c] = obj;
