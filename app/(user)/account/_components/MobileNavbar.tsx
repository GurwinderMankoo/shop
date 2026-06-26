import { Package, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function MobileNavbar() {
    return (
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
    )
}
