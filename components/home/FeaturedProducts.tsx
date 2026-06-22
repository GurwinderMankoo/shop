import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-3xl font-bold">
          Featured Products
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="aspect-square rounded-xl bg-muted" />

                  <h3 className="mt-4 font-medium">
                    Premium Headphones
                  </h3>

                  <p className="mt-2 font-bold">
                    ₹4,999
                  </p>

                  <Button className="mt-4 w-full">
                    Add To Cart
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}