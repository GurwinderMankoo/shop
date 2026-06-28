"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/queries/getCurrentUser"
import { updateProfileSchema } from "@/lib/validations/auth.schema"
import { FormState } from "@/types/form.type"

export type UpdateProfileFormValues = {
    firstName: string
    lastName: string
    email: string
}

export type UpdateProfileState = FormState<UpdateProfileFormValues>

export async function updateProfile(prevState: UpdateProfileState, formData: FormData): Promise<UpdateProfileState> {
    const firstNameReceived = formData.get("firstName")?.toString();
    const lastNameReceived = formData.get("lastName")?.toString();

    const values = {
        firstName: firstNameReceived,
        lastName: lastNameReceived,
    }

    const result = updateProfileSchema.safeParse({
        ...values
    });

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
            values: {
                ...values
            }
        }
    }

    const {
        firstName,
        lastName
    } = result.data;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return {
            errors: {
                firstName: ["User not found"],
                lastName: ["User not found"],
            },
            success: false
        }
    }

    await prisma.user.update({
        where: {
            id: currentUser?.id
        },
        data: {
            firstName,
            lastName
        }
    })

    return {
        errors: {},
        success: true,
        values: {
            firstName,
            lastName
        }
    }
}