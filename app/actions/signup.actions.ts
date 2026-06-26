"use server";

import { createVerificationToken } from "@/lib/auth/createVerificationToken";
import { sendEmail } from "@/lib/auth/sendEmail";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth.schema";
import { SignupFormState } from "@/types/signup.type";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(prevState: SignupFormState, data: FormData): Promise<SignupFormState> {

    const emailReceived = data.get("email")?.toString();
    const passwordReceived = data.get("password")?.toString();
    const firstNameReceived = data.get("firstName")?.toString();
    const lastNameReceived = data.get("lastName")?.toString();

    const values = {
        email: emailReceived,
        password: passwordReceived,
        firstName: firstNameReceived,
        lastName: lastNameReceived,
    }

    const result = registerSchema.safeParse({
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
        lastName,
        email,
        password
    } = result.data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return {
            success: false,
            errors: {
                email: ["Email already exists"]
            }
        }
    }

    const hashedPassword = await bcrypt.hash(
        password,
        12
    );

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        },
    });

    const token = await createVerificationToken(user.id);

    await sendEmail(email, token);

    return {
        success: true,
        errors: {}
    };

}