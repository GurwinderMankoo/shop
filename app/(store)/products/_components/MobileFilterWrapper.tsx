import { getCategories } from "@/lib/queries/categories";
import MobileFilter from "./MobileFilter";

export default async function MobileFilterWrapper() {
    const categories = await getCategories();
    return (
        <MobileFilter categories={categories} />
    )
}
