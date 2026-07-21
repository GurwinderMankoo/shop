"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Star, MessageSquare } from "lucide-react";

import { Review } from "@/types/products";
import { useAuth } from "@/components/Provider/AuthProvider";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { deleteReview } from "@/app/actions/reviews";

interface ProductReviewsProps {
    productId: string;
    productSlug: string;
    reviews: Review[];
    stats: {
        averageRating: number;
        totalReviews: number;
        distribution: Record<number, number>;
    } | null;
    existingUserReview: {
        rating: number;
        comment: string;
    } | null;
}

export default function ProductReviews({
    productId,
    productSlug,
    reviews,
    stats,
    existingUserReview,
}: ProductReviewsProps) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isDeletePending, startDeleteTransition] = useTransition();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");

    const handleDeleteReview = () => {
        if (!confirm("Are you sure you want to delete your review?")) return;

        startDeleteTransition(async () => {
            const res = await deleteReview(productId, productSlug);
            if (res.success) {
                toast.success("Review deleted");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete review");
            }
        });
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === "highest") return b.rating - a.rating;
        if (sortBy === "lowest") return a.rating - b.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const alreadyReviewed = !!existingUserReview;

    return (
        <section className="mt-20">
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <p className="mt-1 text-muted-foreground">
                        See what others are saying about this product
                    </p>
                </div>

                {user && !alreadyReviewed && (
                    <Button
                        onClick={() => setShowReviewForm(prev => !prev)}
                        variant={showReviewForm ? "outline" : "default"}
                    >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {showReviewForm ? "Cancel" : "Write a Review"}
                    </Button>
                )}

                {!user && (
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.push(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`)
                        }
                    >
                        Sign in to Review
                    </Button>
                )}
            </div>

            {/* Review Form */}
            {(showReviewForm || alreadyReviewed) && user && (
                <div className="mb-8">
                    <ReviewForm
                        productId={productId}
                        productSlug={productSlug}
                        existingReview={existingUserReview}
                    />
                    {alreadyReviewed && (
                        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                            <span>You have already reviewed this product.</span>
                            <button
                                onClick={handleDeleteReview}
                                disabled={isDeletePending}
                                className="text-red-500 hover:text-red-600 hover:underline disabled:opacity-50"
                            >
                                {isDeletePending ? "Deleting..." : "Delete my review"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Stats & Sort */}
            {reviews.length > 0 ? (
                <>
                    {/* Stats Summary */}
                    <div className="mb-8 grid gap-6 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto]">
                        {/* Average Rating */}
                        <div className="flex flex-col items-center justify-center gap-2 md:items-start">
                            <div className="flex items-center gap-3">
                                <span className="text-5xl font-bold">
                                    {stats?.averageRating ?? 0}
                                </span>
                                <div>
                                    <StarRating rating={Math.round(stats?.averageRating ?? 0)} size={20} />
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {stats?.totalReviews ?? 0} review{stats?.totalReviews !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="w-full space-y-1.5 md:w-64">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = stats?.distribution[star] ?? 0;
                                const total = stats?.totalReviews ?? 1;
                                const percentage = total > 0 ? (count / total) * 100 : 0;

                                return (
                                    <div key={star} className="flex items-center gap-2 text-sm">
                                        <span className="w-12 text-right text-muted-foreground">
                                            {star} ★
                                        </span>
                                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-xs text-muted-foreground">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sort Controls */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                        </p>
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-muted-foreground">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="rounded-lg border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="newest">Newest</option>
                                <option value="highest">Highest Rated</option>
                                <option value="lowest">Lowest Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-4">
                        {sortedReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                isOwnReview={user?.id === review.userId}
                                onDelete={user?.id === review.userId ? handleDeleteReview : undefined}
                            />
                        ))}
                    </div>
                </>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16">
                    <Star size={48} className="text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-semibold">No reviews yet</h3>
                    <p className="mt-1 text-muted-foreground text-sm">
                        Be the first to share your thoughts on this product!
                    </p>
                </div>
            )}
        </section>
    );
}
