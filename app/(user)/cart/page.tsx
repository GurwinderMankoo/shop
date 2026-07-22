import { getCart } from "@/lib/queries/getCart";
import PageLayout from "@/components/shared/PageLayout";
import { CartItem } from "./_components/CartItem";
import { CartSummary } from "./_components/CartSummary";
import { EmptyCart } from "./_components/EmptyCart";

export default async function CartPage() {
    const cart = await getCart()

    return (
        <PageLayout>

            <h1 className="mb-6 text-2xl font-bold md:text-3xl md:mb-8">
                Shopping Cart
            </h1>

            {cart.items.length > 0 ? (
                <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_350px]">

                    <div className="space-y-3 md:space-y-4">
                        {cart.items.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <CartSummary
                            subtotal={cart.subtotal}
                            shipping={cart.shipping}
                            tax={cart.tax}
                            total={cart.total}
                        />
                    </div>

                </div>
            ) : (
                <EmptyCart />
            )}

        </PageLayout>
    );
}