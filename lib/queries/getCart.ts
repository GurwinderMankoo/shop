import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { getCurrentUser } from "./getCurrentUser";


export async function getCart() {
    const user = await getCurrentUser();

    if (!user) {
        return {
            items: [],
            summary: {
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0
            }
        }
    }

    return await prisma.cart.findMany({
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
    })

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
        console.log(error);
    }


}

export const getCartBySession = async (sessionId: string) => {
    const cart = await prisma.cart.findFirst({
        where: {
            stripeCheckoutSessionId: sessionId,
        },
        include: {
            items: {
                include: {
                    productVariant: {
                        include: {
                            product: true
                        }
                    },
                },
            },
        },
    });

    if (!cart) {
        redirect("/");
    }

    return cart
}