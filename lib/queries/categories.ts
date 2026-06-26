import { unstable_cache } from "next/cache";
import { prisma } from "../prisma";


export const getCategories = unstable_cache(
    async (count?: number) => {
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
    },
    ["categories"],
    {
        revalidate: 3600, // cache for 1 hour
    }
);