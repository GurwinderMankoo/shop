import { Suspense } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";

import CustomPagination from "@/components/shared/CustomPagination";
import PageLayout from "@/components/shared/PageLayout";
import ProductFilters from "./_components/ProductFilters";
import ProductsSearch from "./_components/ProductsSearch";
import { ProductCard } from "./_components/ProductCard";
import { Button } from "@/components/ui/button";
import MobileFilterWrapper from "./_components/MobileFilterWrapper";

import { getProducts } from "@/lib/queries/products";

type ProductPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 8;
  const category = params.category || null;
  const sort = params.sort || null;
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
  const search = params.q || null;

  return (
    <CachedProductsPage
      page={page}
      limit={limit}
      category={category}
      sort={sort}
      minPrice={minPrice}
      maxPrice={maxPrice}
      search={search}
    />
  );
}

async function CachedProductsPage({
  page,
  limit,
  category,
  sort,
  minPrice,
  maxPrice,
  search,
}: {
  page: number;
  limit: number;
  category: string | null;
  sort: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string | null;
}) {
  'use cache'
  cacheLife("hours");
  cacheTag("products-page");

  const { products, pagination } = await getProducts({
    page,
    limit,
    category: category ?? undefined,
    sort: sort ?? undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    search: search ?? undefined,
  })

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
            <MobileFilterWrapper />
          </div>

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
                We couldn't find any products matching your current
                filters. Try adjusting your search criteria.
              </p>

              <Button asChild className="mt-6">
                <Link href="/products">
                  Clear Filters
                </Link>
              </Button>
            </div>
          )}

        </div>

      </div>


      {page <= pagination.totalPages && pagination.totalPages > 1 && <div className="mt-10">
        <Suspense fallback={null}>
          <CustomPagination
            currentPage={page}
            totalPages={pagination.totalPages}
          />
        </Suspense>
      </div>}

    </PageLayout>
  );
}
