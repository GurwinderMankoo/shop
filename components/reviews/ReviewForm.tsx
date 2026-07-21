"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/app/actions/reviews";
import StarRating from "./StarRating";

interface ReviewFormProps {
    productId: string;
    productSlug: string;
    existingReview?: {
        rating: number;
        comment: string;
    } | null;
}

export default function ReviewForm({ productId, productSlug, existingReview }: ReviewFormProps) {
    const [rating, setRating] = useState(existingReview?.rating ?? 0);
    const [comment, setComment] = useState(existingReview?.comment ?? "");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const isEditing = !!existingReview;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (comment.trim().length < 10) {
            toast.error("Review must be at least 10 characters long");
            return;
        }

        const formData = new FormData();
        formData.set("productId", productId);
        formData.set("productSlug", productSlug);
        formData.set("rating", String(rating));
        formData.set("comment", comment.trim());

        startTransition(async () => {
            const res = await createReview(formData);

            if (res.success) {
                toast.success(isEditing ? "Review updated!" : "Review submitted!");
                router.refresh();
            } else {
                toast.error(res.error || "Something went wrong");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <Pencil size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-lg">
                    {isEditing ? "Edit Your Review" : "Write a Review"}
                </h3>
            </div>

            <div className="space-y-4">
                {/* Star Rating Input */}
                <div>
                    <Label className="mb-2 block text-sm font-medium">
                        Your Rating
                    </Label>
                    <StarRating
                        rating={rating}
                        onRatingChange={setRating}
                        size={28}
                        interactive
                        className="gap-1"
                    />
                    {rating > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {rating === 1 && "Poor"}
                            {rating === 2 && "Fair"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Very Good"}
                            {rating === 5 && "Excellent"}
                        </p>
                    )}
                </div>

                {/* Comment Textarea */}
                <div>
                    <Label htmlFor="review-comment" className="mb-2 block text-sm font-medium">
                        Your Review
                    </Label>
                    <Textarea
                        id="review-comment"
                        name="comment"
                        placeholder="Share your experience with this product... (minimum 10 characters)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                    />
                    <p className="mt-1 text-xs text-muted-foreground text-right">
                        {comment.trim().length < 10
                            ? `${10 - comment.trim().length} more characters needed`
                            : "✓ Minimum length met"}
                    </p>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isPending || rating === 0 || comment.trim().length < 10}
                    className="w-full sm:w-auto"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        isEditing ? "Update Review" : "Submit Review"
                    )}
                </Button>
            </div>
        </form>
    );
}
