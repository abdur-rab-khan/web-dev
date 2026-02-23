/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                     SERVER SIDE COMPONENT                                                                 |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Let's understand "Server Components", So Server Components are re-render on the server by default every components are "Server Components".            |
|     Every time requesting a page, the server will render the page and send the HTML to the client.                                                        |
|                                                                                                                                                           |
| 🟡 It's used to "fetch data", "Using API KEY, token without exposing", reducing amount of Javascript.                                                     |
|                                                                                                                                                           |
| 🟡 Sometime it become slow to render that's why "next.js" using some techniques to make it faster like "Prefetching", "Streaming" and "Caching".          |
|                                                                                                                                                           |
| 🔶 There are two types of "Server Components":                                                                                                            | 
|                                                                                                                                                           |
|    1. "Static Rendering": These components are rendered at build time and the HTML is cached and served to the client. They are ideal for                 |
|                                   static content that doesn't change often, such as a blog post or a product page. By default, all "Server Components"    |
|                                   are "Static Server Components" "unless we use "dynamic" or "force-dynamic" in the component.                            |
|                                                                                                                                                           |
|       🔷 How to make component "Static Rendering":                                                                                                        |
|                                                                                                                                                           |
|           1. By default, all "Server Components" are "Static Server Components" "unless we use "dynamic" or "force-dynamic" in the component.             |
|                                                                                                                                                           |
|           2. "force-static": Route is rendered at build time and the HTML is cached and served to the client.                                             |
|                                                                                                                                                           |
|    2. "Dynamic Rendering": These components are rendered on each request and the HTML is not cached. They are ideal for dynamic content that changes      |
|                                    frequently, such as a user profile or a dashboard. To make a "Server Component" a "Dynamic Rendering"                  |
|                                    we can use "dynamic"  or "force-dynamic" in the component.                                                             |
|                                                                                                                                                           |
|       🔷 How to make component "Dynamic Rendering":                                                                                                       |
|                                                                                                                                                           |
|          1. To make any "Server Components" a "Dynamic Rendering" we can use following techniques:                                                        |
|                                                                                                                                                           |
|             a. "force-dynamic": Route begin Rerendered for each request, and the HTML is not cached.                                                      |
|                                 It's equivalent to fetch("url", { "cache": "no-store" }), "revalidate: 0", "dynamic: 'force-dynamic'".                    |
|                                                                                                                                                           |
|             b. "revalidate: 0": Route begin Rerendered for each request, and the HTML is not cached, or if use "revalidate: 3600" it will invalidate      |
|                                the cache after 3600 seconds and fetch fresh data from the server.                                                         |
|                                                                                                                                                           |
|             c. "cookies(), headers()": Using of these function makes the page dynamic because it depends on the request headers and cookies, so it will   | 
|                                        be re-rendered for each request.                                                                                   |
|                                                                                                                                                           |
| 🟡 "generateStaticParams()": In dynamic route ("/dashboard/[id]"), We should have to use "force-dynamic" -- if multiple routes are their, but if          |
|                              limited routes are their we can use "generateStaticParams()" to generate static params for each route, and it will be        |
|                              rendered at build time and the HTML is cached.                                                                               |
|                                                                                                                                                           |
|    🔵 Example:                                                                                                                                            |
|                                                                                                                                                           |
|              export async function generateStaticParams() {                                                                                               |
|                  return [                                                                                                                                 |
|                      { id: "1" },                                                                                                                         |
|                      { id: "2" },                                                                                                                         |
|                      { id: "3" },                                                                                                                         |
|                  ];                                                                                                                                       |
|              }                                                                                                                                            |
|                                                                                                                                                           |
|    🔷 Instead of making whole route dynamic, we can make it static by using "generateStaticParams()" and it will generate static params for each route,   |
|        and it will be rendered at build time and the HTML is cached.                                                                                      | 
|                                                                                                                                                           |
| ⭐ We could wrap "function" in "React.cache" to cache the result on the server, it only works with server components, if already data is cached it will   |
|     return the cached data, otherwise it will execute the function and cache the result for future use. It's useful for expensive computations            |
|     or data fetching.                                                                                                                                     |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                   CLIENT SIDE COMPONENTS                                                                  |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 Client Components are re-render on the client, and they can use "useState", "useEffect" and other React hooks. They are ideal for interactive          |
|     components that needs to update frequently.                                                                                                           |
|                                                                                                                                                           |
| 🟡 To make "client side component" we need to add "use client" at the top of the file, Now every "imports", "children" are considered as a part of        |
|     "client side component". We can imagine as a tree on a tree if top "node" become "client" all it's "children" also become "client".                   |
|                                                                                                                                                           |
| 🟡 Using "client component" on "server component" doesn't impact on "server component".                                                                   |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                          LINKING                                                                          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                           |
| 🟡 To navigate between pages in "next.js", we can use "Link" component from "next/link". It's simple "<a>" tag but it have some additional features       | 
|    such:                                                                                                                                                  |
|                                                                                                                                                           |
|    1. "prefetching": By default, "next.js" will prefetch the linked page in the background when the "Link" component is in the viewport.                  |
|                      But we can disable or update the prefetching behavior such as fetch on hover, fetch on click, or disable prefetching.                | 
|                                                                                                                                                           |
|    2. "useLinkStatus": This hook allows us to check the status of the linked page, whether it's "prefetched", "pending", or "unloaded".                   |
|                                                                                                                                                           |
| 🔵 Example:                                                                                                                                               |
|                                                                                                                                                           |
|           <Link href="/about" prefetch={false}>                                                                                                           |
|               About Us                                                                                                                                    |
|           </Link>                                                                                                                                         |
|                                                                                                                                                           |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
