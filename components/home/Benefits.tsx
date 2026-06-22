import {
  ShieldCheck,
  RefreshCcw,
  Truck,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Truck,
    title: "Free Shipping",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
  },
];

export function BenefitsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            className="p-8"
          >
            <item.icon className="mb-4 h-8 w-8" />

            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Trusted by thousands of customers.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}