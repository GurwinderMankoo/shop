import { Truck, ShieldCheck, RotateCcw, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getCategories, wait } from "@/lib/queries/categories";
import CategoriesMarque from "./CategoriesMarque";

export async function HeroSection() {

  return (
    <section className="relative isolate overflow-hidden">

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-10 text-center sm:pt-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
          New season · Up to 40% off
        </div>

        {/* Headline */}
        <h1 className="mt-7 text-[2.75rem] font-black leading-[0.98] tracking-tight text-foreground xs:text-3xl sm:text-5xl md:text-6xl">
          Shop everything
          <br />
          you need
          <span className="relative mx-2 inline-block whitespace-nowrap">
            . Nothing
          </span>
          <br className="hidden sm:block" />
          you don't.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Electronics, fashion, home essentials and beauty — curated in one
          place, with secure checkout and delivery that actually shows up on
          time.
        </p>

        {/* Search bar */}
        {/* <HeroSearchInput categories={categories} /> */}

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Browse Categories
          </Link>
        </div>

        {/* Category marquee — seamless infinite loop */}
        <CategoriesMarque />

        {/* Trust row */}
        <div className="mt-12 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t pt-8 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-foreground/60" />
            Free shipping
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-foreground/60" />
            Secure checkout
          </span>
          <span className="inline-flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-foreground/60" />
            30-day returns
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-foreground">
            <Star className="h-4 w-4 fill-foreground/80 text-foreground/80" />
            4.8 · 12,000+ orders
          </span>
        </div>
      </div>
    </section>
  );
}
