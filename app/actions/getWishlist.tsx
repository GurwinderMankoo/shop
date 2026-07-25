'use server'


import { getWishlist } from "@/lib/queries/getWishlist";
export async function getWishlistAction() {
    const wishlist = await getWishlist()
    return wishlist
}