/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                METADATA                                                                               |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 Metadata is helpful for SEO and social media sharing. It can be defined as a static object or generated dynamically. In this example, we will see both static      |
|       and dynamic metadata.                                                                                                                                           |
|                                                                                                                                                                       |
| 🟡 NEXT.JS provides two way for defining metadata.                                                                                                                    |
|                                                                                                                                                                       |
|     1. "Static Metadata": This is the simplest way to define metadata. We can define a static object called "metadata" and export it from the page.                   |
|                             This object will be used by Next.js to generate the metadata for the page.                                                                |
|                                                                                                                                                                       |
|     2. "Dynamic Metadata": This is the more advanced way to define metadata. We can define a function called "generateMetadata" and export it from the page.          |
|                             This function will be called by Next.js to generate the metadata for the page.                                                            | 
|                                                                                                                                                                       |
|     1. "title": This is the title of the page. It will be displayed in the browser tab and in search engine results.                                                  | 
|     2. "description": This is the description of the page. It will be displayed in search engine results and in social media sharing.                                 |
|     3. "keywords": This is an array of keywords for the page. It will be used by search engines to understand the content of the page.                                |
|     4. "openGraph": This is an object that contains Open Graph metadata for the page. It will be used by social media platforms to generate rich previews when the    | 
|                     page is shared.                                                                                                                                   |
|     5. "twitter": This is an object that contains Twitter Card metadata for the page. It will be used by Twitter to generate rich previews when the page is shared.   |
|     6. "robots": This is a string that contains the value for the "robots" meta tag. It will be used by search engines to understand how to crawl and index the page. |
|                                                                                                                                                                       |
| 🔶 We can use "template" on title so that it can share the same template across multiple pages. For example, we can define a template like this: "My Site - %s".      |
|     Then we can use it like this: "My Site - Home", "My Site - About", etc.                                                                                           |
|                                                                                                                                                                       |
| ⭐ We can also "cache" the metadata using "generateMetadata" function. This is useful when we want to generate metadata for dynamic pages. We can use the "cache"     |
|    function from "next/cache" to cache the metadata.                                                                                                                  |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
