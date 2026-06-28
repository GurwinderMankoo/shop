import Link from "next/link";
import { User, Package, Settings } from "lucide-react";
import MobileNavbar from "./_components/MobileNavbar";
import DesktopNavbar from "./_components/DesktopNavbar";

export default function UserLayout({
    children,

}: {
    children: React.ReactNode;
}) {

    return (
        <div className="container mx-auto py-6">
            <h1 className="mb-6 text-3xl font-bold hidden lg:block">
                My Account
            </h1>

            <div className="grid gap-8 lg:grid-cols-[250px_1fr]">

                {/* Desktop Sidebar */}
                <DesktopNavbar />

                <main>

                    {/* Mobile Navigation */}
                    <MobileNavbar />

                    <div className="">
                        {children}
                    </div>

                </main>
            </div>
        </div>
    );
}


