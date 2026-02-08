/*
+------------------------------------------------------------------+ JAVASCRIPT OVERVIEW +------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 JavaScript is a multi-paradigm, dynamic language with types and operators, standard built-in objects, and methods.                                     |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                        DATA TYPE                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Javascript offers two types of variable.                                                                                                               |
|                                                                                                                                                           |
|    1️⃣. Primitive:                                                                                                                                         |
|        1️⃣. Number: Used for all types of (numbers and float).                                                                                             |
|        2️⃣. BigInt: Used for large integer.                                                                                                                |
|        3️⃣. String: Used to store text                                                                                                                     |
|        4️⃣. Boolean: True/False --> (0, "", NaN, null, undefined, false) these are falsy value and other than this is truthy.                              |
|        5️⃣. Symbol: Used to store unique identifier for object to prevent collision.                                                                       |
|        6️⃣. Undefined: Indicating variable that has not been assigned a value                                                                              |
|        7️⃣. Null: Indicating none-value                                                                                                                    |
|                                                                                                                                                           |
|    2️⃣. Non-Primitive (Everything else other than primitive are objects):                                                                                  |
|                                                                                                                                                           |
|        1️⃣. Function                                                                                                                                       |
|        2️⃣. Array                                                                                                                                          |
|        3️⃣. Map                                                                                                                                            |
|        4️⃣. RegExp                                                                                                                                         |
|        5️⃣. Error                                                                                                                                          |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                        VARIABLE                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Javascript offers two ways to declare a variable.                                                                                                      |
|                                                                                                                                                           |
|    1️⃣. var: Used to declare a variable with global or function scope, means the variable can be accessed outside the block scope.                         |
|    2️⃣. let: Used to declare a variable with block scope, means the variable can be accessed only inside the block scope.                                  |
|    3️⃣. const: Used to declare a constant variable with block scope, means the variable can be accessed only inside the block scope and cannot             |
|                be reassigned.                                                                                                                             |
|                                                                                                                                                           |
| 🔶 Example:                                                                                                                                               |
|                                                                                                                                                           |
|    +-----------------------------------------+                                                                                                            |
|    |    Javascript Execute line by line      |                                                                                                            |
|    |                                         |                                                                                                            |
|    | ↑                                       |                                                                                                            |
|    | | // This become temporal dead zone for |                                                                                                            |
|    | | // (a, b, z)                          |                                                                                                            |
|    | | // Assessing a -> undefined           |                                                                                                            |
|    | | // b, x --> Ref error                 |                                                                                                            |
|    | ↓                                       |                                                                                                            |
|    |                                         |                                                                                                            |
|    | var a = 5;                              |                                                                                                            |
|    | let b = 55;                             |                                                                                                            |
|    | const x = 80;                           |                                                                                                            |
|    |                                         |                                                                                                            |
|    +-----------------------------------------+                                                                                                            |
|                                                                                                                                                           |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                       OPERATORS                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Javascript offers various types of operators to perform operations on variables and values.                                                            |
|                                                                                                                                                           |
|   1️⃣. Arithmetic Operators: +, -, *, /, %, ++, --                                                                                                         |
|   2️⃣. Assignment Operators: =, +=, -=, *=, /=, %=                                                                                                         |
|   3️⃣. Comparison Operators: ==, ===, !=, !==, >, <, >=, <=                                                                                                |
|   4️⃣. Logical Operators: &&, ||, !                                                                                                                        |
|   5️⃣. Bitwise Operators: &, |, ^, ~, <<, >>, >>>                                                                                                          |
|                                                                                                                                                           |
|   1️⃣. "+" operator is used for both addition and concatenation. If either operand is a string, it performs concatenation. Otherwise, it performs addition.|
|                                                                                                                                                           |
|+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                          OBJECT                                                                           |
|+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Objects are collections of key-value pairs, where keys are strings (or Symbols) and values can be of any data type.                                    |
| 🟡 Javascript objects are configurable, meaning we can customize their properties and methods behaviors.                                                  |
|                                                                                                                                                           |
| 🔶 There are two types of properties in an object:                                                                                                        |
|                                                                                                                                                           |
|   1️⃣. Data Properties: These properties store values and have attributes like writable, enumerable, and configurable.                                     |
|   2️⃣. Accessor Properties: These properties are defined by getter and setter functions, allowing for controlled access to the property value.             |
|                                                                                                                                                           |
|  🔶 Example (Data Properties):                                                                                                                            |
|                                                                                                                                                           |
|   Object.defineProperty(obj, 'propertyName', {                                                                                                            |
|       value: 42,                // The value of the property                                                                                              |
|       writable: false,          // The property cannot be changed                                                                                         |
|       enumerable: true,        // The property will show up during enumeration                                                                            |
|       configurable: false      // The property cannot be deleted or reconfigured                                                                          |
|   });                                                                                                                                                     |
|                                                                                                                                                           |
|  Object.getOwnPropertyDescriptor(obj, 'propertyName'); // Returns the property descriptor for 'propertyName'                                              |
|                                                                                                                                                           |
|                                                                                                                                                           |
|  🔶 Example (Accessor Properties):                                                                                                                        |
|                                                                                                                                                           | 
|   // Define an object with accessor properties                                                                                                            |
|   const obj = {                                                                                                                                           |
|       logs: ["message 1", "message 2", "message 3"]                                                                                                       |
|       get value() {                                                                                                                                       |
|           return this.logs[this.logs.length - 1];                                                                                                         |
|       },                                                                                                                                                  |
|       set value(newValue) {                                                                                                                               |
|           this.logs.push(newValue);                                                                                                                       |
|       }                                                                                                                                                   |
|   };                                                                                                                                                      |
|                                                                                                                                                           |
|+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                          ARRAY                                                                            |
|+----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Array is a special type of object used to store ordered collections of values. Arrays in JavaScript are dynamic, meaning they can grow and shrink      |
|    in size.                                                                                                                                               | 
| 🟡 In Javascript, Array can store multiple data types including primitive and non-primitive types.                                                        |
| 🟡 Javascript also provide typed arrays to store specific data types like Int8Array, Float32Array, etc.                                                   |
|                                                                                                                                                           |
|                                                                                                                                                           |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                               Maps, Sets, WeakMaps, WeakSets                                                              |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Map is a collection of key-value pairs where keys can be of any data type. It maintains the order of insertion and allows for efficient retrieval of   |
|    values based on their keys.                                                                                                                            |
| 🟡 Set is a collection of unique values, meaning it does not allow duplicate entries. It is useful for storing distinct items and performing set          |
|    operations like union, intersection, and difference.                                                                                                   |
| 🟡 WeakMap is similar to Map but with weakly held keys, meaning that if there are no other references to a key object, it can be garbage collected.       |
| 🟡 WeakSet is similar to Set but with weakly held objects, meaning that if there are no other references to an object in the WeakSet, it can be garbage   |
|    collected. weakmap, weakset are commonly used in dom manipulation to prevent memory leaks.                                                             |
|                                                                                                                                                           |
| Example:                                                                                                                                                  |
|                                                                                                                                                           |
|       const btn = document.getElementById("buyBtn");                                                                                                      |                               
|      // private + auto cleanup                                                                                                                            |                         
|      const buttonData = new WeakMap();                                                                                                                    |
|                                                                                                                                                           | 
|      // bind private data                                                                                                                                 |
|      buttonData.set(btn, {                                                                                                                                |
|          userId: 101,                                                                                                                                     | 
|          isPaid: false                                                                                                                                    | 
|      });                                                                                                                                                  |
|                                                                                                                                                           |
|      // click event                                                                                                                                       | 
|      btn.addEventListener("click", () => {                                                                                                                |
|          const data = buttonData.get(btn);                                                                                                                | 
|          data.isPaid = true;                                                                                                                              | 
|          console.log("Payment done for user:", data.userId);                                                                                              |
|      });                                                                                                                                                  |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                          Coercion                                                                         |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 In Javascript, coercion is a process of converting a value from one data type to another. Coercion can be implicit (automatic) or explicit (manual).   |
| 🟡 Javascript does not perform coercion randomly, it follows specific rules to determine when and how to coerce values based on the context of the        | 
|     operation.                                                                                                                                            |
|                                                                                                                                                           |
+-------------------------------------------------------------------+ RULES FOR COERCION +------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Coercion is total depends on operands type and operator used in the expression.                                                                        | 
|                                                                                                                                                           |
| 🔵 With "+" operator:                                                                                                                                     |
|                                                                                                                                                           |
|    1️⃣. If one of the operand is string, it performs concatenation.                                                                                        | 
|    2️⃣. If left and right operands are number, it performs addition.                                                                                       |
|                                                                                                                                                           |
| 🔵 With other Math operators (-, *, /, %, <, >, <=, >=)                                                                                                   |
|                                                                                                                                                           |
|    1️⃣. It converts both operands to number type and performs the operation.                                                                               |
|    2️⃣. If not possible to convert, it results in NaN.                                                                                                     |
|                                                                                                                                                           |
| 🔵 With Comparison operators (==, !=):                                                                                                                    | 
|                                                                                                                                                           |
|   1️⃣. It converts both operands to same type and then performs the comparison.                                                                            |
|   2️⃣. If one operand is boolean, other operand is converted to number (true -> 1, false -> 0) before comparison.                                          | 
|                                                                                                                                                           |
| 🔵 With Logical operators (&&, ||, !) or (if, while, for):                                                                                                |
|                                                                                                                                                           |
|   1️⃣. It converts operands to boolean type and then performs the operation.                                                                               |
|                                                                                                                                                           |
| 🔵 With === and !== operators:                                                                                                                            |
|                                                                                                                                                           |
|  1️⃣. No coercion is performed, it checks both value and type for equality/inequality.                                                                     |
|                                                                                                                                                           |
| ⭐ Note: Checking in Javascript is always run from left to right, so the first operand type is considered for coercion rules.                             |
| ⭐ Note: Objects are compared by reference, not by value. Two different objects with identical properties are considered unequal.                         |
| ⭐ Note: Always use === and !== or if NaN check is required use Object.is() method to avoid unexpected coercion results.                                  |
|                                                                                                                                                           |
+--------------------------------------------------------------------------+ END +--------------------------------------------------------------------------+
*/
