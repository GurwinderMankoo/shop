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
                },
                category: true
            },
            orderBy
        }),
        prisma.product.count({ where })
    ])

    const totalPages = Math.ceil(totalProducts / limit);

    const mappedProducts = products.map(product => ({
        ...product,
        minPrice: product.minPrice ? Number(product.minPrice) : null,
        variants: product.variants.map(v => ({
            ...v,
            price: Number(v.price),
            comparePrice: v.comparePrice ? Number(v.comparePrice) : null,
        }))
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


export async function getProduct(slug: string) {

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

async function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}