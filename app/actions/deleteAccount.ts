'use server';

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { deleteAccountSchema } from "@/lib/validations/auth.schema";
import { DeleteAccountFormState } from "@/types/deleteAccount.type";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function deleteAccount(prevState: DeleteAccountFormState, data: FormData): Promise<DeleteAccountFormState> {
    try {
        const password = data.get("password")?.toString();
        const confirmationText = data.get("confirmationText")?.toString();

        const user = await getCurrentUser();
        const cookieStore = await cookies();


        if (!user) {
            throw new Error("Unauthorized");
        }

        const result = deleteAccountSchema.safeParse({
            password,
            confirmationText
        });

        if (!result.success) {
            return {
                success: false,
                errors: result.error.flatten().fieldErrors,
            }
        }

        const {
            password: passwordReceived,
            confirmationText: confirmationTextReceived
        } = result.data;

        const validPassword = await prisma.user.findUnique({
            where: {
                email: user.email
            },
            select: {
                password: true
            }
        });

        const isPasswordCorrect = await bcrypt.compare(passwordReceived, validPassword?.password || "");

        if (!isPasswordCorrect) {
            return {
                success: false,
                errors: {
                    password: ["Incorrect password"]
                }
            }
        }

        const response = await Promise.all([
            prisma.cart.deleteMany({
                where: {
                    userId: user.id
                }
            }),
            prisma.wishlist.deleteMany({
                where: {
                    userId: user.id
                }
            }),
            prisma.session.deleteMany({
                where: {
                    userId: user.id
                }
            }),
            prisma.user.delete({
                where: {
                    id: user.id
                }
            }),
        ])

        if (!response) {
            throw new Error("Failed to delete account");
        }

        await cookieStore.delete('session');

        return {
            success: true,
            errors: {},
            message: "Account deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            errors: {},
            message: (error as Error).message
        }
    }
}