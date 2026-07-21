'use client'

import { addProductWishlist, removeProductWishlist } from "@/app/actions/updateWishlist";
import { useAuth } from "@/components/Provider/AuthProvider";
import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";

export default function ProductWishlistButton({ id, isWishListed, isFromWishlist }: { id: string | undefined, isWishListed: boolean, isFromWishlist?: boolean }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    // Local state for instant UI feedback
    const [selected, setSelected] = useState(isWishListed);

    // Keep local state synced if the parent server component re-renders with new props
    useEffect(() => {
        setSelected(isWishListed);
    }, [isWishListed]);

    const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!id) return;

        if (!user) {
            router.push(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        // 1. Optimistic Update: Change the UI instantly
        const nextState = !selected;
        setSelected(nextState);

        // 2. Run the network request inside a transition
        startTransition(async () => {
            try {
                const res = nextState
                    ? await addProductWishlist(id)
                    : await removeProductWishlist(id);

                if (res?.success) {
                    toast.success(nextState ? "Added to wishlist!" : "Removed from wishlist!");

                    if (isFromWishlist) {
                        router.refresh();
                    }
                    // Next.js automatically refreshes server components here because of useTransition
                } else {
                    // 3. Fallback: Revert UI if the server action returned an error explicitly
                    setSelected(!nextState);
                    toast.error(res?.error || "Something went wrong.");
                }
            } catch (error) {
                // 4. Fallback: Revert UI on network crash
                setSelected(!nextState);
                toast.error("Failed to update wishlist.");
            }
        });
    }

    return (
        <button
            onClick={handleWishlistToggle}
            disabled={isPending}
            className="absolute right-3 top-3 rounded-full bg-white p-2 z-10 cursor-pointer shadow-sm hover:scale-105 transition-transform disabled:opacity-70"
            aria-label={selected ? "Remove from wishlist" : "Add to wishlist"}
        >
            {isPending ? (
                <Loader2 size={18} className="animate-spin text-muted-foreground" />
            ) : (
                <Heart
                    size={18}
                    className={cn(
                        "h-5 w-5 transition-colors dynamic-heart",
                        selected && "fill-red-500 text-red-500"
                    )}
                />
            )}
        </button>
    );
}
