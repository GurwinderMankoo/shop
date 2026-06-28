import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdatePasswordForm } from "./_UpdatePasswordForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export default function UpdatePasswordPage() {
    return (

        <Card className="max-w-3xl">
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
                    <LockKeyhole className="h-5 w-5" />
                    Change Password
                </CardTitle>

                <CardDescription>
                    Update your password to keep your account secure. You'll need to enter your
                    current password before choosing a new one.
                </CardDescription>

            </CardHeader>
            <CardContent>


                <UpdatePasswordForm />
            </CardContent>
        </Card>
    );
}