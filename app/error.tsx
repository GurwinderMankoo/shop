"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">

            <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-10 w-10 text-destructive" />
            </div>


            <h1 className="mt-6 text-3xl font-bold">
                Something went wrong
            </h1>


            <p className="mt-3 max-w-md text-muted-foreground">
                We couldn't load this page right now.
                Please try again or go back later.
            </p>


            <div className="mt-8 flex gap-4">

                <Button
                    onClick={() => reset()}
                >
                    Try Again
                </Button>


                <Button
                    variant="outline"
                    asChild
                >
                    <a href="/">
                        Go Home
                    </a>
                </Button>

            </div>

        </div>
    );
}