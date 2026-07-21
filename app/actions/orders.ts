import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";

type Order = {
    userId: string;
    status: string;
    paymentStatus: string;
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    shippingAmount: number;
    total: number;
    items: OrderItem[]
}

type OrderItem = {
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
    productName: string;
    variantName: string;
    slug: string;
    image: string;
}

export async function createOrder(order: Order) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }



    return await prisma.order.create({
        data: {
            userId: user.id,
            status: 'PENDING',
            paymentStatus: 'PENDING',
            subtotal: order.subtotal || 0,
            discountAmount: order.discountAmount || 0,
            taxAmount: order.taxAmount || 0,
            shippingAmount: order.shippingAmount || 0,
            total: order.total || 0,
            items: {
                create: order.items
            }
        }
    })
}


export async function getOrderBySession(sessionId: string) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    return await prisma.order.findFirst({
        where: {
            stripeCheckoutSessionId: sessionId,
            userId: user.id
        },
        include: {
            items: true
        }
    })
}


export async function getOrders() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    return await prisma.order.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            items: true
        }
    })
}

export const getOrderById = async (id: string) => {
    return await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            items: true
        }
    })
}