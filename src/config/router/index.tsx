import AccountDeletePage from "@/pages/auth/delete";
import LoginPage from "@/pages/auth/login";
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/error/not-found";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AccountDeletePage />,
    },
    // {
    //     path: "/",
    //     element: <AppLayout />,
    //     errorElement: <ErrorPage />,
    //     children: [
    //         {
    //             index: true,
    //             element: <div />,
    //         },
    //         {
    //             path: "users",
    //             element: <Users />,
    //         },
    //     ],
    // },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
