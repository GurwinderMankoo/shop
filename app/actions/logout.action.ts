'use server';
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";


export async function logout() {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
        return;
    }

    await prisma.session.deleteMany({
        where: {
            token
        }
    })

    cookieStore.delete("session");
}