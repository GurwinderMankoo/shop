import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import CartQuantityButtons from "./CartQuantityButtons";
import RemoveCartButton from "./RemoveCartButton";
import { CartItemData } from "@/lib/queries/getCart";

type CartItemProps = {
    item: CartItemData;
};

export function CartItem({ item }: CartItemProps) {
    const total = item.quantity * item.productVariant.price;

    return (
        <Card className="p-3 md:p-4">
            <div className="flex gap-3 md:gap-4">

                <Link
                    href={`/products/${item.productVariant.product.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-28"
                >
                    {item.productVariant.product.imageUrl && (
                        <Image
                            src={item.productVariant.product.imageUrl}
                            alt={item.productVariant.product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                            <Link
                                href={`/products/${item.productVariant.product.slug}`}
                                className="text-sm font-semibold leading-tight hover:underline sm:text-base line-clamp-2"
                            >
                                {item.productVariant.product.name}
                            </Link>

                            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                                {item.productVariant.name}
                            </p>

                            <p className="mt-1.5 text-sm font-semibold sm:text-base">
                                {formatCurrency(item.productVariant.price)}
                            </p>

                        </div>

                        <RemoveCartButton variantId={item.productVariant.id} />

                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3 md:pt-4">

                        <CartQuantityButtons quantity={item.quantity} id={item.productVariant.id} />
                        <p className="text-base font-bold sm:text-lg">
                            {formatCurrency(total)}
                        </p>

                    </div>

                </div>

            </div>
        </Card>
    );
}