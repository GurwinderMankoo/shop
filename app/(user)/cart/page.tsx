import { getCart } from "@/lib/queries/getCart";
import { CartItem } from "./_components/CartItem";
import { CartSummary } from "./_components/CartSummary";
import { EmptyCart } from "./_components/EmptyCart";

export default async function CartPage() {
    const cart = await getCart()

    return (
        <div className="container mx-auto py-8">

            <h1 className="mb-8 text-3xl font-bold">
                Shopping Cart
            </h1>

            {cart?.items?.length > 0 ? <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                <div className="space-y-4">
                    {cart.items.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>

                <CartSummary {...cart.summary} />

            </div>
                :
                <EmptyCart />

            }

        </div>
    );
}