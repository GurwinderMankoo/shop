"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { getUserReview } from "@/lib/queries/reviews";
import { revalidatePath } from "next/cache";

export async function createReview(formData: FormData) {
    // Get the slug from form data for cache revalidation
    const productSlug = formData.get("productSlug") as string;
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: false,
                error: "You must be signed in to leave a review",
                data: null,
            };
        }

        const productId = formData.get("productId") as string;
        const rating = Number(formData.get("rating"));
        const comment = formData.get("comment") as string;

        if (!productId || !rating || !comment) {
            return {
                success: false,
                error: "All fields are required",
                data: null,
            };
        }

        if (rating < 1 || rating > 5) {
            return {
                success: false,
                error: "Rating must be between 1 and 5",
                data: null,
            };
        }

        if (comment.trim().length < 10) {
            return {
                success: false,
                error: "Review must be at least 10 characters long",
                data: null,
            };
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return {
                success: false,
                error: "Product not found",
                data: null,
            };
        }

        // Upsert review (create or update if exists)
        const review = await prisma.review.upsert({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId,
                },
            },
            update: {
                rating,
                comment: comment.trim(),
            },
            create: {
                rating,
                comment: comment.trim(),
                userId: user.id,
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
        });

        // Revalidate the product page using the slug
        if (productSlug) {
            revalidatePath(`/products/${productSlug}`);
        } else {
            revalidatePath("/products");
        }

        return {
            success: true,
            error: null,
            data: review,
        };
    } catch (error) {
        // console.error("Error creating review:", error);
        return {
            success: false,
            error: "Something went wrong. Please try again.",
            data: null,
        };
    }
}

export async function getMyReview(productId: string) {
    return getUserReview(productId);
}

export async function deleteReview(productId: string, productSlug?: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: false,
                error: "You must be signed in to delete a review",
            };
        }

        await prisma.review.deleteMany({
            where: {
                userId: user.id,
                productId,
            },
        });

        // Revalidate the product page using the slug
        if (productSlug) {
            revalidatePath(`/products/${productSlug}`);
        } else {
            revalidatePath("/products");
        }

        return {
            success: true,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to delete review",
        };
    }
}
