"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, Loader2, Mail, Send, CheckCircle } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { forgotPassword, type ForgotPasswordState } from "@/app/actions/forgotPassword";

const initialState: ForgotPasswordState = { success: false };

export default function ForgotPasswordPage() {
    const [state, formAction, pending] = useActionState(forgotPassword, initialState);

    if (state.success && state.message) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center py-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-xl font-semibold">Check Your Email</h2>
                        <p className="mt-3 text-sm text-muted-foreground">{state.message}</p>
                        <Button asChild variant="link" className="mt-6">
                            <Link href="/sign-in">Back to Sign In</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                    <CardDescription>
                        No worries — enter your email and we&apos;ll send you a reset link.
                    </CardDescription>
                </CardHeader>

                <form action={formAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                className="h-11"
                            />
                        </div>

                        {state.error && (
                            <p className="text-sm text-destructive">{state.error}</p>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            disabled={pending}
                            className="h-11 w-full"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Reset Link
                                </>
                            )}
                        </Button>

                        <Button asChild variant="link" size="sm" className="gap-1">
                            <Link href="/sign-in">
                                <ArrowLeft className="h-3 w-3" />
                                Back to Sign In
                            </Link>
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
