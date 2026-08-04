import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../prisma";


export const getCategories = async (count?: number) => {
    'use cache: remote'
    cacheLife("hours");
    cacheTag("categories");
    return await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            imageUrl: true,
            slug: true,
            isActive: true,
        },
        ...(count && count > 0 && { take: count }),
        orderBy: {
            createdAt: "desc",
        },
    });
}
