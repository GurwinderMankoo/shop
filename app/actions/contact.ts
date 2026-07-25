"use server";

import { resend } from "@/lib/resend";
import { FormState } from "@/types/form.type";

export type ContactFormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactState = FormState<ContactFormValues>;

export async function submitContact(
    prevState: ContactState,
    formData: FormData
): Promise<ContactState> {
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const errors: Record<string, string[]> = {};

    if (!name) errors.name = ["Name is required"];
    if (!email) errors.email = ["Email is required"];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = ["Invalid email address"];

    if (!subject) errors.subject = ["Subject is required"];
    if (!message) errors.message = ["Message is required"];
    else if (message.length < 10)
        errors.message = ["Message must be at least 10 characters"];

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
            values: { name, email, subject, message },
        };
    }

    try {
        await resend.emails.send({
            from: "ShopSphere Contact <onboarding@resend.dev>",
            to: email === 'gurwinder.codes@gmail.com' ? email : 'delivered@resend.dev',
            replyTo: email,
            subject: `[Contact] ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        });

        return {
            success: true,
            errors: {},
            values: { name: "", email: "", subject: "", message: "" },
        };
    } catch (error) {
        // console.error("Contact form error:", error);
        return {
            success: false,
            errors: {
                message: ["Something went wrong. Please try again later."],
            },
            values: { name, email, subject, message },
        };
    }
}
