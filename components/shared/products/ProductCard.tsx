import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/products";

export function ProductCard({ name, imageUrl, category, variants } : Partial<Product>) {

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
          <Heart size={18}/>
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


        <div className="mt-3 flex items-center justify-between">

          {
            variants && variants[0] && variants[0].price && (
                <span className="font-bold">
                    {variants[0].price}
                </span>
            )
          }


          <Button size="icon">
            <ShoppingCart size={18}/>
          </Button>

        </div>


      </CardContent>

    </Card>

  );
}