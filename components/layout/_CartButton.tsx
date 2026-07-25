'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

import { getCartCount } from '@/app/actions/getCart';

export default function CartButton() {

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        getCartCount().then(setCartCount);
    }, [])

    return (
        <button className="relative">
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
            </Link>
            {cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartCount}
            </span>}
        </button>
    )
}
