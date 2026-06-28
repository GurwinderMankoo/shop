'use client'
import { addProductWishlist, removeProductWishlist } from "@/app/actions/updateWishlist";
import { useAuth } from "@/components/Provider/AuthProvider";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductWishlistButton({ id, isWishListed }: { id: string | undefined, isWishListed: boolean }) {

    const [selected, setSelected] = useState(isWishListed);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const onAddWishList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
        e.preventDefault();
        if (!id) {
            return;
        }

        if (!user) {
            router.push('/sign-in');
            return;
        }

        setLoading(true);

        if (selected) {
            const res = await removeProductWishlist(id);
            if (res) {
                setSelected(false);
                setLoading(false);
                router.refresh();
            }
        } else {

            const res = await addProductWishlist(id);
            if (res) {
                setSelected(true);
                setLoading(false);
            }

        }
    }

    return (
        <button
            onClick={(e) => onAddWishList(e, id)}
            disabled={loading}
            className="absolute right-3 top-3 rounded-full bg-white p-2 z-10 cursor-pointer"
        >
            <Heart size={18}
                className={cn(
                    "h-5 w-5",
                    selected && !!user && "fill-red-500 text-red-500"
                )} />
        </button>
    )
}
