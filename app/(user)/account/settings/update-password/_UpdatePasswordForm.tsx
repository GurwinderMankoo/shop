"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/shared/PasswordInput";
import { updatePassword, UpdatePasswordFormState } from "@/app/actions/updatePassword";
import { toast } from "sonner";


const initialState: UpdatePasswordFormState = {
    success: false,
    errors: {},
};

export function UpdatePasswordForm() {
    const [state, formAction, isSubmitting] = useActionState(updatePassword, initialState);


    useEffect(() => {
        if (state.success) {
            toast.success("🔐 Password updated successfully!")
        }
    }, [state.success])



    return (
        <form
            className="space-y-6"
            action={formAction}
        >
            {/* Current Password */}
            <PasswordInput
                label="Current Password"
                id="currentPassword"
                name="currentPassword"
                error={state.errors.currentPassword?.[0]}
            />
            {/* New Password */}
            <PasswordInput
                label="New Password"
                id="newPassword"
                name="newPassword"
                error={state.errors.newPassword?.[0]}
            />

            {/* Confirm Password */}
            <PasswordInput
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                error={state.errors.confirmPassword?.[0]}
            />

            <Button
                type="submit"
                disabled={false}
                className="w-full sm:w-auto"
            >
                {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Password
            </Button>
        </form>
    );
}