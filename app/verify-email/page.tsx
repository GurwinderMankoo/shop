'use client'
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { verifyEmail } from "../actions/verifyEmail";
import { verifyEmailAndSignIn } from "../actions/verifyEmailAndSignIn";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

type VerificationState =
    | { status: "pending"; error?: never }
    | { status: "success"; error?: never }
    | { status: "error"; error: string };



async function verifyToken(isUpdateEmail: boolean, token: string) {
    if (isUpdateEmail) {
        return await verifyEmail(token)
    }
    return await verifyEmailAndSignIn(token)
}

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const isUpdateEmail = searchParams.get("isUpdateEmail") === "true";
    const hasVerified = useRef(false);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<{ success: boolean; error: string | null }>({
        success: false,
        error: null,
    })


    const router = useRouter();


    const verifyToken = (isUpdateEmail: boolean, token: string) => {
        startTransition(async () => {
            const result = isUpdateEmail
                ? await verifyEmail(token)
                : await verifyEmailAndSignIn(token);



            setState(result);
            setLoading(false);

            if (result.success) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 200)
            }
        });
    };

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [token, router]);

    useEffect(() => {
        if (!token || hasVerified.current) return;
        setLoading(true);
        hasVerified.current = true;
        verifyToken(isUpdateEmail, token);
    }, [token, isUpdateEmail]);

    if (loading || pending) {
        return (
            <PendingState />
        )
    }

    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
            <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    {state.success ? (
                        <>
                            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
                            <h1 className="text-2xl font-semibold">
                                Email Verified
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Your email address has been verified successfully.
                            </p>
                            {isUpdateEmail ? (
                                <Link
                                    href="/account/settings"
                                    className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
                                >
                                    Back to Settings
                                </Link>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <XCircle className="mb-4 h-16 w-16 text-red-500" />
                            <h1 className="text-2xl font-semibold">
                                Verification Failed
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                {state.error}
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

function PendingState() {
    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
            <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    <Loader2 className="mb-4 h-16 w-16 animate-spin text-muted-foreground" />

                    <h1 className="text-2xl font-semibold">
                        Verifying Email
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Please wait while we verify your email address...
                    </p>
                </div>
            </div>
        </div>
    );
}