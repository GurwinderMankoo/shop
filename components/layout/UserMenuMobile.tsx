'use client'
import Link from "next/link";
import { useAuth } from "../Provider/AuthProvider";
import UserAvatar from "../shared/UserAvatar";
import UserDetails from "../shared/UserDetails";

export default function UserMenuMobile({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    const user = auth?.user

    const initials = user ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() : "";

    return (
        <div>
            {user?.id ?
                <nav className="flex flex-col gap-4">
                    <div className="mb-3 flex flex-col items-center justify-center text-center">
                        {user && <Link href="/account/profile"><UserAvatar initials={initials} /></Link>}
                        <UserDetails
                            firstName={user.firstName}
                            lastName={user.lastName}
                            email={user.email}
                        />
                    </div>
                    {children}
                    <Link href="/sign-out">Sign-out</Link>
                </nav>
                :
                <Link href="/sign-in">Sign-in</Link>}
        </div>
    )
}
