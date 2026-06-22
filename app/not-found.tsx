'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <div className="space-y-6">
                <div>
                    <h1 className="text-8xl font-bold tracking-tight">
                        404
                    </h1>

                    <h2 className="mt-4 text-3xl font-semibold">
                        Page Not Found
                    </h2>

                    <p className="mt-2 max-w-md text-muted-foreground">
                        Sorry, we couldn't find the page you're looking for.
                        It may have been removed, renamed, or never existed.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back Home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}