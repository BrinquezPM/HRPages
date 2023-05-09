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
import UserForm from "./components/UserForm/UserForm";

import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm/UserForm";
import "./App.css";
import { AuthProvider, RequireAuth } from "react-auth-kit";

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
        element: (
          <RequireAuth loginPath="/login">
            <LoginPage />
          </RequireAuth>
        ),
      },
      {
        path: "/applicants",
        element: (
          <RequireAuth loginPath="/login">
            <Applicants />
          </RequireAuth>
        ),
      },
      {
        path: "/Users",
        element: (
          <RequireAuth loginPath="/login">
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth loginPath="login">
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/applicantDetails",
        element: <ApplicantDetails />,
      },
      {
        path: "/userformcreate",
        element: <UserForm formFunction="Create" />,
      },
      {
        path: "/userformdetails",
        element: <UserForm formFunction="Edit" />,
      },
      {
        path: "/user-form",
        element: <UserForm />,
      },
    ],
  },
  { element: <LoginPage />, path: "/login" },
  {
    element: (
      <RequireAuth loginPath="/login">
        <MainLayout />
      </RequireAuth>
    ),
    path: "/main",
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <RouterProvider router={router} />
  </AuthProvider>
);
