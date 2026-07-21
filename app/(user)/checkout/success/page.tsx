import { redirect } from "next/navigation";
import Confetti from "@/components/ui/Confetti";
import { verifySession } from "@/app/actions/checkout";
import Image from "next/image";
import { getOrderById, getOrderBySession } from "@/app/actions/orders";

type Props = {
    searchParams: Promise<{
        session_id?: string;
    }>;
};

export default async function CheckoutSuccess({
    searchParams,
}: Props) {
    const { session_id } = await searchParams;

    if (!session_id) {
        redirect("/");
    }

    const orderId = await verifySession(session_id);

    if (!orderId) {
        redirect("/cart/failed");
    }

    const order = await getOrderById(orderId);

    if (!order) {
        redirect("/cart/failed");
    }

    return (
        <main className="relative mx-auto max-w-3xl px-6 py-20">
            <Confetti />

            <h1 className="text-4xl font-bold text-green-600">
                🎉 Payment Successful
            </h1>

            <p className="mt-3 text-muted-foreground">
                Thank you for your purchase.
            </p>

            <div className="mt-10 rounded-xl border bg-white">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b p-5 last:border-b-0"
                    >
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-gray-50">
                            <Image
                                src={item.image ?? ""}
                                alt={item.productName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold">
                                {item.productName}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {item.variantName}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold">
                                $
                                {(
                                    item.price.toNumber() *
                                    item.quantity
                                ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-lg bg-muted p-4">
                <div className="flex justify-between">
                    <span>Total Paid</span>
                    <span className="font-semibold">
                        ${order.total.toNumber().toFixed(2)}
                    </span>
                </div>
            </div>
        </main>
    );
}