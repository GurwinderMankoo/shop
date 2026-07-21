import { prisma } from "@/lib/prisma";
import { TokenSchema } from "@/lib/validations/auth.schema";

export type VerifyTokenResult =
    | { success: true; userId: string }
    | { success: false; error: string };

/**
 * Shared utility that validates a verification token and updates the user's
 * email verification status inside a transaction. Returns the userId on
 * success so callers can decide what to do next (e.g. create a session).
 */
export async function verifyEmailToken(token: string): Promise<VerifyTokenResult> {
    const tokenResult = TokenSchema.safeParse(token);

    if (!tokenResult.success) {
        return {
            success: false,
            error: "Invalid Token"
        };
    }

    const sanitizedToken = tokenResult.data;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const record = await tx.verificationTokens.findUnique({
                where: { token: sanitizedToken }
            });

            if (!record) {
                throw new Error("INVALID_TOKEN");
            }

            if (record.expiresAt < new Date()) {
                await tx.verificationTokens.delete({
                    where: { token: sanitizedToken }
                });
                throw new Error("TOKEN_EXPIRED");
            }

            const user = await tx.user.findUnique({
                where: { id: record.userId }
            });

            await tx.user.update({
                where: { id: record.userId },
                data: {
                    emailVerified: true,
                    email: user?.pendingEmail ?? user?.email,
                    pendingEmail: null,
                }
            });

            await tx.verificationTokens.delete({
                where: { token: sanitizedToken }
            });

            return { userId: record.userId };
        });

        return { success: true, userId: result.userId };
    } catch (error: any) {
        if (error.message === "INVALID_TOKEN") {
            return {
                success: false,
                error: "Invalid Token"
            };
        }
        if (error.message === "TOKEN_EXPIRED") {
            return {
                success: false,
                error: "Token expired"
            };
        }

        return {
            success: false,
            error: "Something went wrong. Please try again."
        };
    }
}
