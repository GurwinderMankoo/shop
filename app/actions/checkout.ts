'use server'

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { validateVariant } from "./updateCart";

export async function checkout() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        },
        include: {
            items: {
                include: {
                    productVariant: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    })

    if (!cart || cart?.items.length === 0) {
        return {
            success: false,
            error: "Cart not found"
        }
    }

    const lineItems = cart.items.map(item => ({
        quantity: item.quantity,
        price_data: {
            currency: "INR",
            product_data: {
                name: item.productVariant.name,
            },
            unit_amount: Math.round(
                item.productVariant.price.toNumber() * 100
            ),
        },
    }));

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: "PENDING",
            paymentStatus: "PENDING",
            subtotal: cart.subtotal,
            discountAmount: cart.discount,
            taxAmount: cart.tax,
            shippingAmount: cart.shipping,
            total: cart.total,

            items: {
                create: cart.items.map((item, i, arr) => ({
                    productId: item.productVariant.productId,
                    variantId: item.productVariant.id,
                    quantity: item.quantity,
                    price: item.productVariant.price,
                    productName: item.productVariant.product.name,
                    variantName: item.productVariant.name,
                    // slug: item.productVariant.product.slug,
                    sku: item.productVariant.sku,
                    image: item.productVariant.product.imageUrl ?? ""
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: lineItems,

        success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/cart`,

        metadata: {
            orderId: order.id,
            cartId: cart.id,
            userId: user.id,
        }
    });

    await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            stripeCheckoutSessionId: session.id
        }
    })

    redirect(session.url!);

}

export async function buy(variantId: string, quantity: number) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const variant = await validateVariant(variantId, true);

    const subtotal = Number(variant.price) * quantity;

    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const lineItems = [{
        quantity: quantity,
        price_data: {
            currency: "INR",
            product_data: {
                name: variant.name,
            },
            unit_amount: Math.round(
                variant.price.toNumber() * 100
            ),
        },
    }];

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: "PENDING",
            paymentStatus: "PENDING",
            total,
            subtotal,
            taxAmount: tax,
            shippingAmount: shipping,
            items: {
                create: {
                    productId: variant.productId,
                    variantId: variant.id,
                    quantity,
                    price: variant.price,
                    productName: variant.product.name,
                    variantName: variant.name,
                    // slug: variant.product.slug,
                    sku: variant.sku,
                    image: variant.product.imageUrl ?? ""
                }
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [...lineItems],
        success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
        metadata: {
            userId: user.id,
            orderId: order.id
        }
    });

    await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            stripeCheckoutSessionId: session.id
        }
    })

    redirect(session.url!);
}


export async function verifySession(session_id: string) {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session?.metadata?.orderId;

    if (session.payment_status !== "paid") {
        redirect("/cart");
    }

    return orderId

}