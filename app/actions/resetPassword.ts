"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyResetToken } from "@/lib/auth/verifyResetToken";

export type ResetPasswordState = {
    success: boolean;
    message?: string;
    error?: string;
    fieldErrors?: {
        password?: string;
        confirmPassword?: string;
    };
};

export async function resetPassword(
    prevState: ResetPasswordState,
    formData: FormData
): Promise<ResetPasswordState> {
    const token = formData.get("token")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    const fieldErrors: ResetPasswordState["fieldErrors"] = {};

    if (!token) {
        return { success: false, error: "Invalid reset link. Please request a new one." };
    }

    if (!password) {
        fieldErrors.password = "Password is required";
    } else if (password.length < 8) {
        fieldErrors.password = "Password must be at least 8 characters";
    } else if (!/[0-9]/.test(password)) {
        fieldErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        fieldErrors.password = "Password must contain at least one special character";
    }

    if (!confirmPassword) {
        fieldErrors.confirmPassword = "Please confirm your new password";
    } else if (password !== confirmPassword) {
        fieldErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { success: false, fieldErrors };
    }

    try {
        const verification = await verifyResetToken(token);

        if (!verification.success) {
            return { success: false, error: verification.error };
        }

        const hashedPassword = await bcrypt.hash(password!, 12);

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: verification.userId },
                data: { password: hashedPassword },
            });

            await tx.verificationTokens.delete({
                where: { token },
            });
        });

        return { success: true, message: "Password reset successfully. You can now sign in with your new password." };
    } catch (error) {
        // console.error("Reset password error:", error);
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
