"use server"

import { getCartItemsCount } from "@/lib/queries/getCart"

export async function getCartCount() {
    return await getCartItemsCount()
}