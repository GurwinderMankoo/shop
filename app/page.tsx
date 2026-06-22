import { BenefitsSection } from "@/components/home/Benefits";
import { CategoriesSection } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsLetter";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsSection } from "@/components/home/Testimonial";

export default function Home() {
  return (
      <>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BenefitsSection />
        <PromoBanner />
        <TestimonialsSection />
        <NewsletterSection />
      </>
  );
}
