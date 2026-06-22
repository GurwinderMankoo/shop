import { Card } from "@/components/ui/card";

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="mb-10 text-center text-3xl font-bold">
        Customer Reviews
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map(
          (_, index) => (
            <Card
              key={index}
              className="p-6"
            >
              <p>
                Amazing quality and quick
                delivery.
              </p>

              <div className="mt-4 font-semibold">
                John Doe
              </div>
            </Card>
          )
        )}
      </div>
    </section>
  );
}