import { resend } from "../resend"


export async function sendEmail(email: string, token: string) {
    try {

        const verifyURL = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify your email",
            html: `
                <h2>Welcome!</h2>

                <p>
                Click the button below to verify your email.
                </p>

                <a href="${verifyURL}">
                Verify Email
                </a>
            `,
        })

    } catch (error) {
        throw new Error('Field to send email')
    }
}