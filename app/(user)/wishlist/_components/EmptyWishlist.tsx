import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyWishlist() {
    return (
        <div className="flex flex-col items-center justify-center py-24">

            <Heart
                className="mb-6 text-muted-foreground"
                size={64}
            />

            <h2 className="text-2xl font-semibold">
                Your wishlist is empty
            </h2>

            <p className="mt-2 text-muted-foreground">
                Save products you love and come back later.
            </p>

            <Button
                asChild
                className="mt-8"
            >
                <Link href="/products">
                    Continue Shopping
                </Link>
            </Button>

        </div>
    );
}