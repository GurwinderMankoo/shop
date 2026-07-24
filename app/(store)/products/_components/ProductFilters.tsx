import { getCategories } from "@/lib/queries/categories";
import ProductFilterContent from "./ProductFilterContent";

export default async function ProductFilters() {

    const categories = await getCategories();

    return (
        <ProductFilterContent
            categories={categories}
        />
    );
}
