"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPassword, type ResetPasswordState } from "@/app/actions/resetPassword";

const initialState: ResetPasswordState = { success: false };

export function ResetPasswordClient({ token }: { token: string }) {
    const router = useRouter();
    const [state, formAction, pending] = useActionState(resetPassword, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Redirect on success
    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => router.push("/sign-in"), 3000);
            return () => clearTimeout(timer);
        }
    }, [state.success, router]);

    if (state.success) {
        return (
            <CardContent className="flex flex-col items-center py-12 text-center">
                <CheckCircle className="mb-4 h-14 w-14 text-green-500" />
                <h2 className="text-xl font-semibold">Password Reset!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    {state.message || "Your password has been updated."}
                </p>
                <Button asChild className="mt-6">
                    <Link href="/sign-in">Sign In with New Password</Link>
                </Button>
            </CardContent>
        );
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="token" value={token} />

            <CardContent className="space-y-5">
                {state.error && (
                    <p className="text-sm text-destructive">{state.error}</p>
                )}

                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            autoComplete="new-password"
                            className="h-11 pr-10"
                            aria-invalid={!!state.fieldErrors?.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {state.fieldErrors?.password && (
                        <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your new password"
                            autoComplete="new-password"
                            className="h-11 pr-10"
                            aria-invalid={!!state.fieldErrors?.confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {state.fieldErrors?.confirmPassword && (
                        <p className="text-xs text-destructive">{state.fieldErrors.confirmPassword}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={pending}
                    className="h-11 w-full"
                >
                    {pending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resetting...
                        </>
                    ) : (
                        <>
                            <Lock className="mr-2 h-4 w-4" />
                            Reset Password
                        </>
                    )}
                </Button>
            </CardContent>
        </form>
    );
}
