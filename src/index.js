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
          <RequireAuth loginPath="/">
            <Applicants />
          </RequireAuth>
        ),
      },
      {
        path: "/users/:pageid",
        element: (
          <RequireAuth loginPath="/">
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth loginPath="/">
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/applicantDetails/:applicantid",
        element: (
          <RequireAuth loginPath="/">
            <ApplicantDetails />
          </RequireAuth>
        ),
      },
      {
        path: "/userformcreate",
        element: (
          <RequireAuth loginPath="/">
            <UserForm formFunction="Create" />
          </RequireAuth>
        ),
      },
      {
        path: "/userformdetails",
        element: (
          <RequireAuth loginPath="/">
            <UserEdit formFunction="Edit" />
          </RequireAuth>
        ),
      },
      {
        path: "/otheruserformdetails/:username",
        element: (
          <RequireAuth loginPath="/">
            <OtherUserEdit formFunction="Edit" />
          </RequireAuth>
        ),
      },
      {
        path: "/user-form",
        element: (
          <RequireAuth loginPath="/">
            <UserForm />
          </RequireAuth>
        ),
      },
      {
        path: "/user-profile/:username",
        element: (
          <RequireAuth loginPath="/">
            <UserProfile />
          </RequireAuth>
        ),
      },
    ],
  },
  { element: <LoginPage />, path: "/" },
  {
    element: (
      <RequireAuth loginPath="/">
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
