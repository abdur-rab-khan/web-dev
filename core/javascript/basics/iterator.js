/*
+-----------------------------------------------------------------------+ ITERATOR +-----------------------------------------------------------------------+
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
|                                                                                                                                                          | 
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
  *[Symbol.iterator](...args) {
    console.log("Generator Arguments are: ", args);
    for (let i = 0; i < this.arr.length; i++) {
      yield this.arr[i];
    }
  },
};

for (const i of obj) {
  console.log(i);
}

console.log([...obj]);

const [a, b, c] = obj;
