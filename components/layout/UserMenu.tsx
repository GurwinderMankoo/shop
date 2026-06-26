"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "../Provider/AuthProvider";
import Link from "next/link";
import { LogIn } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";

export default function UserMenu() {

    const auth = useAuth();
    const user = auth?.user
    const logout = auth?.logout


    if (!user?.id) {
        return (
            <button>
                <Link href="/sign-in">
                    <LogIn className="h-5 w-5" />
                </Link>
            </button>
        )
    }


    const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();


    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <button className="shrink-0 outline-none">
                    <UserAvatar initials={initials} />
                </button>

            </DropdownMenuTrigger>


            <DropdownMenuContent
                align="end"
                className="w-56"
            >

                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span>
                            {user.firstName} {user.lastName}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>


                <DropdownMenuSeparator />


                <DropdownMenuItem asChild>
                    <Link href="/account/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account/orders">
                        Orders
                    </Link>
                </DropdownMenuItem>


                <DropdownMenuItem asChild>
                    <Link href="/account/settings">
                        Settings
                    </Link>
                </DropdownMenuItem>


                <DropdownMenuSeparator />


                <DropdownMenuItem
                    className="text-destructive"
                    onClick={logout}
                >
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}