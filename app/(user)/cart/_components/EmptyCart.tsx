import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyCart() {
    return (
        <Card className="border border-neutral-700 border-dashed ring-0 shadow-none! outline-0 ">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">

                <div className="mb-6 rounded-full bg-muted p-6">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>

                <h2 className="text-2xl font-semibold">
                    Your cart is empty
                </h2>

                <p className="mt-2 max-w-md text-muted-foreground">
                    Looks like you haven't added anything to your cart yet.
                    Browse our products and find something you'll love.
                </p>

                <Button asChild className="mt-8">
                    <Link href="/products">
                        Continue Shopping
                    </Link>
                </Button>

            </CardContent>
        </Card>
    );
}