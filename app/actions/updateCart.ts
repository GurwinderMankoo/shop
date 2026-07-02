"use server"

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { revalidatePath } from "next/cache";


export async function addToCart(variantId: string, quantity: number) {
    try {
        const user = await getCurrentUser();

        if (!user || !variantId) {
            throw new Error("Unauthorized");
        }

        const [variant, cartItem] = await Promise.all([
            prisma.productVariant.findUnique({
                where: {
                    id: variantId
                },
                select: {
                    id: true,
                    stock: true
                }
            }),
            prisma.cart.findUnique({
                where: {
                    userId_variantId: {
                        userId: user.id,
                        variantId,
                    },
                },
            })
        ])


        if (!variant) {
            throw new Error("Product not found");
        }

        const newCartItem = cartItem ? cartItem.quantity + quantity : quantity

        if (newCartItem > variant.stock) {
            throw new Error(`Only ${variant.stock} items available.`);
        }

        if (cartItem) {
            const data = prisma.cart.update({
                where: {
                    id: cartItem.id
                },
                data: {
                    quantity: cartItem.quantity + quantity
                }
            })

            return {
                success: true,
                error: '',
                data
            }
        }

        const data = await prisma.cart.create({
            data: {
                userId: user.id,
                variantId: variantId,
                quantity,
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
            data: {}
        }
    }

}


export async function removeFromCart(variantId: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error('🔒 Please log in to continue. ⭐')
        }


        const variant = await prisma.productVariant.findUnique({
            where: {
                id: variantId
            },
            select: {
                id: true,
                stock: true
            }
        })


        if (!variant) {
            throw new Error("Product not found");
        }

        const data = await prisma.cart.delete({
            where: {
                userId_variantId: {
                    userId: user.id,
                    variantId,
                },
            },
        });
        revalidatePath("/cart")
        return {
            success: true,
            error: '',
            data
        }


    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
            data: {}
        }
    }


}