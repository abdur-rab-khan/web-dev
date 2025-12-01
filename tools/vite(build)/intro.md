# Vite

> A **vite** is a powerful build tool that provide faster, simpler development experience for modern web projects. It consists two things **"dev server"**, **"build tool" (To build code using rollup)**.

- [Vite](#vite)
  - [Why vite](#why-vite)
  - [Features of vite](#features-of-vite)

## Why vite

- There are many similar tool exists such as **(webpack, rollup and parcel)** which works good in a production (build app) but lack on development side.
- When starting dev server, these builder build entire application before it can be served.
- These tools supports HMR (Hot Module Replacement), file edits can takes couple of seconds to reflect in the browser.
- **_Vite_** cames to solve issues, when starting dev server it divide the modules of app into two categories:
  1. **Dependencies:**
  2. **Source code:**

## Features of vite

- Vite supports several framework or integration with other tools using **plugins**, It's highly extensible via it's **Plugin API** and **Javascript API**.
