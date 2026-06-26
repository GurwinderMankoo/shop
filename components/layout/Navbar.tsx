"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import ProductSearch from "../shared/ProductSearch";
import UserMenu from "./UserMenu";
import UserMenuMobile from "./UserMenuMobile";

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
          <ProductSearch />

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex shrink-0">
            <button>
              <Heart className="h-5 w-5" />
            </button>

            <button className="relative">
              <ShoppingCart className="h-5 w-5" />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                3
              </span>
            </button>

            <UserMenu />
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

              <UserMenuMobile>
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/deals">Deals</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/wishlist">Wishlist</Link>
              </UserMenuMobile >
            </div>
          </div>
        </>
      )}
    </>
  );
}