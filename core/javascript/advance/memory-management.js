/*
+-----------------------------------+ MEMORY MANAGEMENT IN JAVASCRIPT +------------------------------------+
|                                                                                                          |
| 🟡 Unlike low level programming languages like "c/c++" where memory management done by                   |
|       developer it self.                                                                                 |
| 🟡 In Javascript memory management is done by "Garbage Collector" which is part of Javascript.           |
| 🟡 Garbage Collector automatically allocates memory when objects are created and delete when             |
|       they are no longer used.                                                                           |
|                                                                                                          |
| ⭐ In Programming Languages memory is managed in two ways:                                               |                       
|                                                                                                          |
|   1️⃣. Stack Memory:                                                                                      |
|                    >> Stack memory is used for static memory allocation, it stores primitive             |
|                       data types (number, string, boolean, null, undefined, symbol) and function         |
|                       calls.                                                                             |
|                    >> Stack memory is faster to access but limited in size.                              |
|   2️⃣. Heap Memory:                                                                                       |
|                    >> Heap memory is used for dynamic memory allocation, it stores objects,              |
|                       arrays, and functions.                                                             |
|                    >> Heap memory is larger but slower to access compared to stack memory.               |
|                                                                                                          |
+----------------------------------------+ HOW JAVASCRIPT GC WORKS +---------------------------------------+
|                                                                                                          |
|  1️⃣. Memory allocate when variable defined.                                                              |
|  2️⃣. Release with allocated memory no longer needed                                                      |
|                                                                                                          |
| ⭐ GARBAGE COLLECTOR WORKS                                                                               |
|                                                                                                          |
| 🟡 Javascript uses a technique called "Mark-and-Sweep" for garbage collection, it works in two phases:   |
|                                                                                                          |
|   1️⃣. Mark Phase:                                                                                        |
|                    >> In this phase, the garbage collector identifies which objects are still reachable  |
|                       from the root (global object). It starts from the root and marks all reachable     |
|                       objects.                                                                           |
|   2️⃣. Sweep Phase:                                                                                       |
|                    >> In this phase, the garbage collector goes through the heap memory and              |
|                       collects all unmarked objects, freeing up memory.                                  |
|                                                                                                          |
+----------------------------------------------+ WHAT IS ROOT +--------------------------------------------+
|                                                                                                          |      
| 🟡 The term "root" in the context of garbage collection refers to the starting point from which the      |         
| garbage collector begins its traversal of the object graph to identify reachable objects. In JavaScript, |      
| the root typically includes:                                                                             | 
|                                                                                                          |                                        
    1️⃣. Global Execution Context:                                                                          |
|                       >> The global object (e.g., "window" in browsers, "global" in Node.js) and all     |
|                          variables and functions defined in the global scope.                            |
|   2️⃣. Local Execution Contexts:                                                                          |
|                       >> The local variables and parameters of currently executing functions.            |
|                                                                                                          |                                 
| These roots serve as entry points for the garbage collector to determine which objects are still in use  |                     
|  and which can be safely deallocated.                                                                    |                             
|                                                                                                          |   
+------------------------------------------------+ THE END +-----------------------------------------------+
*/

/*
+--------------------------------------+ FUNCTION BEHAVIOR IN JAVASCRIPT +---------------------------------+
|                                                                                                          |
| 🟡 In Javascript, There are two types of functions with different behavior.                              |   
|                                                                                                          | 
| 1️⃣. "Arrow Function":                                                                                    |                     
|                       >> Arrow function is similar to regular function, but the difference is in "this"  |
|                       binding.                                                                           |
|                       >> Arrow function do have their own "this", they borrow from where they are        |
|                           defined. It arrow function is defined inside a function they                   |
|                           borrow this from him.                                                          |
| 2️⃣. "Regular Function":                                                                                  |
|                       >> Regular function is a function, this looks left (obj.func_name()), it will      |
|                       look at from obj, but if it created direct in the code, it will get                |
|                       from "global/window" this is default behavior.                                     |
|                       >> But Javascript provide some function to change default behavior.                |
|                           1. ".call({...value})" It will directly call the function                      |
|                                   with args as a "this" binding                                          |
|                           2. ".apply({...value})" It will directly call the function                     |
|                                   with args as a "this" binding                                          |
|                           3. ".bind({...value})" It will return a new function with "this" binding       |
|                                    as provided value.                                                    |
|                                                                                                          |                                                
+------------------------------------------+ "use strict" MODE +-------------------------------------------+
|                                                                                                          |
| 🟡 "use strict" is a way to change the behavior of "this" binding in functions, It makes "this"          |
|     undefined in functions instead of "global/window".                                                   |
|                                                                                                          |
+---------------------------------------------------+ END +------------------------------------------------+
*/

/*
+----------------------------------------+ HOW MEMORY LOOKS LIKE +-----------------------------------------+
|                                                                                                          |                           
|⭐ CODE EXAMPLE:                                                                                          |                           
|    var a = 10;                                                                                           |
|    const name = "Javascript"                                                                             |                             
|                                                                                                          |                                             
|    function foo() {                                                                                      |                                     
|        const b = 20;                                                                                     |                                                          
|        const arr = [1, 2, 3, 4, 5];                                                                      |
|        const obj = {                                                                                     |
|            name: 'JavaScript',                                                                           |                           
|            type: 'Programming Language'                                                                  |
|        };                                                                                                |
|                                                                                                          |
|        console.log(a, b, arr, obj);                                                                      | 
|    }                                                                                                     |                     
|                                                                                                          |    
|    foo();                                                                                                |                 
|                                                                                                          |                    
|⭐ How Call Stack and Heap Memory Look Like During Execution:                                             |                                    
|                                                                                                          |                             
+-----------------------------------------------+ CALL STACK +---------------------------------------------+
|                                                                                                          |   
| +------------------------------------------------------------------------------------------------------+ |
| |                              EXECUTION CONTEXT FOR foo()                                             | |
| | +--------------------------------------------------------------------------------------------------+ | |
| | |                                                                                                  | | |
| | | +-------------------------------------------------------------+                                  | | |
| | | |                    LEXICAL ENVIRONMENT                      |                                  | | |
| | | |  +---------------------------+   +-----------------------+  |                                  | | |
| | | |  |  b = 20                   |   |  REFERENCE → Global   |  |  +---------------+ +----------+  | | |
| | | |  |  arr = <ref to Heap>      |   |  Context (outer env)  |  |  | THIS = global | | METADATA |  | | |  
| | | |  |  obj = <ref to Heap>      |   +-----------------------+  |  +---------------+ +----------+  | | |
| | | |  +---------------------------+                              |                                  | | |
| | | +-------------------------------------------------------------+                                  | | |
| | |                                                                                                  | | |
| | +--------------------------------------------------------------------------------------------------+ | |
| +------------------------------------------------------------------------------------------------------+ |
| +------------------------------------------------------------------------------------------------------+ |
| |                                    GLOBAL EXECUTION CONTEXT                                          | |
| | +--------------------------------------------------------------------------------------------------+ | |
| | |                                                                                                  | | |
| | | +-------------------------------------------------------------+                                  | | |
| | | |                    LEXICAL ENVIRONMENT                      |                                  | | |
| | | |  +---------------------------+   +-----------------------+  |                                  | | |
| | | |  |  a = 10                   |   |  REFERENCE → null     |  |   +----------------+  +--------+ | | |
| | | |  |  name = "Javascript"      |   |  (no outer env)       |  |   | THIS = global  |  |METADATA| | | |  
| | | |  |  foo = <ref to Heap>      |   +-----------------------+  |   +----------------+  +--------+ | | |
| | | |  +---------------------------+                              |                                  | | |
| | | +-------------------------------------------------------------+                                  | | |
| | |                                                                                                  | | |
| | +--------------------------------------------------------------------------------------------------+ | |
| +------------------------------------------------------------------------------------------------------+ |
|                                                                                                          |
+-----------------------------------------------+ HEAP MEMORY +--------------------------------------------+
|  +------------------+    +------------------------------------------+    +---------------------------+   |
|  |  foo (function)  |    |  arr = [1, 2, 3, 4, 5]                   |    |  obj = {                  |   |
|  |  [[Code]]        |    |  Array stored in heap                    |    |    name: 'JavaScript',    |   |
|  |  [[Scope]]       |    +------------------------------------------+    |    type: 'Programming...' |   |
|  +------------------+                                                    |  }                        |   |
|                                                                          +---------------------------+   |
+-----------------------------------------------------+ THE END +------------------------------------------+
*/
