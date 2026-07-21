import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/types/products";
import { formatCurrency } from "@/lib/helper";
import DiscountBadge from "@/components/shared/DiscountBadge";
import ProductWishlistButton from "./ProductWishlistButton";
import ProductAddToCartButton from "./ProductAddToCartButton";

interface ProductCardProps extends Partial<Product> {
  isWishListed: boolean;
  isFromWishlist?: boolean
}

export function ProductCard({ id, name, imageUrl, category, variants, isWishListed, isFromWishlist }: ProductCardProps) {


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

        <ProductWishlistButton id={id} isWishListed={isWishListed} isFromWishlist={isFromWishlist} />

      </div>


      <CardContent className="p-4">


        <h3 className="font-semibold">
          {
            name
          }
        </h3>


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