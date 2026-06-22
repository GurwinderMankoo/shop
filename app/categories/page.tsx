import CategoryCard from "@/components/shared/categories/CategoryCard";
import Headers from "@/components/shared/Headers";
import { getCategories } from "@/lib/queries/categories";

export default async function CategoriesPage() {

    const categories = await getCategories();


    return (
        <main className="container mx-auto px-4 py-12">

            {/* Header */}

            <Headers
                title="Categories"
                description="Explore a wide range of categories, from electronics and fashion to home essentials, beauty, and fitness. Find exactly what you're looking for in one place."
            />


            {/* Categories Grid */}

            <div
                className="
                            grid
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            "
            >

                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        {...category}
                    />
                ))}

            </div>


        </main>
    );
}