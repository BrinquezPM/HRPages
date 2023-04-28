import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Applicants from "./routes/Applicants";
import Users from "./routes/Users";
import Login from "./routes/Login.js";

import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Applicants />,
      },
      {
        path: "/applicants",
        element: <Applicants />,
      },
      {
        path: "Users",
        element: <Users />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
