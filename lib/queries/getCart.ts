import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";

export type CartItemData = {
    id: string;
    quantity: number;
    variantId: string;
    productVariant: {
        id: string;
        name: string;
        price: number;
        product: {
            id: string;
            name: string;
            slug: string;
            imageUrl: string | null;
        };
    };
};

export type CartData = {
    items: CartItemData[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
};

export async function getCart(): Promise<CartData> {
    const user = await getCurrentUser();

    if (!user) {
        return {
            items: [],
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
        }
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        },
        include: {
            items: {
                include: {
                    productVariant: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    });

    if (!cart) {
        return {
            items: [],
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
        };
    }

    return {
        items: cart.items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            variantId: item.productVariantId,
            productVariant: {
                id: item.productVariant.id,
                name: item.productVariant.name,
                price: Number(item.productVariant.price),
                product: {
                    id: item.productVariant.product.id,
                    name: item.productVariant.product.name,
                    slug: item.productVariant.product.slug,
                    imageUrl: item.productVariant.product.imageUrl,
                },
            },
        })),
        subtotal: Number(cart.subtotal),
        shipping: Number(cart.shipping),
        tax: Number(cart.tax),
        total: Number(cart.total),
    };

}


export const getCartItemsCount = async () => {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return 0;
        }

        const result = await prisma.cartItem.aggregate({
            where: {
                cart: {
                    userId: user.id
                }
            },
            _count: {
                _all: true,
            },
        })

        return result._count._all;

    } catch (error) {
        // console.log(error);
        return 0
    }
}