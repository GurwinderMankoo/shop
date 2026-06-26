import Link from "next/link";
import { User, Package, Settings } from "lucide-react";

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
                <aside className="hidden lg:block rounded-lg border bg-card p-4">
                    <nav className="space-y-2">
                        <Link
                            href="/account/profile"
                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors"
                        >
                            <User className="h-5 w-5" />
                            Profile
                        </Link>

                        <Link
                            href="/account/orders"
                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors"
                        >
                            <Package className="h-5 w-5" />
                            Orders
                        </Link>

                        <Link
                            href="/account/settings"
                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </aside>

                <main>

                    {/* Mobile Navigation */}
                    <nav className="sticky top-16 z-40 mb-6 flex lg:hidden rounded-lg border bg-background p-2">
                        <Link
                            href="/account/profile"
                            className="flex flex-1 flex-col items-center gap-1 rounded-md py-2"
                        >
                            <User className="h-5 w-5" />
                            <span className="text-xs">Profile</span>
                        </Link>

                        <Link
                            href="/account/orders"
                            className="flex flex-1 flex-col items-center gap-1 rounded-md py-2"
                        >
                            <Package className="h-5 w-5" />
                            <span className="text-xs">Orders</span>
                        </Link>

                        <Link
                            href="/account/settings"
                            className="flex flex-1 flex-col items-center gap-1 rounded-md py-2"
                        >
                            <Settings className="h-5 w-5" />
                            <span className="text-xs">Settings</span>
                        </Link>
                    </nav>

                    <div className="">
                        {children}
                    </div>

                </main>
            </div>
        </div>
    );
}


