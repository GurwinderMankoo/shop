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

type Order = {
    id: string;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    createdAt: Date;
    total: number;
    itemCount: number;
};

export default function OrdersPage() {
    const orders: Order[] = [
        {
            id: "102348",
            status: "Delivered",
            createdAt: new Date(),
            total: 129.99,
            itemCount: 2,
        },
        {
            id: "102201",
            status: "Shipped",
            createdAt: new Date(),
            total: 39.99,
            itemCount: 1,
        },
    ];


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
                                        {order.itemCount}
                                    </p>

                                    <p>
                                        <strong>Total:</strong> £
                                        {order.total.toFixed(2)}
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
        case "Delivered":
            return <Badge>Delivered</Badge>;

        case "Shipped":
            return <Badge variant="secondary">Shipped</Badge>;

        case "Processing":
            return <Badge variant="outline">Processing</Badge>;

        case "Pending":
            return <Badge variant="outline">Pending</Badge>;

        case "Cancelled":
            return <Badge variant="destructive">Cancelled</Badge>;
    }
}