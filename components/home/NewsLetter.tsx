import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="border-t py-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-3 text-muted-foreground">
          Get exclusive offers directly in
          your inbox.
        </p>

        <div className="mt-8 flex gap-3">
          <Input placeholder="Email address" />

          <Button>
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}