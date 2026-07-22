"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usePathname, useRouter } from "next/navigation";
import InputField from "./InputField"
import SubmitButton from "./SubmitButton"
import { SignupFormState } from "@/types/signup.type";
import { useEffect } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { toast } from "sonner";
import Link from "next/link";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = {
    type: "sign-in" | "sign-up",
    onNavigate?: (path: string) => void
    action: React.ComponentProps<"form">["action"];
    state?: SignupFormState
}

export function SignInUpCard({ type = "sign-in", onNavigate, action, state }: Props) {
    const router = useRouter()
    const pathname = usePathname();

    const errors = state?.errors ?? {};
    const success = state?.success ?? {};
    const values = state?.values ?? {};
    const user = state?.user ?? undefined;
    const message = state?.message ?? "";
    const { email, password, firstName, lastName } = errors
    const { email: emailValue, password: passwordValue, firstName: firstNameValue, lastName: lastNameValue } = values
    const { updateUser } = useAuth();

    useEffect(() => {
        if (success && user) {
            updateUser(user)
        }
    }, [success, user, updateUser])


    useEffect(() => {
        if (success && message) {
            toast.success(message)
        } else if (!success && message) {
            toast.error(message)
        }
    }, [message, success])

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
                <div className="flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                        S
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </CardTitle>

                    <CardDescription className="text-base">
                        {type === "sign-in"
                            ? "Sign in to your account"
                            : "Sign up for an account"}
                    </CardDescription>
                </div>
            </CardHeader>

            <form action={action}>
                <CardContent className="space-y-5 ">
                    <div className="flex w-full justify-center">
                        <GoogleSignInButton>
                            <Link href={`/api/auth/google/login?callbackUrl=${pathname}`}>
                                Continue with Google
                            </Link>

                        </GoogleSignInButton>

                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>
                    {type === "sign-up" && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            error={firstName?.[0]}
                            label="First Name"
                            id="first-name"
                            name="firstName"
                            type="text"
                            placeholder="john"
                            className="h-11"
                            defaultValue={firstNameValue || ''}
                        />

                        <InputField
                            error={lastName?.[0]}
                            label="Last Name"
                            id="last-name"
                            name="lastName"
                            type="text"
                            placeholder="doe"
                            className="h-11"
                            defaultValue={lastNameValue || ''}
                        />

                    </div>
                    }
                    <div className="space-y-2">
                        <InputField
                            error={email?.[0]}
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className="h-11"
                            defaultValue={emailValue || ''}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            {type === "sign-in" && (
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        <InputField
                            name="password"
                            error={password?.[0]}
                            id="password"
                            type="password"
                            className="h-11"
                            placeholder="********"
                            defaultValue={passwordValue || ''}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-6 mt-3">
                    <SubmitButton
                        text={type === "sign-in" ? "Sign In" : "Sign Up"}
                    />

                    {type === "sign-in" ? <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            className="font-medium text-primary hover:underline"
                            onClick={() => onNavigate ? onNavigate("/sign-up") : router.push("/sign-up")}
                        >
                            Create Account
                        </button>
                    </p> :
                        <p className="text-center text-sm text-muted-foreground">
                            Do have an account?{" "}
                            <button
                                type="button"
                                className="font-medium text-primary hover:underline"
                                onClick={() => onNavigate ? onNavigate("/sign-in") : router.push("/sign-in")}
                            >
                                Sign In
                            </button>
                        </p>
                    }
                </CardFooter>
            </form>
        </Card>
    )
}
