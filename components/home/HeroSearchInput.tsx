'use client'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useState } from 'react'

type Categories = {
    id: string
    name: string
    slug: string
    imageUrl: string | null
}

export default function HeroSearchInput({ categories }: { categories: Categories[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("q") ?? "");
    const [category, setCategory] = useState(searchParams.get("category") ?? "All Categories");

    const triggerSearch = (query?: string, c?: string) => {
        const q = query ?? search.trim();
        const cat = c ?? category.trim();
        if (!q) return;
        const params = new URLSearchParams(
            searchParams.toString()
        );
        params.set('page', '1');
        params.set("q", q);
        params.set("category", cat);
        router.push(`/products?${params.toString()}`);
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "Enter" && search.trim()) {
            triggerSearch();
        }
    }

    return (
        <div className="mt-9 flex w-full max-w-xl flex-col items-stretch gap-2 rounded-lg border bg-card p-1.5 shadow-sm sm:flex-row sm:items-center">
            <select
                className="w-full shrink-0 rounded-md bg-transparent px-3 py-2.5 text-sm font-medium text-foreground outline-none sm:w-auto sm:border-r sm:pr-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value=''>All Categories</option>
                {categories.map((c) => (
                    <option value={c.slug} key={c.id}>{c.name}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Search for denim jackets, headphones, decor…"
                className="w-full flex-1 rounded-md bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={onKeyUp}
            />
            <button
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/80 focus-visible:outline focus-visible:ring-3 focus-visible:ring-ring/50"
                onClick={() => triggerSearch(search, category)}
            >
                <Search className="h-4 w-4" />
                Search
            </button>
        </div>
    )
}
