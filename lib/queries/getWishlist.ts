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

    const wishlist = await prisma.wishlist.findMany({
        include: {
            product: {
                include: {
                    category: true,
                    images: true,
                    variants: {
                        include: {
                            optionValues: {
                                include: {
                                    optionValue: {
                                        include: {
                                            option: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return wishlist.map(item => ({
        ...item,
        product: {
            ...item.product,
            minPrice: item.product.minPrice ? Number(item.product.minPrice) : null,
            variants: item.product.variants.map(v => ({
                ...v,
                price: Number(v.price),
                comparePrice: v.comparePrice ? Number(v.comparePrice) : null,
            }))
        }
    }));
}

export async function getWishlistProductIds() {
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    return await prisma.wishlist.findMany({
        where: {
            userId: user.id
        },
        select: {
            productId: true
        }
    });


}