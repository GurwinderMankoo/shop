'use client'
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition, useMemo } from "react";
import { toast } from "sonner";

import { addProductWishlist, removeProductWishlist } from "@/app/actions/updateWishlist";
import { useAuth } from "@/components/Provider/AuthProvider";
import { useWishlist } from "@/components/Provider/WishlistProvider";
import { cn } from "@/lib/utils";

export default function ProductWishlistButton({ id, isFromWishlist }: { id: string | undefined, isFromWishlist?: boolean }) {
    const { user } = useAuth();
    const { wishlist, setWishlist } = useWishlist();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const selected = useMemo(() => {
        if (!id) return false;
        return wishlist.has(id);
    }, [id, wishlist]);


    const updateWishlist = () => {
        if (!id) return;

        const newWishlist = new Set(wishlist);
        if (selected) {
            newWishlist.delete(id);
        } else {
            newWishlist.add(id);
        }
        setWishlist(newWishlist);
    }

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

        updateWishlist()

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
                } else {
                    // 3. Fallback: Revert UI if the server action returned an error explicitly
                    updateWishlist()


                    toast.error(res?.error || "Something went wrong.");
                }
            } catch (error) {
                // 4. Fallback: Revert UI on network crash
                updateWishlist()
                toast.error("Failed to update wishlist.");
            }
        });
    }

    return (
        <button
            onClick={handleWishlistToggle}
            disabled={isPending}
            className="absolute right-3 top-3 rounded-full bg-white p-2 z-10 cursor-pointer shadow-sm hover:scale-105 transition-transform disabled:opacity-70"
            aria-label={(selected || isFromWishlist) ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                size={18}
                className={cn(
                    "h-5 w-5 transition-colors dynamic-heart",
                    (selected || isFromWishlist) && "fill-red-500 text-red-500"
                )}
            />
        </button>
    );
}
