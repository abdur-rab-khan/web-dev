/*
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         PROMISE                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                        |
| 🟡 Promise in JavaScript is an object that represents the eventual completion (or failure) of a task and it's resulting value. It takes callback      | 
|    function as a arguments and return a promise object which can be used to handle the asynchronous operation.                                         |
|                                                                                                                                                        |
| 🔷 A Promise is in one of three states:                                                                                                                |
|                                                                                                                                                        |
|    1. Pending: The initial state of a Promise. It is neither fulfilled nor rejected.                                                                   |
|    2. Fulfilled: The state of a Promise when the asynchronous operation has completed successfully. The Promise is resolved with a value.              |
|    3. Rejected: The state of a Promise when the asynchronous operation has failed. The Promise is rejected with a reason (error).                      |
|                                                                                                                                                        |
| 🔶 Promise returns a Promise object that "prototype" has three methods:                                                                                |
|                                                                                                                                                        |
|    1. then(): It takes two optional callback functions as arguments: "First handle if the Promise got fulfilled", "Second handle if the Promise got    |
|               rejected". It returns a new Promise, which allows for chaining multiple then() calls.                                                    |
|                                                                                                                                                        |
|    2. catch(): It's nothing but a shorthand for then(null, onRejected). It is used to handle rejected cases. It also returns a new Promise.            |
|                                                                                                                                                        |
|    3. finally(): It's nothing but a then after the "Promise is settled and catch is handled". It is used to execute a callback function regardless     |
|                  of the Promise's outcome (fulfilled or rejected). It also returns a new Promise.                                                      |
|                                                                                                                                                        |
+------------------------------------------------------------------+ PROMISE CHAINING +------------------------------------------------------------------+
|                                                                                                                                                        |
| 🟡 Before "Promise", To handle asynchronous operations that depends on the result of previous asynchronous operation, we used to write nested          |
|     callbacks which is called "Callback Hell". But with "Promise", we can chain multiple then() calls to handle such scenarios.                        |
|                                                                                                                                                        |
| 🔷 For Example (callback hell):                                                                                                                        |
|                                                                                                                                                        |
|     function fetchData(callback) {                                                                                                                     |
|         setTimeout(() => {                                                                                                                             |
|             const data = "Data fetched";                                                                                                               |
|             callback(data);                                                                                                                            |
|         }, 1000);                                                                                                                                      |
|     }                                                                                                                                                  |
|                                                                                                                                                        |
|     fetchData((data) => {                                                                                                                              |
|         console.log(data);                                                                                                                             |
|         fetchData((data) => {                                                                                                                          |
|             console.log(data);                                                                                                                         |
|             fetchData((data) => {                                                                                                                      |
|                 console.log(data);                                                                                                                     |
|             });                                                                                                                                        |
|         });                                                                                                                                            |
|     });                                                                                                                                                |
|                                                                                                                                                        |
| 🟡 In Promise chaining, It waits to resolve the first then() before moving to the next then() "(If it returned a Promise)". If any of the then()       |
|     throws an error, it will skip all the remaining then() and move to the catch() block.                                                              | 
|                                                                                                                                                        |
| 🟡 Always try to return a value from the then() block, if you don't return anything, it will return undefined and the next then() will receive         |
|     undefined as an argument.                                                                                                                          |
|                                                                                                                                                        |
+-------------------------------------------------------------------+ PROMISE STATIC +-------------------------------------------------------------------+
|                                                                                                                                                        |
| 🟡 Promise has some static methods that can be used to create and handle Promises.                                                                     |
|                                                                                                                                                        |
|    1. Promise.resolve(value): It returns a Promise that is resolved with the given value. If the value is a Promise, it will be returned as is.        | 
|                                                                                                                                                        |
|    2. Promise.reject(reason): It returns a Promise that is rejected with the given reason. If the reason is a Promise, it will be returned as is.      |
|                                                                                                                                                        |
| 🔶 Static functions for handling promise:                                                                                                              |
|                                                                                                                                                        |
|    1. Promise.all(iterable): It takes an iterable of Promises and returns a single Promise that resolves when all of the promises in the iterable have |
|                              resolved or when the iterable contains no promises. If any of the promises in the iterable reject, It "won't effect the   |
|                              other promises but it will reject the returned promise with the reason of the first promise that rejected".               |
|                             => All the promises handled in parallel.                                                                                   | 
|                                                                                                                                                        |
|                                                                                                                                                        |
|                                                                                                                                                        |
|    2. Promise.allSettled(iterable): It takes an iterable of Promises and returns a single Promise that resolves when all of the promises in the        | 
|                                     iterable have settled (either resolved or rejected). The returned Promise resolves with an array of objects that   | 
|                                     describe the outcome of each promise in the iterable.                                                              | 
|                                                                                                                                                        |
|    3. Promise.race(iterable): It runs the promises in Parallel and returns a single Promise that resolves or rejects as soon as one of the promises    |
|                               in the iterable resolves or rejects, with the value or reason from that promise.                                         | 
|                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         EVENT LOOP                                                                     |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                        |
| 🟡 To understand "event loops" we have to know JavaScript is a "single-threaded" language, But some "Web API's" which run "asynchronously"             |
|    So to handle such asynchronous operations, JavaScript uses an "event loop" has works as follows:                                                    |
|                                                                                                                                                        |
| 🔷 Let's see the concepts of event loops:                                                                                                              |
|                                                                                                                                                        |
|    1. Event Loop: As we know If a Function is called, It gets added to the "call stack" and executed. But if the function is asynchronous such as      | 
|                   setTimeout, fetch, etc. It gets handled by the "Web API" not by the JavaScript engine.                                               | 
|                                                                                                                                                        |
|                  ∎ As asynchronous pushed into call stack, It gets moved to "Callback Queue". Now Event Loop came into the picture, It continuously    | 
|                     checks whether the call stack is empty or not. If it's empty, It takes the first function from the microtask queue if there is any |
|                     else from macrotask queue and pushes it to the call stack for execution.                                                           |
|                                                                                                                                                        |
|    2. Microtask Queue: It's a queue based on "FIFO" (First In First Out) principle. It holds the tasks that are to be executed after the current       |
|                        call stack is empty and before the macrotask queue. Promises' then/catch/finally callbacks are added to the microtask queue.    |
|                                                                                                                                                        |
|                       ∎ It's has higher priority than macrotask queue. So after the call stack is empty, all the tasks in the microtask queue are      | 
|                          executed before moving to the macrotask queue.                                                                                |
|                                                                                                                                                        |
|                       ∎ The popular methods that add tasks to microtask queue are: Promise callbacks (then, catch, finally), MutationObserver callbacks|
|                                                                                                                                                        |
|    3. Macrotask Queue: It's also a queue based on "FIFO" (First In First Out) principle. It holds the tasks that are to be executed after the current  |
|                        call stack is empty and after the microtask queue is empty. setTimeout, setInterval, I/O operations, etc. are added to the      |
|                        macrotask queue.                                                                                                                |
|                                                                                                                                                        |
|                       ∎ The popular methods that add tasks to macrotask queue are: setTimeout, setInterval, setImmediate, I/O operations,              |
|                       requestAnimationFrame callbacks.                                                                                                 |   
|                                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
