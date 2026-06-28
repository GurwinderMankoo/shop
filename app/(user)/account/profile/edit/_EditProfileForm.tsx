"use client"
import { updateProfile, UpdateProfileFormValues, UpdateProfileState } from "@/app/actions/updateProfile";
import { useAuth } from "@/components/Provider/AuthProvider";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


const initialState: UpdateProfileState = {
    errors: {},
    success: false,
};

export default function EditProfileForm({ user }: { user: UpdateProfileFormValues }) {
    const [state, formAction, pending] = useActionState(updateProfile, {
        ...initialState,
        values: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
        }
    });
    const { updateUser } = useAuth();
    const firstName = state?.values?.firstName || '';
    const lastName = state?.values?.lastName || '';
    const email = state?.values?.email;

    useEffect(() => {
        if (state.success) {
            toast.success("✨ Profile updated successfully!")
            updateUser({
                firstName,
                lastName,
            })
        }

    }, [state.success, firstName, lastName, updateUser])

    return (
        <form className="space-y-6" action={formAction}>

            <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">
                    <InputField
                        label="First Name"
                        id="first-name"
                        name="firstName"
                        defaultValue={state?.values?.firstName}
                        error={state?.errors?.firstName?.[0]}
                    />
                </div>

                <div className="space-y-2">
                    <InputField
                        id="last-name"
                        name="lastName"
                        label="Last Name"
                        defaultValue={state?.values?.lastName}
                        error={state?.errors?.lastName?.[0]}
                    />
                </div>

            </div>

            <div className="space-y-2">
                <InputField
                    id="email"
                    label="Email"
                    name="email"
                    defaultValue={user?.email}
                    disabled
                />
            </div>


            <div className="flex justify-end gap-3">

                <Button
                    variant="outline"
                    asChild
                    disabled={pending}
                >
                    <Link href="/account/profile">
                        Cancel
                    </Link>
                </Button>

                <Button type="submit" disabled={pending}>
                    {pending ? 'Saving...' : `Save Changes`}
                </Button>

            </div>

        </form>
    )
}
