"use client";

import { Package, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";


export default function DesktopNavbar() {

    const pathname = usePathname();

    return (
        <aside className="hidden lg:block rounded-lg border bg-card p-4">
            <nav className="space-y-2">

                {
                    navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors ${pathname.includes(link.href) ? "bg-muted" : ""}`}
                        >
                            <link.icon className="h-5 w-5" />
                            {link.name}
                        </Link>
                    ))
                }
            </nav>
        </aside>
    )
}
