import { Card } from '@/components/ui/card'
import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryCard({ imageUrl, name, slug }: Partial<Category>) {
    return (
        <Card
            className="group cursor-pointer overflow-hidden p-4 transition-shadow hover:shadow-xl"
        >
            <Link
                href={`/products?category=${slug}&page=1`}
                className="block"
            >

                <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                        src={
                            imageUrl ||
                            "/images/category-placeholder.svg"
                        }
                        alt={name || ""}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>


                <h3 className="mt-4 font-semibold">
                    {name}
                </h3>

            </Link>
        </Card>
    )
}
