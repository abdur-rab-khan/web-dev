/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                   PROXY                                                                               |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 Proxy allows us to run specific block of code for specific routes. It is useful for running code on every request, such as authentication, logging, etc. It can    |
|     also be used to redirect requests to other routes.                                                                                                                |
|                                                                                                                                                                       |
| 🔶 There are two ways to define a proxy:                                                                                                                              |
|                                                                                                                                                                       |
|    a. "matcher" property: This is the most common way to define a proxy. It allows us to specify a path pattern that will trigger the proxy.                          | 
|                            For example, if we set the matcher to "/meta/:path*", any request that starts with "/meta" will trigger the proxy. The ":path*" part is    | 
|                            a wildcard that matches any path after "/meta".                                                                                            |
|                                                                                                                                                                       |
|    b. "proxy" function: Here, we define piece of code that will run for every request. This is useful for running code on every request, such as authentication,      |
|                         logging, etc. It can also be used to redirect requests to other routes.                                                                       | 
|                                                                                                                                                                       |
|       Note: Proxy function much be exported as default export, or exported with the name "proxy" and file extension must be "proxy.js|ts".                            |
|                                                                                                                                                                       |
| 🔶 Proxy function gave an "argument" of type "NextRequest" and must return a "NextResponse". Using it we can "redirect" or "rewrite" it based on condition.           |
|                                                                                                                                                                       |
| ⭐ SEE MORE ABOUT PROXY: https://nextjs.org/docs/app/api-reference/file-conventions/proxy                                                                             |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
