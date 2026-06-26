// app/verify-email/page.tsx

import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyEmail } from "../actions/verifyEmail";

type VerifyEmailPageProps = {
    searchParams: Promise<{
        token?: string;
    }>;
};

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {

    const { token } = await searchParams;

    if (!token) {
        return null
    }

    const result = await verifyEmail(token);

    const isSuccess = result.success;

    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
            <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">

                <div className="flex flex-col items-center text-center">

                    {isSuccess ? (
                        <>
                            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />

                            <h1 className="text-2xl font-semibold">
                                Email Verified
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                Your email address has been verified successfully.
                            </p>

                            <Link
                                href="/sign-in"
                                className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
                            >
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <>
                            <XCircle className="mb-4 h-16 w-16 text-red-500" />

                            <h1 className="text-2xl font-semibold">
                                Verification Failed
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                {result.error ??
                                    "The verification link is invalid or has expired."}
                            </p>

                            <Link
                                href="/"
                                className="mt-6 rounded-md border px-4 py-2"
                            >
                                Back to Home
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}