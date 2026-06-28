import { cookies } from 'next/headers';
import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getWishlist() {
    const user = await getCurrentUser();
    const cookiesStore = await cookies();

    if (!user) {
        // const wishlist = cookiesStore.get("wishlist")?.value;

        // if (wishlist) {
        //     return JSON.parse(wishlist);
        // }
        return [];
    }

    return await prisma.wishlist.findMany({
        include: {
            product: {
                include: {
                    category: true,
                    images: true,
                    variants: true
                }
            }
        }
    })
}