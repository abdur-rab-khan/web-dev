/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                       TOP LEVEL FILES                                                                     |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Commonly in these files we add all the configuration of our apps, following are common one.                                                            |
|                                                                                                                                                           |
|    1. proxy.ts: Similar to proxy server before every request the block of code run written in proxy.ts|js, It returns two things "proxy function",        |
|                 "config [optional]" (accept regex or list of paths). SEE MORE FROM HERE https://nextjs.org/docs/app/api-reference/file-conventions/proxy  |
|                                                                                                                                                           |
|    2. next.config.js: For Configuring next js app. --> SEE FROM HERE: https://nextjs.org/docs/app/api-reference/config/next-config-js                     |
|                                                                                                                                                           |
| 🔷 SEE MORE FROM HERE: https://nextjs.org/docs/app/getting-started/project-structure#top-level-files                                                      |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                     FILES IN ROUTE FOLDER                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Every route folders could have following files based on our need, like "page" is every important it should have every route folder to be work.         |
|                                                                                                                                                           |
|    1. layout: It's similar to the component where we put "outlet", So every children route will share same "layout".                                      |
|                                                                                                                                                           |
|       🔷 There is no direct way to pass any props to the children route and layout doesn't re-render, to pass on we have only one option "params".        |
|                                                                                                                                                           |
|       🔶 Props:                                                                                                                                           |
|                1. "children": React.Node                                                                                                                  |
|                2. "params": Promise<{...type}> => "await" will only work with server component, For client like inside page we could use "use" react hook.|
|                                                   By using LayoutProps<"/path">, It will automatically give the type of it.                               |
|                                                                                                                                                           |
|       🔵 Layout don't re-render to access query params on component we could use "useSearchParams()", To get current Pathname we                          |
|           could use "usePathname".                                                                                                                        |
|                                                                                                                                                           |
|       🔵 For path "/users/[search]", params will be { search }, SEE MORE FROM HERE: https://nextjs.org/docs/app/api-reference/file-conventions/layout     |
|                                                                                                                                                           |
|                                                                                                                                                           |
|    2. page: It's the UI part of the route, every route should have page file, and it should export default function. It could be server or client         |
|             component, by default it's server component, We use "use client" directive to make it client component.                                       |
|                                                                                                                                                           |
|       🔷 Props:                                                                                                                                           |
|                1. "params": Promise<{...type}> => It gives the dynamic params of the route, "/users/[search]" => { search }                               |
|                2. "searchParams": Promise<{...type}> => It gives the query params of the route, "/users/search?q=abc" => { q: abc }                       |
|                                                                                                                                                           |
|       🔶 For client component we could use "use" react hook to get params and searchParams                                                                | 
|                                                                                                                                                           |
|       🟡 SEE MORE FROM HERE: https://nextjs.org/docs/app/api-reference/file-conventions/page                                                              |
|                                                                                                                                                           |
|                                                                                                                                                           |
|    3. loading: It's similar to adding "<Suspense fallback={<Loading/>}>" in react, but here we don't need to add suspense, just create loading file and   |
|                 export default component. Instead using "loading.js" we could directly use "<Suspense fallback={<Loading/>}>" in page or layout file.     |
|                                                                                                                                                           |
|                                                                                                                                                           |
|    4. not-found: It will show when the page is not found or we can directly use "notFound()" function from "next/navigation" to show not-found page.      |
|                                                                                                                                                           |
|      🟡 SEE MORE FROM HERE: https://nextjs.org/docs/app/api-reference/file-conventions/not-found                                                          |
|                                                                                                                                                           |
|                                                                                                                                                           |
|    5. error: It allows us to handle error in our route, it could be occurred by "throw new Error('Error message')", during fetch data.                    |
|                                                                                                                                                           |
|       🔷 Props:                                                                                                                                           |
|                1. "error": Error => It gives the error object which we throw in page or layout file.                                                      |
|                2. "error.message": string => It gives the error message which we throw in page or layout file.                                            |
|                3. "error.digest": string  => It gives unique hash of the error we would use see in server log to find the error.                          |
|                4. "reset": () => void => It gives the function to reset the error boundary, it will re-render the page or layout.                         |
|                                                                                                                                                           |
|       🔷 We can use "global-error" to handle all the errors in our app, next js will automatically create "metaData" for the error page.                  |
|                                                                                                                                                           |
|    6. route.js: It allows us to build our own custom http request, Using Web "Request" and "Response" API, It gives us more control over the request      |
|                 and response, we can also use it to create our own custom API route.                                                                      | 
|                                                                                                                                                           |
|       🔷 Props:                                                                                                                                           |
|                1. "request": NextRequest => It gives the request object of the route, it has all the properties of web "Request" object with some         |
|                                             extra properties.                                                                                             |
|                                                                                                                                                           |
|                2. "context": RouteContext<"/path"> => It gives the context of the route such as "params" and it return in the form of promise.            |
|                                                                                                                                                           |
|       🔶 We can also get the access of "headers", "cookies" SEE MORE FROM HERE: https://nextjs.org/docs/app/api-reference/file-conventions/route          |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                  NESTED AND DYNAMIC ROUTE                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 NESTED ROUTE: We can create nested route by creating folder inside route folder, for example "/users/profile" => "app/users/profile/page.js".          | 
|                                                                                                                                                           |
| 🟡 DYNAMIC ROUTE: We can create dynamic route by adding "[]" in the folder name, for example "/users/[id]" => "app/users/[id]/page.js".                   |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                GROUPS AND PRIVATE FOLDERS                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 GROUP ROUTE: It's special director that does'nt include in the route path, Which helps to organize our routes, which can have their own "layout"       |
|                  and "loading" file. by using "()" before folder name.                                                                                    | 
|                                                                                                                                                           |
|                 Example: Dashboard page has two routes "/dashboard/analytics" and "/dashboard/sales", we can create                                       |
|                          "app/dashboard/(analytics-sales)/page.js" instead of creating two separate folders for analytics and sales.                      |
|                                                                                                                                                           |
| 🟡 PRIVATE FOLDER: It's also special director that does'nt include in the route path, Which helps to organize our files. by using "_" before folder name. |
|                                                                                                                                                           |
|                 Example: We have some components which are only used in one route, we can create "app/users/_components/UserCard.js" instead of creating  |
|                          "app/users/UserCard.js", It will help to keep our project clean and organized.                                                   |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
