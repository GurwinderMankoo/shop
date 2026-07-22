"use client"

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, Suspense, useState } from "react";

export function ProductSearchMain() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("q") ?? "");

    const triggerSearch = (query?: string) => {
        const q = query ?? search.trim();
        if (!q) return;
        const params = new URLSearchParams(
            searchParams.toString()
        );
        params.set('page', '1');
        params.set("q", q);
        router.push(`/products?${params.toString()}`);
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search.trim()) {
            triggerSearch();
        }
    }


    return (
        <div className="hidden w-full max-w-md px-8 lg:flex">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                    placeholder="Search products..."
                    className="h-10 w-full rounded-md border pl-10 pr-20 text-sm outline-none focus:ring-2 focus:ring-black"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={onKeyUp}
                />

                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    {search && (
                        <button
                            onClick={() => {
                                setSearch("");
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("q");
                                params.set("page", "1");
                                router.push(`/products?${params.toString()}`);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}

                    <button
                        onClick={() => triggerSearch()}
                        disabled={!search.trim()}
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default function ProductSearch() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductSearchMain />
        </Suspense>
    )
}