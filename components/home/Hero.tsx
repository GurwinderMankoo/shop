import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Light gradient background - subtle black to white */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />

      {/* Subtle gray-toned background blobs */}
      <div className="absolute right-0 top-0 -z-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-gray-200/30 to-gray-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -z-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/3 rounded-full bg-gradient-to-br from-gray-100/20 to-white/30 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-black" />
              New Collection 2026
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 lg:text-7xl">
              Everything
              <br />
              You Need
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
              Discover premium products curated for modern lifestyles. Quality
              meets style in every piece we offer.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white shadow-md hover:bg-gray-800"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                asChild
              >
                <Link href="#categories">Explore Categories</Link>
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                <span>10K+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Right side - editorial/visual composition */}
          <div className="relative hidden h-[520px] lg:block">
            {/* Background panel */}
            <div className="absolute inset-0 rounded-3xl bg-gray-50/60" />

            {/* Large circle outline */}
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-300/60" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/40" />

            {/* Dark geometric block - top right */}
            {/* <div className="absolute -right-6 top-8 h-32 w-44 rounded-2xl border border-gray-300 bg-white shadow-sm" /> */}
            {/* <div className="absolute right-8 top-12 h-16 w-28 rounded-lg bg-gray-900" /> */}

            <div className="absolute right-16 top-8 flex items-center gap-3">
              <div>
                <p className="text-xs font-medium text-gray-900">Trusted</p>
                <p className="text-[10px] text-gray-400">Secure Payment</p>
              </div>
            </div>
            {/* Large typography - centered */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[5.5rem] font-bold leading-none tracking-tight text-gray-900 lg:text-[7rem]">
                2026
              </p>
              <div className="mx-auto mt-3 h-px w-16 bg-gray-300" />
              <p className="mt-3 text-xs font-medium tracking-[0.25em] text-gray-500 uppercase">
                New Collection
              </p>
            </div>

            {/* Small accent - bottom left */}
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div>
                <p className="text-xs font-medium text-gray-900">Premium</p>
                <p className="text-[10px] text-gray-400">Quality assured</p>
              </div>
            </div>

            {/* Horizontal line accent */}
            <div className="absolute bottom-16 right-8 h-px w-20 bg-gray-300" />

            {/* Small decorative dots */}
            <div className="absolute right-12 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gray-300" />
            <div className="absolute left-16 top-1/3 h-1.5 w-1.5 rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
