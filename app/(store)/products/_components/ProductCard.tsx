import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/reviews/StarRating";
import DiscountBadge from "@/components/shared/DiscountBadge";
import ProductWishlistButton from "./ProductWishlistButton";
import ProductAddToCartButton from "./ProductAddToCartButton";
import { formatCurrency } from "@/lib/helper";

type ProductCardVariant = {
  id: string;
  price: number | null;
  comparePrice: number | null;
};

type ProductCardCategory = {
  name: string;
};

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  slug: string;
  category: ProductCardCategory | null;
  variants: ProductCardVariant[];
  isFromWishlist?: boolean;
  reviewStats?: {
    averageRating: number;
    totalReviews: number;
  };
}

export function ProductCard({ id, name, imageUrl, category, variants, isFromWishlist, reviewStats }: ProductCardProps) {


  return (

    <Card className="group overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square bg-muted">

        <Image
          src={imageUrl || '/images/product-placeholder.svg'}
          alt={name || ""}
          fill
          className="object-cover rounded-lg"
        />
        <ProductWishlistButton id={id} isFromWishlist={isFromWishlist} />

      </div>


      <CardContent className="p-4">


        <h3 className="font-semibold">
          {
            name
          }
        </h3>

        <div className="flex items-center gap-1.5">
          <StarRating rating={reviewStats?.averageRating ?? 0} interactive={false} size={12} />
          {reviewStats && reviewStats.totalReviews > 0 && (
            <span className="text-[10px] text-muted-foreground">
              ({reviewStats.totalReviews})
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {
            category?.name || ""
          }
        </p>


        <div className="mt-4 flex items-end justify-between gap-3">

          {/* Price */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">

              {variants?.[0]?.price ? (
                <span className="text-lg font-bold">
                  {formatCurrency(variants[0].price)}
                </span>
              ) : null}

              {variants?.[0]?.comparePrice ? (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(variants[0].comparePrice)}
                </span>
              ) : null}

            </div>


            {variants?.[0]?.comparePrice ? (
              <div className="mt-1">
                {DiscountBadge({
                  price: Number(variants[0].price) || 0,
                  comparePrice: Number(variants[0].comparePrice) || 0,
                })}
              </div>
            ) : null}

          </div>


          {/* Cart Button */}
          <ProductAddToCartButton id={variants?.[0]?.id ?? ''} />

        </div>


      </CardContent>

    </Card>

  );
}
