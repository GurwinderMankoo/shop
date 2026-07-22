import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";
import { unstable_cache } from "next/cache";

export type ReviewWithUser = {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        image: string | null;
    };
};

async function getProductReviewsImpl(productId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                productId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            success: true,
            data: reviews,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: "Failed to fetch reviews",
        };
    }
}

export const getProductReviews = unstable_cache(
    async (productId: string) => getProductReviewsImpl(productId),
    ['product-reviews'],
    {
        revalidate: 600,
        tags: ['reviews'],
    }
);

export async function getUserReview(productId: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: true,
                data: null,
                error: null,
            };
        }

        const review = await prisma.review.findUnique({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId,
                },
            },
        });

        return {
            success: true,
            data: review,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "Failed to fetch user review",
        };
    }
}

async function getProductReviewStatsImpl(productId: string) {
    try {
        const stats = await prisma.review.aggregate({
            where: {
                productId,
            },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        });

        const distribution = await prisma.review.groupBy({
            by: ["rating"],
            where: {
                productId,
            },
            _count: {
                rating: true,
            },
        });

        const distributionMap: Record<number, number> = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        distribution.forEach((d) => {
            distributionMap[d.rating] = d._count.rating;
        });

        return {
            success: true,
            data: {
                averageRating: stats._avg.rating ? Number(stats._avg.rating.toFixed(1)) : 0,
                totalReviews: stats._count.rating,
                distribution: distributionMap,
            },
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "Failed to fetch review stats",
        };
    }
}

export const getProductReviewStats = unstable_cache(
    async (productId: string) => getProductReviewStatsImpl(productId),
    ['product-review-stats'],
    {
        revalidate: 600,
        tags: ['reviews'],
    }
);
