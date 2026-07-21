'use client'
import { removeFromCart } from '@/app/actions/updateCart';
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner';

export default function RemoveCartButton({ variantId }: { variantId: string }) {

    const removeHandler = async (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.preventDefault();
        const res = await removeFromCart(id);

        if (res.success) {
            toast.success("🗑️ Product removed from cart");
        } else {
            // toast.error("⚠️ Unable to remove the product from your cart. Please try again.");
            toast.error(res.error);
        }
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={(event) => removeHandler(event, variantId)}
            className='cursor-pointer'
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
