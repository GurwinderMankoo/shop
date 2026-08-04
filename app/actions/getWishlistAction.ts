"use server"

import { getWishlistProductIds } from "@/lib/queries/getWishlist";

export const getWishlist = async (): Promise<string[]> => {
    const wishlist = await getWishlistProductIds();

    return wishlist.map((item) => item.productId);
}