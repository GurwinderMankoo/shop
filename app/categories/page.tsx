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
                description="Shop by category"
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