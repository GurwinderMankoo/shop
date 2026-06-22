import { ProductCard } from "@/components/shared/products/ProductCard";
import { getProducts } from "@/lib/queries/products";

export default async function ProductsPage() {

  const products = await getProducts();

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (

            <ProductCard {...product} key={product.id}/>

        ))}

      </div>

    </div>
  );
}