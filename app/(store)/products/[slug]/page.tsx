import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cacheLife, cacheTag } from "next/cache";
import Headers from "@/components/shared/Headers";
import { getProduct } from "@/lib/queries/products";
import { getProductReviews, getProductReviewStats } from "@/lib/queries/reviews";
import ProductGallery from "../_components/ProductGallery";
import ProductDetails from "./_components/ProductDetails";
import ProductReviews from "@/components/reviews/ProductReviews";
import ProductJsonLd from "./_components/ProductJsonLd";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Prerender every product page at build time so visits on serverless hosts
// (Vercel) are served from the CDN instantly — no per-request render, no
// loader. Slugs added later still render on demand (dynamicParams defaults
// to true).
export async function generateStaticParams() {
    const products = await prisma.product.findMany({
        select: {
            slug: true,
        },
    });

    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    // Read the dynamic route param OUTSIDE the cached scope and pass the
    // resolved slug in as a plain argument (the docs' preferred pattern —
    // awaiting the params Promise inside a cached scope is not cached / hangs).
    const { slug } = await params;
    return <CachedProductPage slug={slug} />;
}

async function CachedProductPage({ slug }: { slug: string }) {
    'use cache: remote'
    cacheLife("hours");
    cacheTag(`product-page-${slug}`);

    const { success, error, data: product } = await getProduct(slug);

    if (!product || !success) {
        notFound();
    }

    const [reviewsResult, reviewStatsResult] = await Promise.all([
        getProductReviews(product.id),
        getProductReviewStats(product.id),
    ]);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theshophub.vercel.app";
    const firstVariant = product.variants[0];

    return (
        <>
            <ProductJsonLd
                product={product}
                baseUrl={baseUrl}
                reviewStats={reviewStatsResult.data}
                firstVariantPrice={firstVariant?.price ?? 0}
            />

            <div className="container mx-auto px-4 py-10">

                <Headers name={product?.name} />

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Gallery */}

                    <ProductGallery images={product?.images || []} />

                    {/* Product Info */}

                    <div>
                        {product?.category?.name && <Badge className="mb-4">
                            {product.category.name}
                        </Badge>}

                        <h1 className="text-4xl font-bold">
                            {
                                product?.name
                            }
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            {
                                product?.description
                            }
                        </p>

                        <ProductDetails product={product} />

                        {/* Features */}

                        <div className="mt-10 space-y-3">
                            <div>✓ Free Shipping</div>
                            <div>✓ 30-Day Returns</div>
                            <div>✓ Secure Checkout</div>
                        </div>
                    </div>
                </div>

                {/* Description */}

                <section className="mt-20">
                    <h2 className="text-2xl font-bold">
                        Product Description
                    </h2>

                    <p className="mt-4 max-w-3xl text-muted-foreground">
                        {product?.description}
                    </p>
                </section>

                {/* Reviews */}

                <ProductReviews
                    productId={product.id}
                    productSlug={slug}
                    reviews={reviewsResult.data}
                    stats={reviewStatsResult.data}
                    existingUserReview={null}
                />

                {/* Related Products */}

                <section className="mt-20">
                    <h2 className="mb-6 text-2xl font-bold">
                        Related Products
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {[1, 2, 3, 4].map((item) => (
                            <Card
                                key={item}
                                className="overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                                        alt="Product"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold">
                                        Wireless Headphones
                                    </h3>

                                    <p className="mt-2 text-lg font-bold">
                                        ₹4,999
                                    </p>
                                </div>
                            </Card>
                        ))}

                    </div>
                </section>
            </div>
        </>
    );
}
