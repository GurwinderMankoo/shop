import Link from "next/link";

import { Heart } from "lucide-react";
import ProductSearch from "../shared/ProductSearch";
import CartButton from "./_CartButton";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight"
        >
          <Image
            alt="TheShopHub"
            src="/logo.svg"
            width={70}
            height={70}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          {/* <Link href="/deals">Deals</Link> */}
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <ProductSearch />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex shrink-0">
          <Link href="/wishlist">
            <Heart className="h-4 w-4" />
          </Link>

          <CartButton />

          <UserMenu />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <CartButton />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}