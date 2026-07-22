import ProductFilterContent from "./ProductFilterContent";

export default function ProductFilters({
    categories,
}: {
    categories: any[];
}) {
    return (
        <aside className="sticky top-24 hidden h-fit rounded-xl border bg-card p-5 lg:block">
            <ProductFilterContent
                categories={categories}
            />
        </aside>
    );
}
