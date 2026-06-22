import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold">
          Summer Sale
        </h2>

        <p className="mt-4 text-xl">
          Up to 50% off selected items
        </p>

        <Button
          variant="secondary"
          className="mt-8"
        >
          Shop Deals
        </Button>
      </div>
    </section>
  );
}