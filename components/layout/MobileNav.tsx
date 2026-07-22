"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, HomeIcon, ListSortDescending, LogOut, Menu, PackageSearch, User, X } from "lucide-react";

import UserMenuMobile from "./UserMenuMobile";
import CartButton from "./_CartButton";
import { useAuth } from "../Provider/AuthProvider";

function SignOutButton({ closeMenu }: { closeMenu: () => void }) {
    const auth = useAuth();
    const user = auth?.user
    const logout = auth?.logout

    if (!user?.id) return null;

    return (
        <div className="border-t p-4">
            <button
                onClick={async () => {
                    await logout?.();
                    closeMenu();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
                <LogOut className="h-4 w-4" />
                Sign Out
            </button>
        </div>
    );
}

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    const closeMenu = () => setOpen(false);

    return (
        <>
            {/* Menu Button */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={closeMenu}
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b px-4">
                    <h2 className="text-lg font-semibold">Menu</h2>

                    <button
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* User Section */}
                <UserMenuMobile />

                {/* Navigation Links */}
                <nav className="flex flex-col p-4 overflow-auto gap-1">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium transition-colors"
                    >
                        <HomeIcon className="h-4 w-4" />
                        Home
                    </Link>

                    <Link
                        href="/products"
                        onClick={closeMenu}
                        className="rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium transition-colors"
                    >
                        <PackageSearch className="h-4 w-4" />
                        Products
                    </Link>

                    <Link
                        href="/categories"
                        onClick={closeMenu}
                        className="rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium transition-colors"
                    >
                        <ListSortDescending className="h-4 w-4" />
                        Categories
                    </Link>

                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium transition-colors"
                    >
                        <User className="h-4 w-4" />
                        Contact
                    </Link>

                    <Link
                        href="/wishlist"
                        onClick={closeMenu}
                        className="rounded-md px-3 py-2 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium transition-colors"
                    >
                        <Heart className="h-4 w-4" />
                        Wishlist
                    </Link>
                </nav>

                {/* Sign Out at the bottom */}
                <SignOutButton closeMenu={closeMenu} />
            </aside>
        </>
    );
}