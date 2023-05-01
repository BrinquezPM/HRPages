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
import LoginPage from "./routes/LoginPage/LoginPage";
import MainLayout from "./routes/MainLayout/MainLayout";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import UserForm from "./components/UserForm/UserForm";

import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <MainLayout />
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
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/user",
        element: <UserForm />,
      }
    ],
  },
  { element: <LoginPage />, path: "/login" },
  { element: <MainLayout />, path: "/main" },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
