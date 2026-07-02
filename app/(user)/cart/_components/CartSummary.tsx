import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helper";

type CartSummaryProps = {
    subtotal: number;
    tax: number;
    total: number;
    shipping: number;
};

export function CartSummary({
    subtotal, tax, total, shipping
}: CartSummaryProps) {

    return (
        <Card className="sticky top-24">

            <CardHeader>
                <CardTitle>
                    Order Summary
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>

                    <span>
                        {shipping === 0
                            ? "Free"
                            : `${formatCurrency(shipping)}`}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>VAT</span>
                    <span>{formatCurrency(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>

                <Button
                    className="w-full"
                    size="lg"
                >
                    Proceed to Checkout
                </Button>

            </CardContent>

        </Card>
    );
}