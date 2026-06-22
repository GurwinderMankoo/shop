"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            ShopSphere
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/products">Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* Search */}
          <div className="hidden max-w-md flex-1 px-8 lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <input
                placeholder="Search products..."
                className="h-10 w-full rounded-md border pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <button>
              <Heart className="h-5 w-5" />
            </button>

            <button className="relative">
              <ShoppingCart className="h-5 w-5" />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                3
              </span>
            </button>

            <button>
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button className="relative">
              <ShoppingCart className="h-5 w-5" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                3
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-semibold">Menu</h2>

              <button
                onClick={() => setMobileOpen(false)}
              >
                <X />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <input
                  placeholder="Search..."
                  className="h-10 w-full rounded-md border pl-10 pr-4"
                />
              </div>

              <nav className="flex flex-col gap-4">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/deals">Deals</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/wishlist">Wishlist</Link>
                <Link href="/profile">Profile</Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}