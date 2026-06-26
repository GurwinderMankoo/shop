// src/schemas/auth.schema.ts

import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters and contain one number and one special character"
    ),
});

export const signinSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters and contain one number and one special character"
    ),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;