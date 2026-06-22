import { Card } from '@/components/ui/card'
import { Category } from '@prisma/client'
import Image from 'next/image'

export default function CategoryCard({ imageUrl, name }: Partial<Category>) {
    return (
        <Card
            // className="group cursor-pointer p-8 transition hover:shadow-lg"
            className="group cursor-pointer p-4 overflow-hidden transition-shadow hover:shadow-xl"
        >
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={
                        imageUrl ||
                        "/images/category-placeholder.svg"
                    }
                    alt={name || ''}
                    fill
                    className="
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
                />
            </div>

            <h3 className="mt-4 font-semibold">
                {name}
            </h3>
        </Card>
    )
}
