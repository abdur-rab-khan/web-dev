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
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                     UPDATING DATA                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
|                                                                                                                                                                                     |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
