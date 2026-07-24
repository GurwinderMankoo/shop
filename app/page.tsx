import { BenefitsSection } from "@/components/home/Benefits";
import { CategoriesSection } from "@/components/home/Categories";
import CategoriesSkeleton from "@/components/home/CategoriesSkeleton";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/Hero";
import { HeroSkeleton } from "@/components/home/HeroSkeleton";
import { NewsletterSection } from "@/components/home/NewsLetter";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsSection } from "@/components/home/Testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="relative">
      {/* Light dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.25] bg-dot-pattern-home"
        aria-hidden="true"
      />
      <HeroSection />
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>
      {/* <FeaturedProducts /> */}
      <BenefitsSection />
      <PromoBanner />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
