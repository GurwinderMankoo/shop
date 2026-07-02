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

    const items = await prisma.cart.findMany({
        where: {
            userId: user.id
        },
        include: {
            variant: {
                include: {
                    product: true
                }
            }
        }
    })

    const subtotal = items.reduce((total, item) => total + (Number(item.variant.price) * item.quantity), 0);

    return {
        items: items.map(item => ({
            ...item,
            variant: {
                ...item.variant,
                price: Number(item.variant.price),
                comparePrice: item.variant.comparePrice ? Number(item.variant.comparePrice) : null,
                product: item.variant.product
            }
        })),
        summary: {
            subtotal,
            shipping: subtotal > 50 ? 0 : 4.99,
            tax: subtotal * 0.2,
            total: subtotal + 4.99 + (subtotal * 0.2)
        }
    }

}


export const getCartItemsCount = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return 0;
    }

    return await prisma.cart.count({
        where: {
            userId: user.id
        }
    })

}