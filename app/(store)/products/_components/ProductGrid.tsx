import Link from "next/link";
import { SearchX } from "lucide-react";

import CustomPagination from "@/components/shared/CustomPagination";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/queries/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
    searchParams: Promise<{
        page?: string;
        category?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        q?: string;
    }>;
};

const LIMIT = 8;

export default async function ProductGrid({ searchParams }: ProductGridProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const category = params.category || null;
    const sort = params.sort || null;
    const minPrice = params.minPrice ? Number(params.minPrice) : null;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
    const search = params.q || null;

    const { products, pagination } = await getProducts({
        page,
        limit: LIMIT,
        category: category ?? undefined,
        sort: sort ?? undefined,
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        search: search ?? undefined,
    });

    return (
        <>
            {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {products.map((product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                        >
                            <ProductCard {...product} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[500px] w-full flex-col items-center justify-center rounded-xl border border-dashed">
                    <SearchX className="h-12 w-12 text-muted-foreground" />

                    <h2 className="mt-4 text-xl font-semibold">
                        No products found
                    </h2>

                    <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                        We couldn&apos;t find any products matching your current
                        filters. Try adjusting your search criteria.
                    </p>

                    <Button asChild className="mt-6">
                        <Link href="/products">
                            Clear Filters
                        </Link>
                    </Button>
                </div>
            )}

            {page <= pagination.totalPages && pagination.totalPages > 1 && (
                <div className="mt-10">
                    <CustomPagination
                        currentPage={page}
                        totalPages={pagination.totalPages}
                    />
                </div>
            )}
        </>
    );
}
