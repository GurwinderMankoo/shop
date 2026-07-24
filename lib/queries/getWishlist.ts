import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";
import { unstable_cache } from "next/cache";

export async function getCachedWishlist(userId: string) {
    const getWishlist = unstable_cache(
        async () => {
            const wishlist = await prisma.wishlist.findMany({
                where: {
                    userId,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true,
                            variants: true,
                        },
                    },
                },
            });

            return wishlist.map((item) => ({
                ...item,
                product: {
                    ...item.product,
                    minPrice: item.product.minPrice
                        ? Number(item.product.minPrice)
                        : null,
                    variants: item.product.variants.map((variant) => ({
                        ...variant,
                        price: Number(variant.price),
                        comparePrice: variant.comparePrice
                            ? Number(variant.comparePrice)
                            : null,
                    })),
                },
            }));
        },
        ["wishlist", userId],
        {
            revalidate: 60,
            tags: [`wishlist-${userId}`],
        }
    );

    return getWishlist();
}

export async function getWishlist() {
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }
    const userId = user?.id;

    return getCachedWishlist(userId);
}

const getCachedWishlistIds = (userId: string) =>
    unstable_cache(
        async () => {
            return prisma.wishlist.findMany({
                where: {
                    userId
                },
                select: {
                    productId: true
                }
            })
        },
        ['wishlist-ids', userId],
        {
            revalidate: 60,
            tags: ['wishlist'],
        }
    )();

export async function getWishlistProductIds() {
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    return getCachedWishlistIds(user.id);
}