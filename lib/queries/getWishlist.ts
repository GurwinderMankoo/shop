import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";
import { cacheLife, cacheTag } from "next/cache";

async function getCachedWishlist(userId: string) {
    'use cache: remote'
    cacheLife("hours");
    cacheTag(`wishlist-${userId}`);

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
}

const getCachedWishlistIds = async (userId: string) => {
    'use cache: remote'
    cacheLife("hours");
    cacheTag(`wishlist`, `wishlist-${userId}`);



    return prisma.wishlist.findMany({
        where: {
            userId
        },
        select: {
            productId: true
        }
    })
}

export async function getWishlist() {
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    return getCachedWishlist(user.id);
}

export async function getWishlistProductIds() {
    const user = await getCurrentUser();

    if (!user) {
        return [];
    }

    return getCachedWishlistIds(user.id);
}