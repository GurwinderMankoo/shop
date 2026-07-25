"use server";

import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/lib/auth/createVerificationToken";
import { resend } from "@/lib/resend";

export type ForgotPasswordState = {
    success: boolean;
    message?: string;
    error?: string;
};

export async function forgotPassword(
    prevState: ForgotPasswordState,
    formData: FormData
): Promise<ForgotPasswordState> {
    const email = formData.get("email")?.toString().trim();

    if (!email) {
        return { success: false, error: "Email is required" };
    }

    // Always return the same message whether user exists or not — security best practice
    // to prevent email enumeration.
    const genericMessage =
        "If an account with that email exists, a password reset link has been sent.";

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { success: true, message: genericMessage };
        }

        const token = await createVerificationToken(user.id);

        const resetURL = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

        const to =
            email === "gurwinder.codes@gmail.com"
                ? email
                : "delivered@resend.dev";

        const { error } = await resend.emails.send({
            from: "ShopSphere <onboarding@resend.dev>",
            to,
            subject: "Reset your ShopSphere password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
                    <h2>Reset Your Password</h2>
                    <p>We received a request to reset your ShopSphere account password.</p>
                    <a
                        href="${resetURL}"
                        style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 6px;"
                    >
                        Reset Password
                    </a>
                    <p style="color: #6b7280; font-size: 14px;">
                        This link expires in 5 minutes. If you didn't request this, you can safely ignore this email.
                    </p>
                </div>
            `,
        });

        if (error) {
            // console.error("Forgot password email error:", error);
            return { success: false, error: "Failed to send email. Please try again." };
        }

        return { success: true, message: genericMessage };
    } catch (error) {
        // console.error("Forgot password error:", error);
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
