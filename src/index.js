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
import "./App.css";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import UserEdit from "./components/UserForm/UserEdit";
import UserProfile from "./routes/UserProfile/UserProfile";
import OtherUserEdit from "./components/UserForm/OtherUserEdit";

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
        path: "/applicants/:pageid",
        element: (
          <RequireAuth loginPath="/login">
            <Applicants />
          </RequireAuth>
        ),
      },
      {
        path: "/users/:pageid",
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
        path: "/applicantDetails/:applicantid",
        element: <ApplicantDetails />,
      },
      {
        path: "/userformcreate",
        element: <UserForm formFunction="Create" />,
      },
      {
        path: "/userformdetails",
        element: <UserEdit formFunction="Edit" />,
      },
      {
        path: "/otheruserformdetails/:username",
        element: <OtherUserEdit formFunction="Edit" />,
      },
      {
        path: "/user-form",
        element: <UserForm />,
      },
      {
        path: "/user-profile/:username",
        element: <UserProfile />,
      },
    ],
  },
  { element: <LoginPage />, path: "/" },
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
