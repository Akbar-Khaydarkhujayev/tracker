import { cn } from "@/lib/utils";
import { Logo } from "./icons";
import { Link, useLocation } from "react-router-dom";
import { mainNav } from "./docs";

export function MainNav() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
                <Logo className="h-6 w-6" />
                <span className="hidden font-bold lg:inline-block">
                    Tracker
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
                {mainNav.map((nav) => (
                    <Link
                        key={nav.title}
                        to={nav.href}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === nav.href
                                ? "text-foreground"
                                : "text-foreground/80"
                        )}
                    >
                        {nav.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
