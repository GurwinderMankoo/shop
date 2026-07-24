import { getCategories } from "@/lib/queries/categories";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";


async function CategoriesMarqueMain() {
    const categories = await getCategories();
    return (
        <div className="relative mt-12 w-screen max-w-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-shophub-marquee py-1 hover:[animation-play-state:paused]">
                <div className="flex gap-3">
                    {categories.map((c) => (
                        <span
                            key={c.id}
                            className="whitespace-nowrap rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"
                        >
                            {c.name}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3">
                    {categories.map((c) => (
                        <span
                            key={`dup-${c.id}`}
                            className="whitespace-nowrap rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"
                        >
                            {c.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}


export function CategoriesSkeleton() {
    return (
        <div className="relative mt-12 w-screen max-w-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-shophub-marquee py-1 hover:[animation-play-state:paused]">
                <div className="flex gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                        <span
                            key={c}
                            className="whitespace-nowrap rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"
                        >
                            <Skeleton className="h-4 w-24" />
                        </span>
                    ))}
                </div>
                <div className="flex gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                        <span
                            key={`dup-${c}`}
                            className="whitespace-nowrap rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground"
                        >
                            <Skeleton className="h-4 w-24" />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}



export default function CategoriesMarque() {
    return (
        <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesMarqueMain />
        </Suspense>
    )
}