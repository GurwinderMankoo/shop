
export default function CategoriesSkeleton() {
  return (
    <section className="container mx-auto px-4 py-20" id="categories">
      {/* Title skeleton */}
      <div className="mb-10 h-9 w-56 animate-pulse rounded-md bg-muted" />

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="group overflow-hidden rounded-xl border bg-card p-4">
            {/* Image placeholder */}
            <div className="relative aspect-square overflow-hidden rounded-md">
              <div className="h-full w-full animate-pulse bg-muted" />
            </div>
            {/* Name placeholder */}
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>

      {/* Explore All button skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="h-11 w-36 animate-pulse rounded-md bg-muted" />
      </div>
    </section>
  );
}
