"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UpdatePasswordSchema } from "@/lib/validations/auth.schema";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { FormState } from "@/types/form.type";

// 1. Fixed: Ensure the return type and prevState align correctly for React Hooks
export type UpdatePasswordFormState = FormState<UpdatePasswordSchema>

export async function updatePassword(
    prevState: UpdatePasswordFormState, // Fixed type
    formData: FormData
): Promise<UpdatePasswordFormState> {

    // 2. Auth Guard: Catch unauthenticated sessions early
    const user = await getCurrentUser();
    if (!user || !user.email) {
        return {
            success: false,
            errors: {
                currentPassword: ["You must be logged in to change your password."]
            }
        };
    }

    const currentPasswordReceived = formData.get("currentPassword")?.toString() || "";
    const newPasswordReceived = formData.get("newPassword")?.toString() || "";
    const confirmPasswordReceived = formData.get("confirmPassword")?.toString() || "";

    const result = UpdatePasswordSchema.safeParse({
        currentPassword: currentPasswordReceived,
        newPassword: newPasswordReceived,
        confirmPassword: confirmPasswordReceived
    });

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { currentPassword, newPassword } = result.data;

    // 3. Fetch user via secure email context
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
    });

    if (!existingUser || !existingUser.password) {
        return {
            success: false,
            errors: {
                currentPassword: ["User account not found."]
            }
        };
    }

    // 4. Verify password validity
    const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        return {
            success: false,
            errors: {
                currentPassword: ["Current password is incorrect"]
            }
        };
    }

    // 5. Encrypt and save down using primary keys (IDs)
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { id: existingUser.id }, // Fixed: Optimized query target using ID
        data: { password: hashedPassword }
    });

    return {
        success: true,
        errors: {}
    };
}