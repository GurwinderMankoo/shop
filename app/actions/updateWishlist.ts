"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/queries/getCurrentUser"
import { updateTag } from "next/cache";

export async function addProductWishlist(productId: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {

            throw new Error("Unauthorized");
        }

        const data = await prisma.wishlist.create({
            data: {
                product: {
                    connect: {
                        id: productId
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        updateTag('wishlist');
        updateTag(`wishlist-${user.id}`);

        return {
            success: true,
            error: '',
            data
        }

    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            data: null
        }
    }
}


export async function removeProductWishlist(productId: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {

            throw new Error("Unauthorized");
        }


        const data = await prisma.wishlist.deleteMany({
            where: {
                userId: user.id,
                productId,
            },
        });

        updateTag('wishlist');
        updateTag(`wishlist-${user.id}`);

        return {
            success: true,
            error: '',
            data
        }

    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            data: null
        }
    }
}