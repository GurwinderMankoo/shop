import Headers from "@/components/shared/Headers";
import { EmptyWishlist } from "./_components/EmptyWishlist";
import { getWishlist } from "@/lib/queries/getWishlist";
import { ProductCard } from "@/app/(store)/products/_components/ProductCard";
import Link from "next/link";

export default async function page() {
    let wishlist = await getWishlist();

    return (
        <div className="container mx-auto py-8">

            <Headers
                title="My Wishlist"
                description={`${wishlist.length} items in your wishlist`}
            />

            {
                wishlist.length > 0 ? <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        </div>
    )
}
