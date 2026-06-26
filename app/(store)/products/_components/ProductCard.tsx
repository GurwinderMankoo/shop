import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/products";
import { formatCurrency } from "@/lib/helper";
import DiscountBadge from "@/components/shared/DiscountBadge";

export function ProductCard({ name, imageUrl, category, variants }: Partial<Product>) {

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

        <button className="absolute right-3 top-3 rounded-full bg-white p-2">
          <Heart size={18} />
        </button>

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

              {variants?.[0]?.price && (
                <span className="text-lg font-bold">
                  {formatCurrency(variants[0].price)}
                </span>
              )}

              {variants?.[0]?.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(variants[0].comparePrice)}
                </span>
              )}

            </div>


            {variants?.[0]?.comparePrice && (
              <div className="mt-1">
                {DiscountBadge({
                  price: variants[0].price || 0,
                  comparePrice: variants[0].comparePrice || 0,
                })}
              </div>
            )}

          </div>


          {/* Cart Button */}
          <Button
            size="icon"
            className="shrink-0"
          >
            <ShoppingCart size={18} />
          </Button>

        </div>


      </CardContent>

    </Card>

  );
}