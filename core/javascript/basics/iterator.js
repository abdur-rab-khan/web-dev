/*
+-----------------------------------------------------------------------+ ITERATOR +-----------------------------------------------------------------------+
|                                                                                                                                                          | 
|  🟡 Iterator in JavaScript is an object that defines "iterator protocol" and returns iterator object to traverse over a collection by using "next()"     |
|       method, as a result of "next()" method call, it returns an object with two properties: "value" and "done".                                         |
|                                                                                                                                                          | 
|  🟡 To make an object iterable we should have to implement "Object.prototype[Symbol.iterator] = generator_function" with custom generator function that  |
|     make an object iterable and make (for...of, spread operator, destructors) work.                                                                      |
|                                                                                                                                                          | 
|  🟡 Generator function is a special type of function that can be exited and later re-entered, maintaining its context (variable bindings) across         |
|     re-entrances. It is defined using function* syntax and uses "yield" keyword to produce a series of values on demand.                                 | 
|                                                                                                                                                          | 
|  🟡 Every time "next()" function returned by the generator, it runs until it hits the next "yield" statement. To stop the generator, we can use          |
|     "return()" method which will terminate the generator and return the given value.                                                                     |
|                                                                                                                                                          | 
|  🟡 In JavaScript some build-in objects like Array, String, Map, Set, etc., have already [Symbol.iterator]() method implemented in their prototype,      |
|       making them iterable by default.                                                                                                                   |
|                                                                                                                                                          | 
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                        IMPORTANT NOTE                                                                    |
+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|  ⭐ If someone ask about iterator in JavaScript, we can say it is a way to tell the JavaScript how to iterate through (for..of, spread operator,         |
|     destructors etc). To build iteration protocol we use iterator function "function* " and to attach iterator function with data structure we could use | 
|     "Object.protocol[Symbol.iterator] = custom-generator-function".                                                                                      | 
|                                                                                                                                                          | 
|  ⭐ It gives a way to iterator on a given object through "step by step" using "Iterator.next()", "yield value" (return value step by step using next()), | 
|      return (to stop the iterator).                                                                                                                      |
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
