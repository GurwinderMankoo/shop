interface ProductJsonLdProps {
    product: {
        name: string;
        description: string | null;
        slug: string;
        images: { url: string }[];
        variants: {
            sku: string;
            price: number;
        }[];
        category: { name: string } | null;
        minPrice: number | null;
    };
    baseUrl: string;
    reviewStats: {
        averageRating: number;
        totalReviews: number;
    } | null;
    firstVariantPrice: number;
}

export default function ProductJsonLd({
    product,
    baseUrl,
    reviewStats,
    firstVariantPrice,
}: ProductJsonLdProps) {
    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description || undefined,
        url: `${baseUrl}/products/${product.slug}`,
        image: product.images.length > 0
            ? product.images.map((img) => img.url)
            : undefined,
        sku: product.variants[0]?.sku || undefined,
        brand: {
            "@type": "Brand",
            name: "TheShopHub",
        },
        category: product.category?.name || undefined,
    };

    if (firstVariantPrice != null) {
        jsonLd.offers = {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: product.minPrice ?? firstVariantPrice,
            highPrice: firstVariantPrice,
            availability: "https://schema.org/InStock",
            url: `${baseUrl}/products/${product.slug}`,
        };
    }

    if (reviewStats && reviewStats.totalReviews > 0) {
        jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: reviewStats.averageRating.toFixed(1),
            reviewCount: reviewStats.totalReviews,
            bestRating: 5,
            worstRating: 1,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
}
