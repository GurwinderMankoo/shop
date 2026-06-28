// src/schemas/auth.schema.ts

import { z } from "zod";

const passwordSchema = z.string().regex(
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    "Password must be at least 8 characters and contain one number and one special character"
)

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export const signinSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters and contain one number and one special character"
    ),
});

export const verifyEmailSchema = z.object({
    pendingEmail: z.email("Invalid email address"),
})

export const UpdatePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, "Current password is required"),

        newPassword: passwordSchema,

        confirmPassword: z
            .string()
            .min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const updateProfileSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
})

// Define a strict schema rule
export const TokenSchema = z.string().trim().uuid("Invalid Token layout");

export type TokenSchemaType = z.infer<typeof TokenSchema>

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>

export type SigninSchema = z.infer<typeof signinSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;