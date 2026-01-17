/*
+-----------------------------------------------------------+ META PROGRAMMING +-----------------------------------------------------------+
|                                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------+
+----------------------------------------------------------+ PROXY IN JAVASCRIPT +---------------------------------------------------------+
+------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                          |
| 🟡 A Proxy in JavaScript is an object that wraps another object (target) that can intercept (or "trap") operations performed on the      |
| target object, followings are some common traps provided by Proxy:                                                                       |                 
|   - get: Intercepts property access.                                                                                                     |
|   - set: Intercepts property assignment.                                                                                                 |
|   - has: Intercepts the in operator.                                                                                                     |
|   - deleteProperty: Intercepts property deletion.                                                                                        |
|   - apply: Intercepts function calls.                                                                                                    |
|   - construct: Intercepts object instantiation using the new keyword.                                                                    |
| 🟡 It is kind of reverse proxy in the world of servers.                                                                                  |               
| 🟡 Proxies are useful for various purposes, such as logging, validation, access control, and creating reactive data structures.          |
| 🟡 Proxy target can be any type of "object", "arrays", "functions", "classes", "etc.                                                     |
|                                                                                                                                          |   
|                                                                                                                                          |                               
|                                                                                                                                          |
| 🔵 Syntax:                                                                                                                               |                   
|                                                                                                                                          |
|     const handler = {                                                                                                                    |           
|        get: function(target, property, receiver){                                                                                        |
|            // Target: The original object being proxied.                                                                                 |
|            // Property: The name of the property being accessed.                                                                         |        
|            // Receiver: The proxy or an object that inherits from the proxy.                                                             |                    
|                                                                                                                                          |               
|            if(property === "name"){                                                                                                      |
|                return "Hello, " + Reflect.get(...arguments); // Custom behavior for "name" property                                      |                                            
|            }                                                                                                                             |       
|                                                                                                                                          |
|            return Reflect.get(...arguments); // Default behavior                                                                         |        
|        }                                                                                                                                 |       
|     }                                                                                                                                    |
|                                                                                                                                          |        
|    const targetObject = {                                                                                                                |             
|        name: "John",                                                                                                                     |         
|        age: 30                                                                                                                           |     
|    };                                                                                                                                    |                                             
|                                                                                                                                          |
|    const proxyObject = new Proxy(targetObject, handler);                                                                                 |
|                                                                                                                                          |
|    console.log(proxyObject.name); // Output: Hello, John                                                                                 |
|                                                                                                                                          |
|                                                                                                                                          |
| ⭐ It's high jacking the get operation of targetObject to add custom behavior when accessing the "name" property on it.                  |
|                                                                                                                                          |   
|                                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------+
+---------------------------------------------------------+ REFLECT IN JAVASCRIPT +--------------------------------------------------------+
+------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                          |
| 🟡 Reflect provides some static methods that correspond to the traps available in Proxy, followings are some common Reflect methods:     |
|  - get: Reflect.get(target, propertyKey, receiver) - Retrieves the value of a property from an object.                                   |
|  - set: Reflect.set(target, propertyKey, value, receiver) - Sets the value of a property on an object.                                   |
|  - has: Reflect.has(target, propertyKey) - Checks if a property exists on an object.                                                     |
|  - deleteProperty: Reflect.deleteProperty(target, propertyKey) - Deletes a property from an object.                                      |
|  - apply: Reflect.apply(target, thisArgument, argumentsList) - Calls a function with a specified this value and arguments.               |
|  - construct: Reflect.construct(target, argumentsList, newTarget) - Creates a new instance of a constructor function.                    |
|                                                                                                                                          |
| 🟡 Reflect methods are often used in conjunction with Proxies to delegate operations back to the original object                         |
|  after custom behavior is applied.                                                                                                       |
|                                                                                                                                          |
| 🔵 Syntax:                                                                                                                               |
|       const handler = {                                                                                                                  |
|            get(target, property, receiver){                                                                                              |
|                // Here change the behavior as needed                                                                                     |
|                if(property === "name"){                                                                                                  |
|                    return "Hello, " + Reflect.get(...arguments); // Custom behavior for "name" property                                  |
|                }                                                                                                                         |
|                                                                                                                                          |
|                // But for other properties, use default behavior                                                                         |
|                return Reflect.get(...arguments); // It's similar to target[property] but safer                                           |
|            },                                                                                                                            |
|            set(target, property, value, receiver){                                                                                       |
|                // Custom behavior                                                                                                        |
|                if(property === "password"){                                                                                              |
|                    // Logic, to hash the password before setting it                                                                      |
|                }                                                                                                                         |
|                                                                                                                                          |
|                // Default behavior                                                                                                       |
|                return Reflect.set(...arguments);                                                                                         |
|            },                                                                                                                            |
|            deleteProperty(target, property){                                                                                             |
|                // Custom behavior                                                                                                        |
|                console.log(`Property ${property} is being deleted`);                                                                     |
|                // Default behavior                                                                                                       |
|                return Reflect.deleteProperty(...arguments);                                                                              |
|            }                                                                                                                             |
|       }                                                                                                                                  |
|                                                                                                                                          |
|    const proxyObject = new Proxy(targetObject, handler);                                                                                 |
|                                                                                                                                          |
| ⭐ Using Reflect methods within Proxy handlers ensures that the original behavior of the target object is preserved while allowing for   |
|                                                                                                                                          |
+-----------------------------------------------------------------+ END +------------------------------------------------------------------+
*/

// Example: Using Proxy and Reflect to control access to a password property
const passwordHandler = {
  get(_, property, receiver) {
    if (property === "password") {
      if (receiver.isAdmin) {
        return Reflect.get(...arguments); // Allow admin to access the password
      } else {
        return "Access Denied"; // Non-admin users cannot access the password
      }
    }

    return Reflect.get(...arguments); // Default behavior for other properties
  },
};

const passwordTarget = {
  username: "user1",
  password: "mySecretPassword",
  isAdmin: false,
};

const passwordProxy = new Proxy(passwordTarget, passwordHandler);
console.log(passwordProxy.password);

// Real world Example: Validation using Proxy and Reflect
const validationHandler = {
  set(target, property, value, receiver) {
    switch (property) {
      case "age": {
        if (typeof value !== "number" || value < 0 || value > 120) {
          throw new Error("Invalid age value");
        }

        return Reflect.set(...arguments); // Default behavior
      }
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          throw new Error("Invalid email format");
        }

        return Reflect.set(...arguments); // Default behavior
      }
      case "password": {
        const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!passwordStrengthRegex.test(value)) {
          throw new Error(
            "Password must be at least 8 characters long and contain both letters and numbers",
          );
        }

        return Reflect.set(...arguments); // Default behavior
      }
      default:
        return Reflect.set(...arguments); // Default behavior for other properties
    }
  },
};

const userTarget = {
  name: "Alice",
  age: 25,
  email: "sfsfs",
  password: "pass123",
};

const userProxy = new Proxy(userTarget, validationHandler);

try {
  userProxy.age = 30; // Valid age
  console.log("Age set to:", userProxy.age);

  userProxy.email = userProxy.email; // Invalid email
} catch (error) {
  console.error(error.message);
}
