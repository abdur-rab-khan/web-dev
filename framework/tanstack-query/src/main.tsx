import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Query from "./pages/query.tsx";
import Mutation from "./pages/mutation.tsx";
import Suspense from "./pages/suspense.tsx";
import InfiniteQuery from "./pages/infiniteQuery.tsx";

const queryClient = new QueryClient();

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Query />,
      },
      {
        path: "/mutation",
        element: <Mutation />,
      },
      {
        path: "/infinite-query",
        element: <InfiniteQuery />,
      },
      {
        path: "/suspense-query",
        element: <Suspense />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
