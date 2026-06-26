import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">

            <Package className="mb-4 h-14 w-14 text-muted-foreground" />

            <h3 className="text-xl font-semibold">
                No orders yet
            </h3>

            <p className="mt-2 text-muted-foreground">
                Looks like you haven't purchased anything.
            </p>

            <Button className="mt-6" asChild>
                <Link href="/products">
                    Start Shopping
                </Link>
            </Button>

        </div>
    )
}
