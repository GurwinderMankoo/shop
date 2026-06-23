import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Headers from "@/components/shared/Headers";
import { getProduct } from "@/lib/queries/products";
import { formatCurrency } from "@/lib/helper";
import DiscountBadge from "@/components/shared/DiscountBadge";
import ProductGallery from "../_components/ProductGallery";


export default async function ProductPage({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;

    const product = await getProduct(slug);

    return (
        <div className="container mx-auto px-4 py-10">

            <Headers name={product?.name} />

            <div className="grid gap-10 lg:grid-cols-2">

                {/* Gallery */}

                <ProductGallery images={product?.images || []} />

                {/* Product Info */}

                <div>
                    {product?.category?.name && <Badge className="mb-4">
                        {product.category.name}
                    </Badge>}

                    <h1 className="text-4xl font-bold">
                        {
                            product?.name
                        }
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        {
                            product?.description
                        }
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <span className="text-4xl font-bold">
                            {
                                formatCurrency(product?.variants[0].price || 0)
                            }
                        </span>

                        <span className="text-lg text-muted-foreground line-through">
                            {
                                formatCurrency(product?.variants[0].comparePrice || 0)
                            }
                        </span>
                        {
                            DiscountBadge({
                                price: product?.variants[0].price || 0,
                                comparePrice: product?.variants[0].comparePrice || 0
                            })
                        }
                    </div>

                    {/* Variants */}

                    <div className="mt-8">
                        <label className="mb-2 block font-medium">
                            Color
                        </label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="black">
                                    Black
                                </SelectItem>

                                <SelectItem value="white">
                                    White
                                </SelectItem>

                                <SelectItem value="blue">
                                    Blue
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Quantity */}

                    <div className="mt-6">
                        <label className="mb-2 block font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            className="h-10 w-24 rounded-md border px-3" />
                    </div>

                    {/* Actions */}

                    <div className="mt-8 flex gap-4">
                        <Button size="lg">
                            Add to Cart
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                        >
                            Buy Now
                        </Button>
                    </div>

                    {/* Features */}

                    <div className="mt-10 space-y-3">
                        <div>✓ Free Shipping</div>
                        <div>✓ 30-Day Returns</div>
                        <div>✓ Secure Checkout</div>
                    </div>
                </div>
            </div>

            {/* Description */}

            <section className="mt-20">
                <h2 className="text-2xl font-bold">
                    Product Description
                </h2>

                <p className="mt-4 max-w-3xl text-muted-foreground">
                    {product?.description}
                </p>
            </section>

            {/* Related Products */}

            <section className="mt-20">
                <h2 className="mb-6 text-2xl font-bold">
                    Related Products
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (
                        <Card
                            key={item}
                            className="overflow-hidden"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                                    alt="Product"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold">
                                    Wireless Headphones
                                </h3>

                                <p className="mt-2 text-lg font-bold">
                                    ₹4,999
                                </p>
                            </div>
                        </Card>
                    ))}

                </div>
            </section>
        </div>
    );
}