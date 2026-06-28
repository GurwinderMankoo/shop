"use client"
import { useActionState, useEffect } from "react";

import { updateEmail, UpdateEmailState } from "@/app/actions/updateEmail";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";


const initialState: UpdateEmailState = {
    success: false,
    errors: {}
}

export default function EmailEditForm() {
    const [state, formAction, pending] = useActionState(updateEmail, initialState);

    useEffect(() => {
        if (state.success) {
            toast.info('🔐 Verification email sent! Please check your inbox to verify your account. 📬')
        }
    }, [state.success])


    return (
        <form action={formAction}>
            <div className="space-y-2">

                <InputField
                    id="pending-email"
                    name="pendingEmail"
                    label="New Email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={state.success}
                    error={state?.errors?.pendingEmail?.[0]}
                    defaultValue={state?.values?.pendingEmail}
                />

                <p className="text-sm text-muted-foreground">
                    A verification email will be sent to this address.
                </p>
            </div>

            <div className="flex justify-end gap-3">

                <Button
                    variant="outline"
                    asChild
                    disabled={pending}
                >
                    <Link href="/account/settings">
                        Cancel
                    </Link>
                </Button>

                <Button type="submit" disabled={pending || state.success}>
                    {pending ? 'Sending...' : 'Send Verification Email'}
                </Button>

            </div>
        </form>
    )
}
