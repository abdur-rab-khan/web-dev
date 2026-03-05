/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                          CACHING                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 NEXT.JS provides built-in caching mechanisms that prevents to perform heavy computations or frequently accessing data by caching the results, it can cache the     |
|     data during build time, or it can cache the data on runtime and revalidate it after some time, or we can disable caching to fetch fresh data on every request.    |
|                                                                                                                                                                       |
| 🟡 NEXT.JS provides some built-in API's for that:                                                                                                                     |
|                                                                                                                                                                       |
|    🔶 "fetch API": By default "fetch API" doesn't cache anything, But next.js extends the default "fetch API" and it make to able cache data by default.              | 
|                                                                                                                                                                       |
|                    1. "cache": It's an option in "fetch API" that allows us to control the caching behavior of the request.                                           |
|                    2. "next": It's an option that provides "revalidate", "tags" properties to control the caching and revalidation behavior of the request.           |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|     🔶 Cache Components": Next.js also provides a way to cache the results of a component by using "use cache" directive, that automatically caches the results       |
|                         and we could use "cacheTag" to provide tags for controlling the caching and revalidation behavior of the component.                           |                 
|                                                                                                                                                                       |
|                    1. "cacheTag": It's an option that allows us to provide tags for the component, and we can use these tags to revalidate the cached data.           |
|                                                                                                                                                                       |
|                    2. "cacheLife": Gives us the ability to "revalidate cache", "expire cache", "state cache", "clear cache" and more.                                 |
|                                                                                                                                                                       |
|         ⭐ It can be used with any function that runs on the server, it could be "Page", "Layout", "Server Component", "API Route" and more.                          |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                         REVALIDATING                                                                                  |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 After caching the data, we have to revalidate the cached data to make sure that we are serving fresh data to the users, next.js provides some built-in API's to    |
|       revalidate the cached data.                                                                                                                                     |                 
|                                                                                                                                                                       |
|     1. "revalidate('path', 'page' | 'layout):" It's revalidates the entire page or layout, it will revalidate the data and serve the fresh data to the users.         |
|                                                                                                                                                                       |
|     2. "revalidateTag('tag'):" It's revalidates the cached data that is associated with the provided tag, So next time when we request the data, it will serve the    |
|                                 fresh data to the users.                                                                                                              |
|                                                                                                                                                                       |
|     3. "updateTag("data"): It's similar to "revalidateTag", but instead of "revalidating" it immediately expires the cache.                                           |
|                                                                                                                                                                       |
|     4. "revalidatePath('path'):" It's revalidates the cached data that is associated with the provided path, So next time when we request the data, it will serve     |
|                                   the fresh data to the users.                                                                                                        |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
