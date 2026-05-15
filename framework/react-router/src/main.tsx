import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Home from "./pages/home.tsx";
import HomeLayout from "./homeLayout.tsx";
import FallBackUI from "./components/FallBackUI.tsx";

import { dummyPromise } from "./lib/api.ts";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        middleware: [
          (params) => {
            console.log("Middleware for HomeLayout", params);
          },
        ],
        Component: HomeLayout,
        children: [
          {
            index: true,
            Component: Home,
            HydrateFallback: FallBackUI,
          },
          {
            path: "about",
            // Component: About,
            lazy: async () => {
              const module = await import("./pages/about.tsx");
              return {
                Component: module.default,
              };
            },
            loader: async ({ url }) => {
              console.log("Loader for About Page: ", url.pathname);
              return await dummyPromise(url.pathname);
            },
            HydrateFallback: FallBackUI,
          },
          {
            path: "contact",
            // Component: Contact,
            lazy: async () => {
              const module = await import("./pages/contact.tsx");
              return {
                Component: module.default,
              };
            },
            loader: async ({ url }) => {
              console.log("Loader for Contact Page: ", url.pathname);
              return await dummyPromise(url.pathname);
            },
            HydrateFallback: FallBackUI,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
