import CustomPagination from "@/components/shared/CustomPagination";
import { getProducts } from "@/lib/queries/products";
import Link from "next/link";
import ProductFilters from "./_components/ProductFilters";
import { getCategories } from "@/lib/queries/categories";
import { ProductCard } from "./_components/ProductCard";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { getWishlist } from "@/lib/queries/getWishlist";

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
  const category = params.category;
  const sort = params.sort;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const search = params.q;

  const [categories, productData, wishlist] = await Promise.all([
    getCategories(),
    getProducts({
      page,
      limit,
      category,
      sort,
      minPrice,
      maxPrice,
      search
    }),
    getWishlist()
  ])

  const { products, pagination } = productData

  const wishlistSets = new Set(wishlist.map((item) => item.productId));

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <ProductFilters categories={categories} />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
              >
                <ProductCard {...product} isWishListed={wishlistSets.has(product.id) || false} />
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


      {page <= pagination.totalPages && pagination.totalPages > 1 && <div className="mt-10">
        <CustomPagination
          currentPage={page}
          totalPages={pagination.totalPages}
        />
      </div>}

    </div>
  );
}