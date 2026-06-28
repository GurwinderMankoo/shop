import { User, Package, Settings, type LucideIcon } from "lucide-react";

type NavLink = {
    name: string;
    href: string;
    icon: LucideIcon;
};

export const navLinks: NavLink[] = [
    {
        name: "Profile",
        href: "/account/profile",
        icon: User,
    },
    {
        name: "Orders",
        href: "/account/orders",
        icon: Package,
    },
    {
        name: "Settings",
        href: "/account/settings",
        icon: Settings,
    },
];