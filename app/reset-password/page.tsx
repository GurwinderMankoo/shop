import Link from "next/link";
import { Lock, XCircle, ArrowLeft } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verifyResetToken } from "@/lib/auth/verifyResetToken";
import { ResetPasswordClient } from "./_components/ResetPasswordClient";

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    const cardWrapper = (children: React.ReactNode) => (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Set a New Password</CardTitle>
                    <CardDescription>
                        Choose a strong password you haven&apos;t used before.
                    </CardDescription>
                </CardHeader>
                {children}
                <div className="px-6 pb-6 text-center">
                    <Button asChild variant="link" size="sm" className="gap-1">
                        <Link href="/sign-in">
                            <ArrowLeft className="h-3 w-3" />
                            Back to Sign In
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );

    if (!token) {
        return cardWrapper(
            <CardContent className="flex flex-col items-center py-12 text-center">
                <XCircle className="mb-4 h-14 w-14 text-destructive" />
                <h2 className="text-xl font-semibold">Invalid Link</h2>
                <p className="mt-2 text-sm text-muted-foreground">Missing reset token.</p>
                <Button asChild className="mt-6">
                    <Link href="/forgot-password">Request a New Link</Link>
                </Button>
            </CardContent>
        );
    }

    const result = await verifyResetToken(token);

    if (!result.success) {
        return cardWrapper(
            <CardContent className="flex flex-col items-center py-12 text-center">
                <XCircle className="mb-4 h-14 w-14 text-destructive" />
                <h2 className="text-xl font-semibold">Invalid or Expired Link</h2>
                <p className="mt-2 text-sm text-muted-foreground">{result.error}</p>
                <Button asChild className="mt-6">
                    <Link href="/forgot-password">Request a New Link</Link>
                </Button>
            </CardContent>
        );
    }

    return cardWrapper(
        <ResetPasswordClient token={token} />
    );
}
