/*
+----------------------------------------+ INHERITANCE AND THE PROTOTYPE CHAIN IN JAVASCRIPT +-------------------------------------------------+
|                                                                                                                                              |
| 🟡 In Javascript inheritance is only achieved by using prototype chain, it's bit confusing but we have to know unlike other                  |
|    programming languages in Javascript classes are not means as blueprint, it's just a "syntax sugar" for creating object with               |
|    prototype chaining behind the scene.                                                                                                      |
| 🟡 Every object in Javascript has "[[Prototype]]" and that "[[Prototype]]" has there own, and this chain continue until we reach             |
|    to "null". This is called "Prototype Chain".                                                                                              |
|                                                                                                                                              |
| ⭐ When we try to access a property of an object, Javascript follow the following steps:                                                     |
|    1️⃣. It first look for that property in the object itself                                                                                  |
|    2️⃣. If it doesn't find it there, it look for that property in the object's [[Prototype]]                                                  |
|    3️⃣. If it doesn't find it there, it look for that property in the [[Prototype]] of the object's [[Prototype]]                             |
|    4️⃣. This continue until it reach to null                                                                                                  |
|                                                                                                                                              |
| 🟡 Let's see an example:                                                                                                                     |
|    const obj = { a: 10, b: 20 };                                                                                                             |
|                                                                                                                                              |
|    console.log(obj.a); // 10 --> obj --> a --> found in obj                                                                                  |
|    console.log(obj.l); // 20                                                                                                                 |
|                                                                                                                                              |
| ⭐ obj --> l --> not found in object --> l > [[Prototype]] (Object.prototype) --> Object.prototype > [[Prototype]] (null) --> null --> stop  |
|                                                                                                                                              |
|                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                              HOW PROTOTYPE WORKS                                                             |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                              |
| 🟡 In Javascript event object has their own "prototype", and this chain goes until we reach to "null".                                       |
| 🔵 Let's see the prototype chain of an event object:                                                                                         |
|    const btn = document.querySelector('button');                                                                                             |
|    console.log(btn.__proto__); // HTMLButtonElement.prototype                                                                                |
|    console.log(btn.__proto__.__proto__); // HTMLElement.prototype                                                                            |
|    console.log(btn.__proto__.__proto__.__proto__); // Element.prototype                                                                      |
|    console.log(btn.__proto__.__proto__.__proto__.__proto__); // Node.prototype                                                               |
|    console.log(btn.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget.prototype                                              |
|    console.log(btn.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object.prototype                                         |
|    console.log(btn.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // null                                           |
|                                                                                                                                              |
| ⭐ One of the most interesting thing about prototype chain is that, unlike other programming languages, where if any new object is created,  |
|    it create new copy of the methods and properties of the class, for all new objects.                                                       |
| ⭐ But in Javascript, when a new object is created, it creates a new object but the method and properties are not copied, instead the new    |
|    object get linked to the prototype of the same existing object in the memory. So all the new objects share the same methods and           |
|    properties in the memory, this is called "prototypal inheritance".                                                                        |
| ⭐ In web environment this is very useful, because all the DOM elements can share the same methods and properties without creating new copy  |
|    for each and every element, this saves a lot of memory.                                                                                   |
|                                                                                                                                              |
|                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                      HOW CLASSES ARE WORK IN JAVASCRIPT                                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                              |
| 🟡 As I mentioned earlier, classes in Javascript are just "syntax sugar" for creating objects with prototype chaining behind the scene.      |
| 🔵 Javascript engine perform 4 things under the hood when "new" keyword is used with a class or constructor function:                        |
|    1️⃣. Blank Object Creation: A blank object is created first, In this step always new copy of the object is created in the memory.          |
|    2️⃣. Prototype Linking: Javascript engine looks for the constructor function's prototype '.prototype' property and that memory address is  |
|        linked to the newly created object's [[Prototype]], See there is no copying of methods or properties, just linking.                   |
|    3️⃣. 'this' Binding and Property Assignment: The constructor function is executed with 'this' keyword bound to the newly created object,   |
|        override the default global/window/undefined binding.                                                                                 |
|    4️⃣. The new object is returned from the constructor function.                                                                             |
|                                                                                                                                              |
| 🟡 In Javascript class, function behave differently based on typeof them like (arrow function behave differently than normal function)       |
|    similarly constructor function also behave differently when called with "new" keyword than without "new" keyword.                         |
|    1️⃣. With arrow function: Arrow function as class method will not sit in the prototype, instead it will be created in the object itself.   |
|        So each object will have it's own copy of that method which is memory inefficient.                                                    |
|    2️⃣. Without "new" keyword: If constructor function is called without "new" keyword, it will behave like normal function and 'this'        |
|        keyword will be bound to global/window/undefined based on the mode. So it will not create new object and will not link the prototype. |
|                                                                                                                                              |
|                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                EXAMPLE OF INHERITANCE AND PROTOTYPE CHAIN IN JAVASCRIPT                                      |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                              |
| 🟡 Let's see an example of prototype chain and inheritance in Javascript.                                                                    |
|                                                                                                                                              |
|    function Base() {}                                                                                                                        |
|    function Derived() {}                                                                                                                     |
|                                                                                                                                              |
|    Object.setPrototypeOf(Derived.prototype, Base.prototype); // Set the prototype chain from Derived to Base                                 |
|                                                                                                                                              |
|    const derivedInstance = new Derived(); // Create new object from Derived constructor                                                      |
|                                                                                                                                              |
|    // obj --> derivedInstance --> Derived.prototype --> Base.prototype --> Object.prototype --> null --> stop                                |
|                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                 PERFORMANCE                                                                  |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                              |
| 🟡 As we know if we want to access any property of an object, Javascript first look for that property in the object itself, and if doesn't   |
|    find it there, it look for that prototype chain until it reach to null. This look up in the prototype chain take some time.               |
| 🟡 Which can negatively impact the performance this may be significant in performance critical code or in scenarios involving deep prototype |
|    chains.                                                                                                                                   |
| 🟡 To mitigate the performance impact of prototype chain lookups, consider the following best practices:                                     |
|    1️⃣. hasOwnProperty("key") Check: Use the hasOwnProperty method to check if a property exists directly on the object before accessing it.  |
|    2️⃣. hasOwn(obj, "key") Check: Use Object.hasOwn(obj, "key") to check if a property exists directly on the object before accessing it.     |
|    3️⃣. Avoid Deep Prototype Chains: Minimize the depth of prototype chains to reduce the number of lookups required to access properties.    |
|    4️⃣. Caching Frequently Accessed Properties: Cache frequently accessed properties in local variables to avoid repeated lookups in the      |
|        prototype chain.                                                                                                                      |
|        -- Example:                                                                                                                           |
|        function getProperty(obj, key) {                                                                                                      |
|          if (Object.hasOwn(obj, key)) {                                                                                                      |
|            return obj[key];                                                                                                                  |
|          } else {                                                                                                                            |
|            let prototype = Object.getPrototypeOf(obj);                                                                                       |
|            while (prototype !== null) {                                                                                                      |
|              if (Object.hasOwn(prototype, key)) {                                                                                            |
|                return prototype[key];                                                                                                        |
|              }                                                                                                                               |
|              prototype = Object.getPrototypeOf(prototype);                                                                                   |
|            }                                                                                                                                 |
|            return undefined;                                                                                                                 |
|          }                                                                                                                                   |
|        }                                                                                                                                     |
|    5️⃣. Use Modern JavaScript Features: Utilize modern JavaScript features like classes and modules that can help manage inheritance and      |
|        prototype chains more effectively.                                                                                                    |
|        -- Example:                                                                                                                           |
|        class Base {                                                                                                                          |
|          constructor() {                                                                                                                     |
|            this.baseProperty = "base";                                                                                                       |
|          }                                                                                                                                   |
|        }                                                                                                                                     |
|                                                                                                                                              |
|        class Derived extends Base {                                                                                                          |
|          constructor() {                                                                                                                     |
|            super();                                                                                                                          |
|            this.derivedProperty = "derived";                                                                                                 |
|          }                                                                                                                                   |
|        }                                                                                                                                     |
|                                                                                                                                              |
|        const derivedInstance = new Derived();                                                                                                |
|        console.log(derivedInstance.baseProperty); // Output: "base"                                                                          |
|        console.log(derivedInstance.derivedProperty); // Output: "derived"                                                                    |
|                                                                                                                                              |
|                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                               BUILD IN METHODS                                                               |
+----------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                              |
| 🟡 Some of the built-in methods related to prototype chain and inheritance in Javascript are:                                                |
|    1️⃣. Object.getPrototypeOf(obj): Returns the prototype of the specified object.                                                            |
|    2️⃣. Object.setPrototypeOf(obj, prototype): Sets the prototype of the specified object to another object or null.                          |
|    3️⃣. Object.create(prototype, propertiesObject): Creates a new object with the specified prototype and properties.                         |
|    4️⃣. instanceof operator: Tests whether an object is an instance of a specific constructor or class by checking its prototype chain.       |
|    5️⃣. isPrototypeOf(): Checks if an object exists in another object's prototype chain.                                                      |
|    6️⃣. hasOwnProperty(): Checks if an object has a specific property as its own (not inherited) property.                                    |
|    7️⃣. Object.getOwnPropertyNames(obj): Returns an array of all properties (enumerable or not) found directly on the given object.           |
|                                                                                                                                              |
+-------------------------------------------------------------------+ END +--------------------------------------------------------------------+
*/

// Example of prototype chain in Javascript
let boxes = [
  {
    color: "red",
    getValue() {
      return this.color;
    },
  },
  {
    color: "blue",
    getValue() {
      return this.color;
    },
  },
  {
    color: "green",
    getValue() {
      return this.color;
    },
  },
];

// Notice any problem here? --> All the boxes have same method "getValue" but each box has it's own copy that make the memory inefficient.
// Let's use prototype chain to solve this problem because as we know in prototype chain all the objects can share the same method without creating new copy for each object.
// Above method is similar to how other programming languages like Java, C++ works but with slight difference because in those languages classes are blueprints and each object created from that class has it's own copy of methods and properties.

const boxPrototype = {
  getValue() {
    return this.color;
  },
};

boxes = null;
boxes = [
  {
    value: "red",
    __proto__: boxPrototype,
  },
  {
    value: "blue",
    __proto__: boxPrototype,
  },
  {
    value: "green",
    __proto__: boxPrototype,
  },
];

// Now all the boxes share the same method "getValue" from boxPrototype without creating new copy for each object.
// It works but very inconvenient to set the prototype manually for each object, Let's use "constructor function" with "new" keyword which will set the prototype automatically for every object created from that constructor function.

function Box(color) {
  this.color = color; // Create object with color property
}

// Set the prototype method
Box.prototype.getValue = function () {
  return this.color;
};

boxes = null;
boxes = [new Box("red"), new Box("blue"), new Box("green")];

// Now all the boxes share the same method "getValue" from Box.prototype without creating new copy for each object.
