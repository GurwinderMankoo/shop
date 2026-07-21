"use client";

import { Review } from "@/types/products";
import UserAvatar from "@/components/shared/UserAvatar";
import StarRating from "./StarRating";
import { timeAgo } from "@/lib/helper";


interface ReviewCardProps {
    review: Review;
    isOwnReview?: boolean;
    onDelete?: () => void;
}

export default function ReviewCard({ review, isOwnReview, onDelete }: ReviewCardProps) {
    const initials = `${review.user.firstName.charAt(0)}${review.user.lastName.charAt(0)}`.toUpperCase();

    return (
        <div className="group rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <UserAvatar
                        image={review.user.image}
                        initials={initials}
                        firstName={review.user.firstName}
                    />
                    <div>
                        <p className="font-semibold text-sm">
                            {review.user.firstName} {review.user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {timeAgo(new Date(review.createdAt))}
                        </p>
                    </div>
                </div>

                {isOwnReview && onDelete && (
                    <button
                        onClick={onDelete}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-red-500 hover:text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                )}
            </div>

            <div className="mt-3">
                <StarRating rating={review.rating} size={16} />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.comment}
            </p>
        </div>
    );
}
