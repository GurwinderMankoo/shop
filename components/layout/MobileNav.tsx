"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, HeartHandshake, HomeIcon, ListSortDescending, Menu, PackageSearch, PackageSearchIcon, User, X } from "lucide-react";

import UserMenuMobile from "./UserMenuMobile";
import CartButton from "./_CartButton";

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

                {/* Navigation */}
                <nav className="flex flex-col border-b p-4 overflow-auto">
                    <UserMenuMobile>
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <HomeIcon className="h-4 w-4" />
                            Home
                        </Link>

                        <Link
                            href="/products"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <PackageSearch className="h-4 w-4" />
                            Products
                        </Link>

                        <Link
                            href="/categories"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <ListSortDescending className="h-4 w-4" />
                            Categories
                        </Link>

                        <Link
                            href="/deals"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Deals
                        </Link>

                        <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <User className="h-4 w-4" />
                            Contact
                        </Link>

                        <Link
                            href="/wishlist"
                            onClick={closeMenu}
                            className="rounded-md px-3 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <Heart className="h-4 w-4" />
                            Wishlist
                        </Link>

                    </UserMenuMobile>
                </nav>
            </aside>
        </>
    );
}