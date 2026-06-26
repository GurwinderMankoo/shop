"use client"

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function ProductSearch() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("q") ?? "");

    const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams(
                searchParams.toString()
            );

            params.set('page', '1');

            params.set("q", String(search));

            router.push(`/products?${params.toString()}`);
        }
    }


    return (
        <div className="hidden w-full max-w-md px-8 lg:flex">
            <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <input
                    placeholder="Search products..."
                    className="h-10 w-full rounded-md border pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={onSearch}
                />
            </div>
        </div>
    )
}
