"use client"

import Link from 'next/link'
import { navLinks } from './navLinks'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function MobileNavbar() {
    const pathname = usePathname();
    return (
        <nav className="sticky top-16 z-40 mb-6 flex items-center justify-center gap-2 rounded-xl border bg-background p-2 lg:hidden">
            {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            pathname.includes(link.href)
                                ? "bg-muted"
                                : "hover:bg-muted"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    )
}
