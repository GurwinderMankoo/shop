// components/products/ProductCardSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Skeleton className="aspect-square w-full" />

            <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />

                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                </div>

                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}