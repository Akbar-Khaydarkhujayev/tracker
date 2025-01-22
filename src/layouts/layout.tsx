import { SiteHeader } from "@/components/header/site-header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
                <SiteHeader />
                <main className="flex flex-1 flex-col">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
