import Headers from "@/components/shared/Headers";
import PageLayout from "@/components/shared/PageLayout";
import { EmptyWishlist } from "./_components/EmptyWishlist";
import { getWishlist } from "@/lib/queries/getWishlist";
import { ProductCard } from "@/app/(store)/products/_components/ProductCard";
import Link from "next/link";

export default async function page() {
    let wishlist = await getWishlist();

    return (
        <PageLayout>

            <Headers
                title="My Wishlist"
                description={`${wishlist.length} items in your wishlist`}
            />

            {
                wishlist.length > 0 ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {wishlist.map(({ product }, index, arr) => (
                        <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                        >
                            <ProductCard {...product} isFromWishlist={true} isWishListed />
                        </Link>
                    ))}
                </div> : <EmptyWishlist />
            }

        </PageLayout>
    )
}
