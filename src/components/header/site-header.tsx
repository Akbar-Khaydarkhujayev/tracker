import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { NavUser } from "./nav-user";
import { useGetMe } from "@/api/get-me";

export function SiteHeader() {
    const { data: user } = useGetMe();

    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container-wrapper">
                <div className="container flex h-14 items-center">
                    <MainNav />
                    <MobileNav />
                    <div className="flex flex-1 items-center gap-2 justify-end">
                        <nav className="flex items-center gap-4">
                            <ModeToggle />
                            {user && <NavUser user={user} />}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
