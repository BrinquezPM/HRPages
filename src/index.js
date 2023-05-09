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
import ProfilePage2 from "./routes/ProfilePage/ProfilePage2";
import ApplicantDetails from "./components/ApplicantDetails/ApplicantDetails";
import UserEdit from "./components/UserForm/UserEdit";
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
  { element: <LoginPage />, path: "/login" },
  {
    element: <AppLayout />,
    children: [
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
        path: "/applicantDetails/:userId",
        element: <ApplicantDetails />,
      },
      {
        path: "/userformcreate",
        element: <UserForm formFunction="Create" />,
      },
      {
        path: "/userformdetails/:userId",
        element: <UserEdit formFunction="Edit" />,
      },
      {
        path: "/user-form",
        element: <UserForm />,
      },
      {
        path: "/profile2/:userId",
        element: <ProfilePage2 />,
      }
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
