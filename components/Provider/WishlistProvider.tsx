'use client'

import { getWishlist } from "@/app/actions/getWishlistAction"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"


type WishlistContextType = {
    wishlist: Set<string>
    setWishlist: React.Dispatch<React.SetStateAction<Set<string>>>
}

export const WishlistContext = createContext<WishlistContextType>({ wishlist: new Set(), setWishlist: () => { } })

export const useWishlist = () => useContext(WishlistContext)

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<Set<string>>(new Set())

    useEffect(() => {
        getWishlist().then((ids) => {
            console.log(ids)
            setWishlist(new Set(ids))
        })
    }, [user?.id])


    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
