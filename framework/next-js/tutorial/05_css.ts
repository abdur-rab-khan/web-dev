/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                💅 CSS                                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 In NEXT.JS, There are several ways to add CSS Style to our application, such as:                                                                                   |
|                                                                                                                                                                       |
|     1. "Global CSS": We can create a global CSS file (e.g., styles/global.css) and import it in our starting point (e.g., src/app/layout.tsx) to apply styles across  |
|                     the entire application.                                                                                                                           |
|                                                                                                                                                                       |
|     2. "CSS Modules": It provides a way to scope CSS to specific components. We can create a CSS file with the .module.css extension (e.g., Button.module.css) and    |
|                        import it in the corresponding component (e.g., Button.tsx) to apply styles only to that component. We can style like this:                    | 
|                                                                                                                                                                       |
|                        ```css                                                                                                                                         |
|                        .button {                                                                                                                                      |
|                          background-color: blue;                                                                                                                      |
|                          color: white;                                                                                                                                |
|                          padding: 10px 20px;                                                                                                                          |
|                          border: none;                                                                                                                                |
|                          border-radius: 5px;                                                                                                                          |
|                        }                                                                                                                                              |
|                        ```                                                                                                                                            |
|                                                                                                                                                                       |
|                       "USING": In the component file (e.g., Button.tsx), we can import the CSS module and use the defined styles:                                     |
|                                                                                                                                                                       |
|                       ```tsx                                                                                                                                          |
|                       import styles from "./Button.module.css";                                                                                                       | 
|                                                                                                                                                                       |
|                       <Button className={styles.button}>Click Me</Button>                                                                                             |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
