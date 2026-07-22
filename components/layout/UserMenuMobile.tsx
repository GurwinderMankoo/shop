'use client'
import Link from "next/link";
import { useAuth } from "../Provider/AuthProvider";
import UserAvatar from "../shared/UserAvatar";
import UserDetails from "../shared/UserDetails";

export default function UserMenuMobile() {
    const auth = useAuth();

    const user = auth?.user

    const initials = user ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() : "";

    if (user?.id) {
        return (
            <div className="mb-6 border-b pb-6 px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    <Link href="/account/profile">
                        <UserAvatar image={user.image} initials={initials} firstName={user.firstName} />
                    </Link>
                    <UserDetails
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="my-2 pb-2 border-b px-4">
            <Link
                href="/sign-in"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
                Sign In
            </Link>
        </div>
    )
}
