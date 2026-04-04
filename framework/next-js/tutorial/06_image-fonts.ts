/*
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                  IMAGE                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 NEXT.JS extends the HTML <img> element with built-in performance optimizations. Following are some of the key features of using the Image component in Next.js:    |
|                                                                                                                                                                       |
|    1. 
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                   FONTS                                                                               |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                       |
| 🟡 NEXT.JS provides a build-in font optimization feature that automatically optimizes our fonts and reduces external network requests.                                |
|                                                                                                                                                                       |
| 🟡 Fonts are scoped with-in the component, To make the font available globally, we should have to include them into main "layout.tsx" file.                           |
|                                                                                                                                                                       |
| 🟡 There are two ways to use fonts in Next.js:                                                                                                                        |
|                                                                                                                                                                       |
|    1. "next/font/google": This is a built-in module that allows you to easily import and use Google Fonts in your Next.js application. It allows to self-host the     |
|                           fonts, which can improve performance and reduce reliance on external services.                                                              | 
|                                                                                                                                                                       |
|                          import { ANY_GOOGLE_FONT } from "next/font/google";                                                                                          |
|                          const font = ANY_GOOGLE_FONT({                                                                                                               |
|                            subsets: ["latin"],                                                                                                                        |
|                            weight: ["400", "700"],                                                                                                                    | 
|                            style: "normal",                                                                                                                           |
|                            display: "swap",                                                                                                                           |
|                          });                                                                                                                                          |
|                                                                                                                                                                       |
|       🔶 "subsets": Specifies the character subsets to include, which can help reduce the font file size and improve loading times.                                   |
|       🔶 "weight": Specifies the font weights to include, allowing you to use different font weights in your application.                                             |
|       🔶 "style": Specifies the font styles to include, such as "normal" or "italic".                                                                                 |
|       🔶 "display": Controls how the font is displayed while it is loading. The "swap" value allows text to be displayed using a fallback font until the custom       |
|                      font is loaded.                                                                                                                                  |
|                                                                                                                                                                       |
|    2. "next/font/local": This module allows you to use local font files in your Next.js application. You can specify the path to your local font files and use them   |
|                           in our application.                                                                                                                         |
|                                                                                                                                                                       | 
|                          import localFont from 'next/font/local'                                                                                                      |
|                                                                                                                                                                       | 
|                          const roboto = localFont({                                                                                                                   | 
|                            src: [                                                                                                                                     |
|                              {                                                                                                                                        |
|                                path: './Roboto-Regular.woff2',                                                                                                        |
|                                weight: '400',                                                                                                                         |
|                                style: 'normal',                                                                                                                       |
|                              },                                                                                                                                       |
|                              {                                                                                                                                        |
|                                path: './Roboto-Italic.woff2',                                                                                                         |
|                                weight: '400',                                                                                                                         |
|                                style: 'italic',                                                                                                                       |
|                              },                                                                                                                                       |
|                              {                                                                                                                                        |
|                                path: './Roboto-Bold.woff2',                                                                                                           |
|                                weight: '700',                                                                                                                         |
|                                style: 'normal',                                                                                                                       |
|                              },                                                                                                                                       |
|                              {                                                                                                                                        |
|                                path: './Roboto-BoldItalic.woff2',                                                                                                     |
|                                weight: '700',                                                                                                                         |
|                                style: 'italic',                                                                                                                       |
|                              },                                                                                                                                       |
|                            ],                                                                                                                                         |
|                          })                                                                                                                                           | 
|                                                                                                                                                                       | 
|                                                                                                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
