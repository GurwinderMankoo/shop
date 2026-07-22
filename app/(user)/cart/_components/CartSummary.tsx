import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helper";
import Checkout from "./Checkout";

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
        <Card>

            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">
                    Order Summary
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 p-4 pt-0 md:space-y-4 md:p-6 md:pt-0">

                <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">Shipping</span>

                    <span>
                        {shipping === 0
                            ? "Free"
                            : `${formatCurrency(shipping)}`}
                    </span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">VAT</span>
                    <span>{formatCurrency(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold md:text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>

                <Checkout />

            </CardContent>

        </Card>
    );
}