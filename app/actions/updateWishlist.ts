"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/queries/getCurrentUser"
import { cookies } from "next/headers";

export async function addProductWishlist(productId: string) {
    try {
        const user = await getCurrentUser();
        const cookieStore = await cookies();

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
        console.log(user, "user")

        if (!user) {

            throw new Error("Unauthorized");
        }


        const data = await prisma.wishlist.deleteMany({
            where: {
                userId: user.id,
                productId,
            },
        });

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