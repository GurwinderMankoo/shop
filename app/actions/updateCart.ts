"use server"

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function getOrCreateCart(userId: string) {
    let cart = await prisma.cart.findUnique({
        where: {
            userId
        },
        include: {
            items: {
                include: {
                    productVariant: true
                }
            }
        }
    })

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId
            },
            include: {
                items: {
                    include: {
                        productVariant: true
                    }
                }
            }
        })
    }

    return cart
}

type VariantWithProduct = Prisma.ProductVariantGetPayload<{ include: { product: true } }>;

// Overload: when includeProduct is true, return type includes `product` relation
export async function validateVariant(id: string, includeProduct: true): Promise<VariantWithProduct>;
// Overload: when includeProduct is false or omitted, return base variant type
export async function validateVariant(id: string, includeProduct?: false): Promise<Prisma.ProductVariantGetPayload<{}>>;
// Implementation
export async function validateVariant(id: string, includeProduct = false) {
    const args: Prisma.ProductVariantFindUniqueArgs = {
        where: { id },
    };

    if (includeProduct) {
        args.include = {
            product: true,
        };
    }

    const variant = await prisma.productVariant.findUnique(args);

    if (!variant) {
        throw new Error("Product not found");
    }

    return variant;
}

export async function upsertCartItem(
    cartId: string,
    variantId: string,
    quantity: number
) {
    return prisma.cartItem.upsert({
        where: {
            cartId_productVariantId: {
                cartId,
                productVariantId: variantId
            }
        },
        update: {
            quantity: {
                increment: quantity
            }
        },
        create: {
            cartId,
            productVariantId: variantId,
            quantity
        }
    });
}

export async function recalculateCart(cartId: string) {
    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: {
                include: {
                    productVariant: true
                }
            }
        }
    });

    if (!cart) return;

    const subtotal = cart.items.reduce((sum, item) => {
        return sum + Number(item.productVariant.price) * item.quantity;
    }, 0);

    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    await prisma.cart.update({
        where: { id: cartId },
        data: {
            subtotal,
            tax,
            shipping,
            total
        }
    });
}

export async function addToCart(variantId: string, quantity: number) {
    try {
        const user = await getCurrentUser();

        if (!user) throw new Error("Unauthorized");

        await validateVariant(variantId);

        const cart = await getOrCreateCart(user.id);

        if (!cart) throw new Error("Cart not found");

        await upsertCartItem(cart.id, variantId, quantity);

        await recalculateCart(cart.id);

        return { success: true, error: '' };
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

        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id
            },
        })

        if (!cart) {
            throw new Error("Cart not found");
        }


        const data = await prisma.$transaction(async (tx) => {
            await tx.cartItem.delete({
                where: {
                    cartId_productVariantId: {
                        cartId: cart.id,
                        productVariantId: variantId
                    }
                }
            }),
                recalculateCart(cart.id)
        })

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