"use server"

import { verifyEmailToken } from "@/lib/auth/verifyEmailToken";

export async function verifyEmail(token: string) {
    const result = await verifyEmailToken(token);

    if (result.success) {
        return { success: true as const, error: null };
    }

    return { success: false as const, error: result.error };
}