"use server"
import { prisma } from "@/lib/prisma";
import { TokenSchema } from "@/lib/validations/auth.schema";

export async function verifyEmail(token: string) {
    try {
        // Safely parse the token input
        const tokenResult = TokenSchema.safeParse(token);

        // If parsing fails (e.g. injected scripts, too short, invalid characters), exit early
        if (!tokenResult.success) {
            return {
                success: false,
                error: "Invalid Token"
            };
        }

        // This is now guaranteed clean and safe
        const sanitizedToken = tokenResult.data;

        // Use a transaction to ensure atomicity and prevent race conditions
        const result = await prisma.$transaction(async (tx) => {
            // 1. Find and immediately delete the token to prevent replay attacks
            // If the token doesn't exist, prisma will throw an error or return null
            const record = await tx.verificationTokens.findUnique({
                where: { token: sanitizedToken }
            });

            if (!record) {
                throw new Error("INVALID_TOKEN");
            }

            // 2. Check expiration
            if (record.expiresAt < new Date()) {
                // Optional: Delete the expired token anyway to keep DB clean
                await tx.verificationTokens.delete({ where: { token } });
                throw new Error("TOKEN_EXPIRED");
            }

            const user = await tx.user.findUnique({ where: { id: record.userId } });

            // 3. Update the user and delete the token in the same transaction
            await tx.user.update({
                where: { id: record.userId },
                data: {
                    emailVerified: true,
                    email: user?.pendingEmail ?? user?.email,
                    pendingEmail: null,
                }
            });

            await tx.verificationTokens.delete({
                where: { token }
            });

            return { success: true };
        });

        return {
            success: result.success,
            error: null
        };

    } catch (error: any) {
        // Handle expected errors gracefully without leaking system details
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

        // Log unexpected errors internally, return a generic message to user
        return { success: false, error: "Something went wrong. Please try again." };
    }
}