import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { unstable_cache } from "next/cache";


type GetProductsParams = {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string
}

async function getProductsImpl({ page = 1, limit = 10, category, sort, minPrice, maxPrice, search }: GetProductsParams) {
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
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
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
                category: true,
            },
            orderBy
        }),
        prisma.product.count({ where })
    ])

    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch review stats for all products in one query
    const productIds = products.map(p => p.id);
    const reviewStats = await prisma.review.groupBy({
        by: ["productId"],
        where: {
            productId: {
                in: productIds
            }
        },
        _avg: {
            rating: true
        },
        _count: {
            rating: true
        }
    });

    const reviewStatsMap = new Map(
        reviewStats.map(stat => [
            stat.productId,
            {
                averageRating: stat._avg.rating ? Number(stat._avg.rating.toFixed(1)) : 0,
                totalReviews: stat._count.rating
            }
        ])
    );

    const mappedProducts = products.map(product => ({
        ...product,
        minPrice: product.minPrice ? Number(product.minPrice) : null,
        variants: product.variants.map(v => ({
            ...v,
            price: Number(v.price),
            comparePrice: v.comparePrice ? Number(v.comparePrice) : null,
        })),
        reviewStats: reviewStatsMap.get(product.id) ?? { averageRating: 0, totalReviews: 0 }
    }));

    return {
        products: mappedProducts,
        pagination: {
            page,
            limit,
            totalPages,
            totalProducts
        }
    };
}

async function getProductImpl(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug
            },
            include: {
                category: true,
                images: true,
                options: {
                    include: {
                        values: true
                    }
                },
                variants: {
                    include: {
                        optionValues: {
                            include: {
                                optionValue: {
                                    include: {
                                        option: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!product) {
            return {
                success: false,
                error: "Product not found",
                data: null
            }
        }

        return {
            success: true,
            error: null,
            data: {
                ...product,
                minPrice: product.minPrice?.toNumber() ?? null,
                variants: product.variants.map((variant) => ({
                    ...variant,
                    price: variant.price.toNumber(),
                    comparePrice: variant.comparePrice?.toNumber() ?? null,
                })),
            }
        };
    } catch (error) {
        return {
            success: false,
            error: "Error fetching product",
            data: null
        }
    }
}

export const getProducts = (params: GetProductsParams) =>
    unstable_cache(
        async () => getProductsImpl(params),
        ['products', JSON.stringify(params)],
        {
            revalidate: 3600,
            tags: ['products'],
        }
    )();

export const getProduct = (slug: string) =>
    unstable_cache(
        async () => getProductImpl(slug),
        ['product', slug], // 👈 Add `slug` here! Now every product has a unique cache key
        {
            revalidate: 3600,
            tags: ['products', `product-${slug}`], // Pro-tip: tag individually for fine-grained revalidation
        }
    )();