'use server';
import { createVerificationToken } from "@/lib/auth/createVerificationToken";
import { sendEmail } from "@/lib/auth/sendEmail";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/queries/session";
import { signinSchema } from "@/lib/validations/auth.schema";
import { SigninFormState } from "@/types/signin.types";
import bcrypt from "bcryptjs";

export async function signin(prevState: SigninFormState, data: FormData): Promise<SigninFormState> {

    const emailReceived = data.get("email")?.toString();
    const passwordReceived = data.get("password")?.toString();

    const result = signinSchema.safeParse({
        email: emailReceived,
        password: passwordReceived,
    });

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
            values: {
                email: emailReceived,
                password: passwordReceived,
            }
        }
    }

    const {
        email,
        password
    } = result.data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!existingUser) {
        return {
            success: false,
            errors: {
                email: ["User does not exist"]
            }
        }
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        return {
            success: false,
            errors: {
                email: ['Please provide a valid email'],
                password: ["Incorrect password"]
            }
        }
    }

    if (!existingUser.emailVarified) {

        const token = await prisma.verificationTokens.findFirst({
            where: {
                userId: existingUser.id
            }
        })
        if (token) {
            await prisma.verificationTokens.deleteMany({
                where: {
                    userId: existingUser.id
                }
            })
        }

        const newToken = await createVerificationToken(existingUser.id);
        await sendEmail(existingUser.email, newToken)


        return {
            success: false,
            errors: {
                email: ["Please verify your email. A email sent on your email address"]
            }
        }
    }

    await createSession(existingUser.id);

    return {
        success: true,
        errors: {},
        user: {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role
        }
    }
}