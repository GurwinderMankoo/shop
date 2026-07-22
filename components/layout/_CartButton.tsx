import { getCartItemsCount } from '@/lib/queries/getCart';
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default async function CartButton() {

    const cartItems = await getCartItemsCount() ?? 0;


    return (
        <button className="relative">
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
            </Link>
            {cartItems > 0 && <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartItems}
            </span>}
        </button>
    )
}
