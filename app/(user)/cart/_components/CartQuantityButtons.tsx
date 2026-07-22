"use client"
import { addToCart } from '@/app/actions/updateCart';
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartQuantityButtons({ quantity, id }: { quantity: number, id: string }) {

    const [lodaing, setLoading] = useState(false);
    const router = useRouter();
    const updateCart = async (event: React.MouseEvent<HTMLButtonElement>, variantId: string, quantity: number) => {


        event.preventDefault();
        setLoading(true);
        const res = await addToCart(variantId, quantity);
        if (res.success) {
            toast.success("🛒 Cart updated successfully!");
            router.refresh();

        } else {
            toast.error("🛒 Cart failed to updated");
        }
        setLoading(false);

    }
    return (
        <div className="flex items-center gap-1.5 sm:gap-2">

            <Button
                size="icon"
                variant="outline"
                disabled={quantity === 1 || lodaing}
                className='h-9 w-9 cursor-pointer sm:h-10 sm:w-10'
                onClick={(e) => updateCart(e, id, -1)}
            >
                <Minus className="h-4 w-4" />
            </Button>

            <span className="flex h-9 w-9 items-center justify-center text-sm font-medium sm:h-10 sm:w-10 sm:text-base">
                {quantity}
            </span>

            <Button
                size="icon"
                variant="outline"
                className='h-9 w-9 cursor-pointer sm:h-10 sm:w-10'
                onClick={(e) => updateCart(e, id, 1)}
                disabled={lodaing}
            >
                <Plus className="h-4 w-4" />
            </Button>

        </div>

    )
}
