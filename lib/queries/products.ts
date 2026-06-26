import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";


type GetProductsParams = {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string
}


export async function getProducts({ page = 1, limit = 10, category, sort, minPrice, maxPrice, search }: GetProductsParams) {

    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {};
    if (category) {
        where.category = {
            slug: category,
        };
    }

    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                },
            },
            {
                description: {
                    contains: search,
                },
            },
        ];
    }

    if (minPrice && maxPrice) {
        where.variants = {
            some: {
                price: {
                    gte: minPrice,
                    lte: maxPrice
                }
            }
        }
    }

    let orderBy = {}

    switch (sort) {
        case "price-asc":
            orderBy = {
                minPrice: "asc",
            }
            break;
        case "price-desc":
            orderBy = {
                minPrice: "desc",
            };
            break;
        default:
            orderBy = {
                createdAt: "desc",
            };
            break;
    }

    const [products, totalProducts] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: limit,
            where,
            include: {
                variants: true,
                category: true
            },
            orderBy
        }),
        prisma.product.count({ where })
    ])

    const totalPages = Math.ceil(totalProducts / limit);

    return {
        products,
        pagination: {
            page,
            limit,
            totalPages,
            totalProducts
        }
    };
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

async function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}