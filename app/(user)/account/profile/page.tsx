import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/shared/UserAvatar";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import Link from "next/link";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    createdAt: Date;
    emailVerified: boolean;
};

export default async function ProfilePage() {

    const user = await getCurrentUser();

    if (!user) {
        return null
    }

    const initials =
        user.firstName[0].toUpperCase() +
        user.lastName[0].toUpperCase();

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="items-center text-center">
                <UserAvatar initials={initials} />

                <CardTitle className="mt-4 text-2xl">
                    {user.firstName} {user.lastName}
                </CardTitle>

                <CardDescription>
                    {user.email}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <Separator />

                <section>
                    <h2 className="mb-4 text-lg font-semibold">
                        Personal Information
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <Info
                            label="First Name"
                            value={user.firstName}
                        />

                        <Info
                            label="Last Name"
                            value={user.lastName}
                        />

                        <Info
                            label="Email"
                            value={user.email}
                        />

                        <Info
                            label="Member Since"
                            value={user.createdAt.toLocaleDateString()}
                        />

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email Status
                            </p>

                            <Badge
                                variant={
                                    user.emailVerified
                                        ? "default"
                                        : "destructive"
                                }
                            >
                                {user.emailVerified
                                    ? "Verified"
                                    : "Not Verified"}
                            </Badge>
                        </div>

                    </div>
                </section>

                <Separator />

                <div className="flex justify-end">
                    <Button asChild>
                        <Link href="/account/profile/edit">
                            Edit Profile
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 font-medium">
                {value}
            </p>
        </div>
    );
}