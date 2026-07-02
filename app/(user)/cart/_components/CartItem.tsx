import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import CartQuantityButtons from "./CartQuantityButtons";
import RemoveCartButton from "./RemoveCartButton";

type CartItemProps = {
    item: {
        id: string;
        quantity: number;
        variantId: string;
        variant: {
            id: string;
            name: string;
            price: number;
            product: {
                id: string;
                name: string;
                slug: string;
                imageUrl: string | null;
            };
        };
    };
};

export function CartItem({ item }: CartItemProps) {
    const total = item.quantity * item.variant.price;

    return (
        <Card className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row">

                <Link
                    href={`/products/${item.variant.product.slug}`}
                    className="relative h-28 w-28 overflow-hidden rounded-lg bg-muted"
                >
                    {item.variant.product.imageUrl && (
                        <Image
                            src={item.variant.product.imageUrl}
                            alt={item.variant.product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </Link>

                <div className="flex flex-1 flex-col">

                    <div className="flex items-start justify-between">

                        <div>

                            <Link
                                href={`/products/${item.variant.product.slug}`}
                                className="font-semibold hover:underline"
                            >
                                {item.variant.product.name}
                            </Link>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {item.variant.name}
                            </p>

                            <p className="mt-2 font-semibold">
                                {
                                    formatCurrency(item.variant.price)
                                }
                            </p>

                        </div>

                        <RemoveCartButton variantId={item.variantId} />

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                        <CartQuantityButtons quantity={item.quantity} id={item.variantId} />
                        <p className="text-lg font-bold">
                            {
                                formatCurrency(total)
                            }
                        </p>

                    </div>

                </div>

            </div>
        </Card>
    );
}