'use server'

import { resend } from "../resend"


export async function sendDummyLink() {
    try {

        const verifyURL = `${process.env.NEXT_PUBLIC_APP_URL}/products`

        const { data, error } = await resend.emails.send({
            from: "My Store <onboarding@resend.dev>",
            to: 'delivered@resend.dev', //In production change this to email
            subject: `Test `,
            html: `
                <h2>Welcome!</h2>

                <p>
                Click the button below to verify your email.
                </p>

                <a href="${verifyURL}" target="_blank">
                Verify Email
                </a>
            `,
        })

        if (error) {
            throw new Error("Something went wrong")
        }


    } catch (error) {
        throw new Error('Field to send email')
    }
}