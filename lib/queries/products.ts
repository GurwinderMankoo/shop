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

