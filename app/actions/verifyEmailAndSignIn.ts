"use server"

import { verifyEmailToken } from "@/lib/auth/verifyEmailToken";
import { createSession } from "@/lib/queries/session";
import { revalidatePath } from "next/cache";

export async function verifyEmailAndSignIn(token: string) {
    const result = await verifyEmailToken(token);

    if (!result.success) {
        return { success: false as const, error: result.error };
    }

    try {
        const res = await createSession(result.userId);
        revalidatePath('/')

        return { success: true as const, error: null };
    } catch (e) {
        return { success: false as const, error: "Something went wrong. Please try again." };
    }
}
