"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
    interactive?: boolean;
    maxStars?: number;
    className?: string;
}

export default function StarRating({
    rating,
    onRatingChange,
    size = 20,
    interactive = false,
    maxStars = 5,
    className,
}: StarRatingProps) {
    return (
        <div className={cn("flex items-center gap-0.5", className)}>
            {Array.from({ length: maxStars }, (_, i) => {
                const starValue = i + 1;
                const filled = starValue <= rating;
                const halfFilled = !filled && starValue - 0.5 <= rating;

                return (
                    <button
                        key={i}
                        type={interactive ? "button" : undefined}
                        disabled={!interactive}
                        onClick={() => {
                            if (interactive && onRatingChange) {
                                onRatingChange(starValue);
                            }
                        }}
                        className={cn(
                            "transition-all duration-150",
                            interactive && "cursor-pointer hover:scale-110 active:scale-90",
                            !interactive && "cursor-default"
                        )}
                        aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
                    >
                        <Star
                            size={size}
                            className={cn(
                                "transition-colors duration-150",
                                filled
                                    ? "fill-yellow-400 text-yellow-400"
                                    : halfFilled
                                        ? "fill-yellow-400/50 text-yellow-400"
                                        : "fill-none text-gray-300 dark:text-gray-600",
                                interactive && "hover:drop-shadow-md"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
