"use client"
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner';

import { addToCart } from '@/app/actions/updateCart';
import { Button } from '@/components/ui/button'

export default function ProductAddToCartButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        startTransition(async () => {
            const res = await addToCart(id, 1);

            if (res.success) {
                toast.success("🛒 Product added to your cart!");
                router.refresh();
                // No router.refresh() needed! useTransition handles it.
            } else if (res.error) {
                toast.error(res.error);
            }
        });
    }

    return (
        <Button
            size="icon"
            className="shrink-0 z-10 cursor-pointer"
            onClick={handleAddToCart}
            disabled={isPending}
            aria-label="Add to cart"
        >
            {isPending ? (
                <Loader2 size={18} className="animate-spin" />
            ) : (
                <ShoppingCart size={18} />
            )}
        </Button>
    )
}
