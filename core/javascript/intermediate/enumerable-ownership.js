/*
+--------------------------------------------------------+ ENUMERABLE AND OWNERSHIP +---------------------------------------------------------+
|                                                                                                                                             |
| 🟡 In JavaScript Object, an enumerable property is a property that tells whether it can be iterated over in loops like for...in,            |
|  Object.keys(), ...(spread operator) or other methods provided by the object. By default enumerable flag is set to true.                    |
|                                                                                                                                             |
| 🟡 We can update the enumerable flag using Object.defineProperty() method.                                                                  |
|                                                                                                                                             |
| 🟡 Ownership of a property refers to whether the property is directly present on the object itself or inherited from its prototype chain.   |
|                                                                                                                                             |
| 🟡 Javascript provides methods to check whether a property is owned by the object or inherited.                                             |
|                                                                                                                                             |
+-----------------------------------------------+ Methods to check enumerability and ownership +----------------------------------------------+
|                                                                                                                                             |
| 1️⃣. Object.propertyIsEnumerable(prop): This method returns true if the specified property is enumerable and is a direct property            |
|                                         of the object.                                                                                      |
| 2️⃣. Object.hasOwnProperty(prop): This method returns true if the specified property is a direct property of the object, regardless          |
|                                     of its enumerability.                                                                                   |
|                                                                                                                                             |
| 3️⃣. Object.getOwnPropertyNames(obj): This method returns an array of all own property names (including non-enumerable) of the given object. | 
|                                                                                                                                             |
| 4️⃣. Object.getOwnPropertyDescriptors(obj): This method returns an object containing all own property descriptors (including non-enumerable) |
|                                               of the given object.                                                                          |
| 5️⃣. for...in loop: This loop iterates over all enumerable properties of an object, including those inherited from its prototype chain.      |
|                                                                                                                                             |
| 6️⃣. Object.keys(obj): This method returns an array of the object's own enumerable property names.                                           |
|                                                                                                                                             |
| 7️⃣. Object.values(obj): This method returns an array of the object's own enumerable property values.                                        |
|                                                                                                                                             |
| 8️⃣. Object.entries(obj): This method returns an array of the object's own enumerable [key, value] pairs.                                    |
|                                                                                                                                             |
| 9️⃣. Reflect.ownKeys(obj): This method returns an array of all own property keys (including non-enumerable and symbol properties) of         |
|                            the object.                                                                                                      |
|                                                                                                                                             |
+-------------------------------------------------------------------+ END +-------------------------------------------------------------------+
*/
