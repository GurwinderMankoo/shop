'use client'

import { checkout } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Checkout() {

    const [isPending, startTransition] = useTransition();

    return (
        <Button
            className="w-full cursor-pointer"
            size="lg"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    try {
                        await checkout();
                    } catch (error) {
                        toast.error("⚠️ Unable to checkout. Please try again.");
                    }
                })
            }}
        >
            {isPending ? 'Redirecting...' : 'Proceed to Checkout'}
        </Button>
    )
}
