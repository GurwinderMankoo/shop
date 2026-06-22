import { getCategories } from "@/lib/queries/categories";
import { Button } from "../ui/button";
import CategoryCard from "../shared/categories/CategoryCard";
import Link from "next/link";


export async function CategoriesSection() {

  const categories = await getCategories(4);

  return (
    <section className="container mx-auto px-4 py-20" id="categories">
      <h2 className="mb-10 text-3xl font-bold">
        Shop By Category
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/categories" >
          <Button size="lg">Explore All</Button>
        </Link>
      </div>
    </section>
  );
}