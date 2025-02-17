import AppLayout from "@/layouts/layout";
import AccountDeletePage from "@/pages/auth/delete";
import LoginPage from "@/pages/auth/login";
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/error/not-found";
import Sessions from "@/pages/sessions";
import Users from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Users />,
            },
            {
                path: "/:userId",
                element: <Sessions />,
            },
            {
                path: "dashboard",
                element: <div />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/delete-account",
        element: <AccountDeletePage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
