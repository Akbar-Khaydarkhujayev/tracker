import { LogOut, ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IUser } from "@/api/get-me";
import { baseUrl } from "@/config/axios";
import { useAuth } from "@/context/auth";

export function NavUser({ user }: { user: IUser }) {
    const { dispatch } = useAuth();

    const userInitials = (
        user.first_name.charAt(0) + user.last_name.charAt(0)
    ).toUpperCase();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="md"
                            className="border border-input data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <img
                                    crossOrigin="anonymous"
                                    src={`${baseUrl}/api/${user.photo}`}
                                    alt={user.first_name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.first_name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.phone_number}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <img
                                        crossOrigin="anonymous"
                                        src={`${baseUrl}/api/${user.photo}`}
                                        alt={user.first_name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.first_name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.phone_number}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                dispatch({
                                    type: "CLEAR_TOKEN",
                                })
                            }
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
