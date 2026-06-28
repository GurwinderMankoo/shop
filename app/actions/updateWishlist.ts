"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/queries/getCurrentUser"
import { cookies } from "next/headers";

export async function addProductWishlist(productId: string) {
    const user = await getCurrentUser();
    const cookieStore = await cookies();

    if (!user) {
        // const wishlist = cookieStore.get("wishlist")?.value;

        // if (wishlist) {
        //     const parsedWishlist = JSON.parse(wishlist);
        //     parsedWishlist.push(productId);
        //     cookieStore.set("wishlist", JSON.stringify(parsedWishlist));
        //     return;
        // }

        throw new Error("Unauthorized");
    }

    return await prisma.wishlist.create({
        data: {
            product: {
                connect: {
                    id: productId
                }
            },
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    })
}


export async function removeProductWishlist(productId: string) {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    console.log(user, "user")

    if (!user) {
        // const wishlist = cookieStore.get("wishlist")?.value;

        // if (wishlist) {
        //     const parsedWishlist = JSON.parse(wishlist);
        //     const updatedWishlist = parsedWishlist.filter((id: string) => id !== productId);
        //     cookieStore.set("wishlist", JSON.stringify(updatedWishlist));
        //     return;
        // }

        throw new Error("Unauthorized");
    }


    return await prisma.wishlist.deleteMany({
        where: {
            userId: user.id,
            productId,
        },
    });
}