import { ThemeProvider } from "./components/theme-provider";

import { ReactNode } from "react";

interface AppProps {
    children: ReactNode;
}

export default function App({ children }: AppProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    );
}
