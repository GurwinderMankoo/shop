import { Product } from "@/types/products"
import Image from "next/image"



export default function ProductCard({ name, imageUrl, description, variants } : Partial<Product>) {

    return (
        <div className="border rounded-lg p-4">
            <div className="relative aspect-square">

              {imageUrl ? (

                <Image
                  src={imageUrl}
                  alt={name || ""}
                  fill
                  className="object-cover rounded-lg"
                />

              ) : (

                <div className="bg-gray-100 h-full flex items-center justify-center">
                  No Image
                </div>

              )}

            </div>


            <h2 className="font-semibold mt-4">
              {name}
            </h2>


            <p className="text-sm text-gray-500">
              {description}
            </p>


            {variants && variants[0] && (

              <p className="mt-2 font-bold">
                ${variants[0].price}
              </p>

            )}

          </div>
  )
}
