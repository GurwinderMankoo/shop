import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// https://images.unsplash.com/photo-1483985988355-763728e1935b

export function HeroSection() {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4 py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-full border px-3 py-1 text-sm">
              New Collection 2026
            </div>

            <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
              Everything
              <br />
              You Need
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Discover premium products curated
              for modern lifestyles.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="#categories">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-3xl lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
              alt="Hero Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}