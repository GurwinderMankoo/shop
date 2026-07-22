import { prisma } from "@/lib/prisma";
import { TokenSchema } from "@/lib/validations/auth.schema";

export type VerifyResetTokenResult =
    | { success: true; userId: string }
    | { success: false; error: string };

/**
 * Validates a password-reset token and returns the associated userId.
 * Does NOT modify any user data — the caller (resetPassword action)
 * is responsible for updating the password and consuming the token.
 */
export async function verifyResetToken(token: string): Promise<VerifyResetTokenResult> {
    const tokenResult = TokenSchema.safeParse(token);

    if (!tokenResult.success) {
        return { success: false, error: "Invalid token" };
    }

    const sanitizedToken = tokenResult.data;

    try {
        const record = await prisma.verificationTokens.findUnique({
            where: { token: sanitizedToken },
        });

        if (!record) {
            return { success: false, error: "Invalid or already used token" };
        }

        if (record.expiresAt < new Date()) {
            await prisma.verificationTokens.delete({
                where: { token: sanitizedToken },
            });
            return { success: false, error: "Token expired. Please request a new password reset." };
        }

        return { success: true, userId: record.userId };
    } catch {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
