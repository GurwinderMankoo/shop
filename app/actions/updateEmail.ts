"use server"
import { createVerificationToken } from "@/lib/auth/createVerificationToken";
import { sendEmail } from "@/lib/auth/sendEmail";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { verifyEmailSchema } from "@/lib/validations/auth.schema";
import { FormState } from "@/types/form.type"

export type UpdateEmailFormValues = {
    pendingEmail: string
}

export type UpdateEmailState = FormState<UpdateEmailFormValues>

export async function updateEmail(prevState: UpdateEmailState, formData: FormData): Promise<UpdateEmailState> {

    try {

        const emailReceived = formData.get("pendingEmail")?.toString();

        const result = verifyEmailSchema.safeParse({
            pendingEmail: emailReceived,
        });

        if (!result.success) {
            return {
                success: false,
                errors: result.error.flatten().fieldErrors,
                values: {
                    pendingEmail: emailReceived,
                }
            }
        }

        const {
            pendingEmail
        } = result.data;

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return {
                errors: {
                    pendingEmail: ["User not found"]
                },
                success: false
            }
        }

        const existingEmail = await prisma.user.findUnique({
            where: {
                email: pendingEmail
            }
        })

        if (existingEmail) {
            return {
                success: false,
                errors: {
                    pendingEmail: ["Email already in use"]
                }
            }
        }

        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                pendingEmail
            }
        })

        const token = await createVerificationToken(currentUser.id);

        await sendEmail(pendingEmail, token, true);

        return {
            success: true,
            errors: {},
            values: {
                pendingEmail
            }
        }
    } catch (error) {
        console.error(error)
        return {
            errors: {
                pendingEmail: ["Something went wrong"]
            },
            success: false
        }
    }
}