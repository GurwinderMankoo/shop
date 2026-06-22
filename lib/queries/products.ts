import { prisma } from "../prisma";


export async function getProducts() {
    return await prisma.product.findMany({
        include: {
            variants: true,
            category: true
        },
        orderBy: {
            createdAt: "desc",
        }
    });
}


export async function getProduct(id: string) {
    return await prisma.product.findUnique({
        where: {
            id
        },
        include: {
            variants: true,
            category: true,
            images: true
        }
    });
}