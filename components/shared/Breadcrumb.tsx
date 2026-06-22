'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Breadcrumb() {
    const pathname = usePathname();

    const path = pathname.split("/").filter(Boolean);

    console.log(path);

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
                href="/"
                className="hover:text-foreground"
            >
                Home
            </Link>

            {
                path.map((segment, index, arr) => (
                    <span key={index} className="flex items-center gap-2">
                        <span>/</span>
                        <Link
                            href={`/${path.slice(0, index + 1).join("/")}`}
                            className={`${index === arr.length - 1 ? 'opacity-50 cursor-default' : 'hover:text-foreground'}`}
                        >
                            {segment}
                        </Link>
                    </span>
                ))
            }
        </div>
    )
}
