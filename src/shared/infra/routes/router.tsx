import { makeHome } from "home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: makeHome(),
  },
]);

export const Router = () => <RouterProvider router={router} />;
