import { BenefitsSection } from "@/components/home/Benefits";
import { CategoriesSection } from "@/components/home/Categories";
import CategoriesSkeleton from "@/components/home/CategoriesSkeleton";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsLetter";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsSection } from "@/components/home/Testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSection />
      </Suspense>
      {/* <FeaturedProducts /> */}
      <BenefitsSection />
      <PromoBanner />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
