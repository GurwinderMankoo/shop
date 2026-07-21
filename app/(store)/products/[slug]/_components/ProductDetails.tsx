"use client";
import { useCallback, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import DiscountBadge from "@/components/shared/DiscountBadge";
import { formatCurrency } from "@/lib/helper";
import { Product } from "@/types/products";
import VariantOptions from "./VariantOptions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/Provider/AuthProvider";
import { addToCart } from "@/app/actions/updateCart";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProductDetails({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition();

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    const selectedOptions = useMemo(() => {
        return selectedVariant.optionValues.reduce<Record<string, string>>((acc, { optionValue }) => {

            acc[optionValue.option.name] = optionValue.value
            return acc;
        }, {})
    }, [selectedVariant]);

    const onVariantChange = useCallback((value: string, name: string) => {
        const nextOptions = { ...selectedOptions }
        nextOptions[name] = value;
        let variant = product?.variants.find((variant) => {
            return variant.optionValues.every(({ optionValue }) => {
                return nextOptions[optionValue.option.name] === optionValue.value
            });
        });

        if (!variant) {
            variant = product?.variants.find((variant) => {
                return variant.optionValues.some(({ optionValue }) => {
                    return optionValue.option.name === name && optionValue.value === value
                });
            });
            if (!variant) {
                return;
            }
        }

        setSelectedVariant(variant);
    }, [product?.variants, selectedOptions]);


    if (!selectedVariant) {
        return null;
    }


    const onAddToCart = () => {
        if (!user) {
            router.push(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        startTransition(async () => {
            const res = await addToCart(selectedVariant.id, quantity);

            if (res.success) {
                toast.success("Product added to your cart!");
                router.refresh();
                return;
            }

            if (res.error) {
                toast.error(res.error);
            }
        });
    }

    return (
        <>


            <div className="mt-6 flex items-center gap-3">
                <span className="text-4xl font-bold">
                    {
                        formatCurrency(selectedVariant.price || 0)
                    }
                </span>

                <span className="text-lg text-muted-foreground line-through">
                    {
                        formatCurrency(selectedVariant.comparePrice || 0)
                    }
                </span>
                {
                    DiscountBadge({
                        price: Number(selectedVariant.price || 0),
                        comparePrice: Number(selectedVariant.comparePrice || 0)
                    })
                }
            </div>

            {/* Variants */}
            {
                product?.options?.map((option, i) => (
                    <VariantOptions
                        id={option.id}
                        key={option.id}
                        name={option.name}
                        values={option.values}
                        value={selectedOptions[option.name]}
                        onChange={onVariantChange}
                    />
                ))
            }

            {/* Quantity */}

            <div className="mt-6">
                <label className="mb-2 block font-medium">
                    Quantity
                </label>

                <input
                    type="number"
                    value={quantity}
                    min={1}
                    className="h-10 w-24 rounded-md border px-3"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            {/* Actions */}

            <div className="mt-8 flex gap-4">
                <Button size="lg" onClick={onAddToCart} disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : null}
                    Add to Cart
                </Button>

                {/* <Button
                    size="lg"
                    variant="outline"
                >
                    Buy Now
                </Button> */}
            </div>

        </>
    )
}
