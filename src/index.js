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
import ApplicantDetails from "./components/ApplicantDetails/ApplicantDetails";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm/UserForm";
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
        path:"/applicantDetails",
        element: <ApplicantDetails />,
      },
      {
        path:"/userformcreate",
        element: <UserForm formFunction="Create" />,
      },
      {
        path:"/userformdetails",
        element: <UserForm formFunction="Edit" />,
      },
    ],
  },
  { element: <LoginPage />, path: "/login" },
  { element: <MainLayout />, path: "/main" },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
