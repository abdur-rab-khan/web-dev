/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                     FETCHING DATA                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                                     |
| 🟡 Server Components: To fetch data in server component we can directly use "fetch", by default fetch does'nt cache anything but "next.js" by default caches the data during build  | 
|    time, So it generate the STATIC HTML during build time, and it will be same until we re-build the app again.                                                                     |
|                                                                                                                                                                                     |
|    🔷 If we want fresh data for every request then we can use "fetch" with "cache: 'no-store'" option, but if we wan whole page to be re-rendered on every request then we can use |
|        "export const dynamic = 'force-dynamic';" in page.tsx file.                                                                                                                  |
|                                                                                                                                                                                     |
|    🔷 If we want to revalidate the data after some time then we can use "fetch" with "next: {revalidate: 10}" option, it will revalidate the data after every 10 seconds.           |
|                                                                                                                                                                                     |
| 🟡 Client Components: To fetch data in client component we can use "useEffect" hook, as we know "loading.ts" file only works with "server components", "use" hook, "React Query"    | 
|                        and "SWR" are some of the options to fetch data in client components.                                                                                        |
|                                                                                                                                                                                     |
|    🔷 "use": We can directly use "use" hook in client component with "fetch", Or we can pass "fetch" promise from server component to client component and use it there.            |
|                                                                                                                                                                                     |
|    🔷 "React Query" and "SWR": Both are popular libraries for data fetching in React applications, they provide features like caching, revalidation, and more. We can use them in   |
|         client components to fetch data.                                                                                                                                            |
|                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                     UPDATING DATA                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                                     |
| 🟡 Server Functions (Server Actions): It's a normal async function with "use server" directive only difference is runs on server and can be called from any "client/server"         |
|                                        component, we can perform any server-side logic inside it like updating the database, calling external APIs, etc.                            |
|                                                                                                                                                                                     |
|    ⭐ It's similar to "API Routes", following are some of the differences between "Server Actions" and "API Routes":                                                                |
|                                                                                                                                                                                     |
|              1. "Direct call": We can directly call server actions from client components without making an HTTP request, but in API routes we need to make an HTTP request to      |
|                                 call the API route.                                                                                                                                 |
|                                                                                                                                                                                     |
|              2. "Convenience": Server actions can be created and used in the same "Server Component" file, and can be passed down to "Client Components" as props, but API routes   |
|                                need to be created in separate files inside "pages/api" directory and then need to be called from client components.                                 |    
|                                                                                                                                                                                     |
|              3. "Built-in features": On both server actions and API routes we can use built-in features like "revalidatePath", "revalidateTag", "cookies", "headers", etc.          |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
