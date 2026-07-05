// app/products/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./_components/ProductCardSkeleton";


export default function Loading() {
    return (
        <div className="container mx-auto px-3 py-10">

            <Skeleton className="mb-8 h-10 w-64" />

            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

                {/* Desktop Filter Skeleton */}
                <div className="hidden lg:block">
                    <div className="rounded-xl border p-5 space-y-6">

                        {/* Header */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                        </div>


                        {/* Category */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-20" />

                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                            ))}
                        </div>


                        <Skeleton className="h-px w-full" />


                        {/* Sort */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-16" />

                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>


                        <Skeleton className="h-px w-full" />


                        {/* Price */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-16" />

                            <Skeleton className="h-3 w-full rounded-full" />

                            <div className="flex gap-3">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                        </div>

                    </div>
                </div>


                {/* Products */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>

            </div>

        </div>
    );
}