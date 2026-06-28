import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/queries/getCurrentUser";
import EditProfileForm from "./_EditProfileForm";

export default async function EditProfilePage() {
    const user = await getCurrentUser()

    return (
        <Card className="max-w-3xl">
            <CardHeader>

                <Button
                    variant="ghost"
                    asChild
                    className="mb-4 w-fit"
                >
                    <Link href="/account/profile">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Profile
                    </Link>
                </Button>

                <CardTitle>Edit Profile</CardTitle>

            </CardHeader>
            <CardContent>

                <EditProfileForm user={{
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || '',
                    email: user?.email || ''
                }} />

            </CardContent>
        </Card>
    );
}