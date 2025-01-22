import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./config/router";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/auth";

export default function App() {
    const queryClient = new QueryClient();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthProvider>
            <Toaster />
        </ThemeProvider>
    );
}
