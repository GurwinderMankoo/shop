import { Suspense } from "react";

import PageLayout from "@/components/shared/PageLayout";
import ProductFilters from "./_components/ProductFilters";
import ProductsSearch from "./_components/ProductsSearch";
import MobileFilterWrapper from "./_components/MobileFilterWrapper";
import ProductGrid from "./_components/ProductGrid";
import ProductGridSkeleton from "./_components/ProductGridSkeleton";

type ProductPageProps = {
    searchParams: Promise<{
        page?: string;
        category?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        q?: string;
    }>;
};

export default async function ProductsPage({ searchParams }: ProductPageProps) {
    return (
        <PageLayout>

            <h1 className="mb-6 text-2xl font-bold md:text-3xl md:mb-8">
                Products
            </h1>

            <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
                <aside className="sticky top-24 hidden h-fit rounded-xl border bg-card p-5 lg:block">
                    <Suspense fallback={null}>
                        <ProductFilters />
                    </Suspense>
                </aside>

                <div className="flex flex-col gap-6">

                    {/* Mobile: Search + Filter row */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="flex-1">
                            <Suspense fallback={null}>
                                <ProductsSearch />
                            </Suspense>
                        </div>
                        <Suspense fallback={null}>
                            <MobileFilterWrapper />
                        </Suspense>
                    </div>

                    {/* Products — the only dynamic part. Reads searchParams
                        inside a Suspense boundary so the page shell stays
                        statically rendered and navigations are instant. */}
                    <Suspense fallback={<ProductGridSkeleton />}>
                        <ProductGrid searchParams={searchParams} />
                    </Suspense>

                </div>

            </div>

        </PageLayout>
    );
}
