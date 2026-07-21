"use client";

import Link from "next/link";
import { XCircle, RefreshCcw, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderFailedPage() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-red-50 via-background to-red-100 p-6 dark:from-red-950/20 dark:to-background">
            <Card className="w-full max-w-lg overflow-hidden border-red-200 shadow-2xl dark:border-red-900">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <XCircle className="h-14 w-14 text-white" />
                    </div>
                </div>

                <CardContent className="space-y-6 p-8 text-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Payment Failed
                        </h1>

                        <p className="mt-3 text-muted-foreground">
                            Unfortunately, we couldn't process your payment. Don't worry—no
                            money has been charged. You can try again or return to your cart.
                        </p>
                    </div>

                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                        Common reasons include:
                        <ul className="mt-3 space-y-1 text-left">
                            <li>• Card was declined.</li>
                            <li>• Payment was cancelled.</li>
                            <li>• Insufficient funds.</li>
                            <li>• Temporary network issue.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg" className="flex-1">
                            <Link href="/checkout">
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Try Again
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="flex-1">
                            <Link href="/cart">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Back to Cart
                            </Link>
                        </Button>
                    </div>

                    <div className="border-t pt-5 text-sm text-muted-foreground">
                        Need help? Contact our support team if the issue continues. We'll
                        be happy to assist you.
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}