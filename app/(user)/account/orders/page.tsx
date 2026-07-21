import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "./_EmptyState";
import { getOrders } from "@/app/actions/orders";
import { formatCurrency } from "@/lib/helper";

type Order = {
    id: string;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED" | "PAID";
    createdAt: Date;
    total: number;
    itemCount: number;
};

export default async function OrdersPage() {
    const orders = await getOrders();


    return (
        <div className="space-y-6">

            <h2 className="text-2xl font-bold">
                Orders
            </h2>

            {orders.length < 1 ? (
                <EmptyState />
            ) :
                orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between">

                            <div>
                                <CardTitle>
                                    Order #{order.id}
                                </CardTitle>

                                <p className="text-sm text-muted-foreground mt-1">
                                    Placed on{" "}
                                    {order.createdAt.toLocaleDateString()}
                                </p>
                            </div>

                            <StatusBadge status={order.status} />

                        </CardHeader>

                        <CardContent>

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                <div className="space-y-1">

                                    <p>
                                        <strong>Items:</strong>{" "}
                                        {order.items.length}
                                    </p>

                                    <p>
                                        <strong>Total:</strong>
                                        {
                                            formatCurrency(order.total)
                                        }
                                    </p>

                                </div>

                                <Button asChild>
                                    <Link href={`/account/orders/${order.id}`}>
                                        View Details
                                    </Link>
                                </Button>

                            </div>

                        </CardContent>
                    </Card>
                ))}

        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: Order["status"];
}) {
    switch (status) {
        case "DELIVERED":
            return <Badge>Delivered</Badge>;

        case "SHIPPED":
            return <Badge variant="secondary">Shipped</Badge>;

        case "PROCESSING":
            return <Badge variant="outline">Processing</Badge>;

        case "PAID":
            return <Badge variant="outline">Paid</Badge>;

        case "PENDING":
            return <Badge variant="outline">Pending</Badge>;

        case "CANCELLED":
            return <Badge variant="destructive">Cancelled</Badge>;

        case "REFUNDED":
            return <Badge variant="destructive">Refunded</Badge>;

        default:
            return null;
    }
}