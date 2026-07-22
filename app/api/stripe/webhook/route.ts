import { orderSummaryEmail } from "@/lib/auth/sendEmail";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return new Response('No signature', { status: 400 });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
        return new Response('Invalid signature', { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        if (!session) {
            return new Response('No session', { status: 400 });
        }

        //Make sure payment is complete
        if (session.payment_status !== 'paid') {
            return new Response('Payment not completed', { status: 400 });
        }


        const userId = session.metadata?.userId;
        const cartId = session.metadata?.cartId;
        const orderId = session.metadata?.orderId;

        if (!userId || !orderId) {
            return new Response('No user or cart id', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });



        const order = await prisma.$transaction(async (tx) => {
            //update order
            const order = await tx.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    stripeCheckoutSessionId: null,
                    stripeSessionExpiresAt: null,
                    status: 'PAID',
                    paymentStatus: 'PAID',
                },
                include: {
                    items: true,
                },

            });

            //update variant stock
            for (const item of order.items) {
                await tx.productVariant.update({
                    where: {
                        id: item.variantId,
                    },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            if (cartId) {
                //Delete the cart items
                await tx.cartItem.deleteMany({
                    where: {
                        cartId: cartId
                    }
                })

                //Delete the cart
                await tx.cart.update({
                    where: {
                        id: cartId
                    },
                    data: {
                        subtotal: 0,
                        total: 0,
                        discount: 0,
                        shipping: 0,
                        tax: 0,
                        couponId: null,
                    },
                })
            }

            return order
        })

        if (user && order) {
            const name = `${user.firstName} ${user.lastName}`
            orderSummaryEmail(user.email, name, order.id, Number(order.total));
        }
    }

    return new Response(null, { status: 200 });
}