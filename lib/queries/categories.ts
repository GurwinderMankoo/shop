import { prisma } from "../prisma";




export async function getCategories(count?: number ) {
    return await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            imageUrl: true,
            isActive: true,
        },
        ...(count && count > 0 && { take: count }),
        orderBy: {
            createdAt: "desc",
        }
    });
}