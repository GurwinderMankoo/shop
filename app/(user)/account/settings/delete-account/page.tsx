// app/settings/delete-account/page.tsx
'use client'
import { AlertTriangle } from "lucide-react";
import { useActionState, useEffect } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/InputField";
import { deleteAccount } from "@/app/actions/deleteAccount";
import { DeleteAccountFormState } from "@/types/deleteAccount.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const initialState: DeleteAccountFormState = {
    errors: {},
    success: false,
};
export default function DeleteAccountPage() {

    const [state, formAction, pending] = useActionState(deleteAccount, initialState);
    const { success, errors } = state
    const router = useRouter()

    useEffect(() => {
        if (success) {
            toast.success("✨ Account deleted successfully!")

            window.location.href = "/";
        }

    }, [success])

    return (
        <div className="container ">
            <Card className="border-destructive">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-destructive" />

                        <div>
                            <CardTitle className="text-2xl">
                                Delete Account
                            </CardTitle>

                            <CardDescription>
                                This action is permanent and cannot be undone.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
                        <h2 className="font-semibold text-destructive">
                            What will happen?
                        </h2>

                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                            <li>Your account will be permanently deleted.</li>
                            <li>Your wishlist will be removed.</li>
                            <li>Your shopping cart will be deleted.</li>
                            <li>Your saved addresses will be deleted.</li>
                            <li>Your active sessions will be terminated.</li>
                            <li>Your verification and reset tokens will be removed.</li>
                        </ul>
                    </div>
                    <form action={formAction}>
                        <div className="space-y-2 mb-4">

                            <InputField
                                id="password"
                                name="password"
                                label="Confirm your password"
                                type="password"
                                placeholder="Enter your password"
                                error={errors?.password?.[0]}
                            />
                        </div>

                        <div className="space-y-2 mb-4">

                            <InputField
                                id="confirmationText"
                                name="confirmationText"
                                label={
                                    <>
                                        Type <span className="font-bold">DELETE</span> to confirm
                                    </>
                                }
                                error={errors.confirmationText?.[0]}
                                placeholder="DELETE"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                            >
                                <Link href="/account/settings">
                                    Cancel
                                </Link>
                            </Button>

                            <Button
                                variant="destructive"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}