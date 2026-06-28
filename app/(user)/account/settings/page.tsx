import Link from "next/link";
import { Mail, Lock, Shield, Trash2, ChevronRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import { formatLastChanged } from "@/lib/helper";

export default async function SettingsPage() {

    const user = await getCurrentUser()
    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-2xl font-bold">
                    Settings
                </h2>

                <p className="text-muted-foreground">
                    Manage your account security and preferences.
                </p>
            </div>

            {/* Email */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Address
                    </CardTitle>

                    <CardDescription>
                        Change the email associated with your account.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="font-medium">
                            {user?.email}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Verified
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/account/settings/email">
                            Change Email
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                </CardContent>
            </Card>

            {/* Password */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Password
                    </CardTitle>

                    <CardDescription>
                        Update your account password.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex items-center justify-between">

                    <div>
                        <p className="font-medium">
                            ••••••••••••
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {formatLastChanged(user?.updatedAt || new Date())}
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/account/settings/update-password">
                            Change Password
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                </CardContent>
            </Card>

            {/* Two Factor Authentication */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Two-Factor Authentication
                    </CardTitle>

                    <CardDescription>
                        Add an extra layer of security to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex items-center justify-between">

                    <div>
                        <p className="font-medium">
                            Not Enabled
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Coming soon
                        </p>
                    </div>

                    <Button disabled>
                        Enable
                    </Button>

                </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Active Sessions
                    </CardTitle>

                    <CardDescription>
                        View and manage devices currently signed in.
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <Button
                        variant="outline"
                        disabled
                    >
                        Coming Soon
                    </Button>

                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <Trash2 className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>

                    <CardDescription>
                        Permanently delete your account and all associated data.
                    </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6">

                    <Button
                        variant="destructive"
                        disabled
                    >
                        Delete Account
                    </Button>

                </CardContent>
            </Card>

        </div>
    );
}