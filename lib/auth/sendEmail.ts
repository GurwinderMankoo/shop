import { resend } from "../resend"



const orderEmail = (userName: string, orderId: string, orderTotal: number) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827;">
    <h2 style="margin-bottom: 8px;">Order Confirmed 🎉</h2>
    
    <p>Hi ${userName || "Customer"},</p>

    <p>
      Thank you for your purchase. Your payment has been received successfully
      and your order is now being processed.
    </p>

    <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 8px 0;"><strong>Order ID:</strong> ${orderId}</p>
      <p style="margin: 0;"><strong>Total:</strong> ₹${Number(orderTotal).toFixed(2)}</p>
    </div>

    <p>We’ll send you another email once your order has been shipped.</p>

    <p style="margin-top: 32px;">
      Thanks,<br />
      <strong>Your Store</strong>
    </p>
  </div>
`;

export async function sendEmail(email: string, token: string, isUpdateEmail: boolean = false) {
    try {

        const verifyURL = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&isUpdateEmail=${isUpdateEmail}`

        const to = email === 'gurwinder.codes@gmail.com' ? email : 'delivered@resend.dev';

        const { data, error } = await resend.emails.send({
            from: "My Store <onboarding@resend.dev>",
            to, //In production change this to email
            subject: `Verify your email on ${email}`,
            html: `<h2>Welcome!</h2>

                <p>
                Click the button below to verify your email.
                </p>

                <a href="${verifyURL}">
                Verify Email
                </a>`,
        })

        if (error) {
            throw new Error("Something went wrong")
        }


    } catch (error) {
        throw new Error('Field to send email')
    }
}


export async function orderSummaryEmail(email: string, userName: string, orderId: string, orderTotal: number) {
    try {
        const to = email === 'gurwinder.codes@gmail.com' ? email : 'delivered@resend.dev';

        const { data, error } = await resend.emails.send({
            from: "My Store <onboarding@resend.dev>",
            to, //In production change this to email
            subject: `Order Confirmation #${orderId}`,
            html: orderEmail(userName, orderId, orderTotal),
        })

        if (error) {
            throw new Error("Something went wrong")
        }
    } catch (error) {
        throw new Error('Field to send email')
    }
}