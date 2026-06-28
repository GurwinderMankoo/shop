import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import InputField from "@/components/shared/InputField";
import EmailEditForm from "./_EmailEditForm";
import { Suspense } from "react";

export default async function ChangeEmailPage() {
    const user = await getCurrentUser();

    return (
        <Card className="max-w-2xl">
            <CardHeader>

                <Button
                    variant="ghost"
                    asChild
                    className="mb-4 w-fit"
                >
                    <Link href="/account/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Settings
                    </Link>
                </Button>

                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Change Email Address
                </CardTitle>

                <CardDescription>
                    Enter a new email address. We'll send a verification email
                    before updating your account.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-8">

                <div className="space-y-2">

                    <InputField
                        label="Current Email"
                        value={user?.email}
                        disabled
                    />

                    <p className="text-sm text-muted-foreground">
                        Your current verified email address.
                    </p>
                </div>

                <Suspense>
                    <EmailEditForm />

                </Suspense>

            </CardContent>
        </Card>
    );
}