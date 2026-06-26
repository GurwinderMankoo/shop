import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-10">
            <Skeleton className="h-10 w-64 mb-8" />

            <div className="grid gap-10 lg:grid-cols-2">
                <div>
                    <Skeleton className="aspect-square w-full rounded-xl" />

                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="aspect-square rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    <Skeleton className="h-12 w-40" />

                    <div>
                        <Skeleton className="h-5 w-20 mb-2" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div>
                        <Skeleton className="h-5 w-20 mb-2" />
                        <Skeleton className="h-10 w-24" />
                    </div>

                    <div className="flex gap-4">
                        <Skeleton className="h-11 w-36" />
                        <Skeleton className="h-11 w-36" />
                    </div>
                </div>
            </div>
        </div>
    );
}