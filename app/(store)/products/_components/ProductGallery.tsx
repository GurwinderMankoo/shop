"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@prisma/client";

type GalleryProps = {
    images: ProductImage[]
}

export default function ProductGallery({ images }: GalleryProps) {

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border">
                <Image
                    src={selectedImage.url || "/images/product-placeholder.svg"}
                    alt={selectedImage?.altText || ""}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((img) => (
                    <button
                        key={img.id}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`relative aspect-square overflow-hidden cursor-pointer rounded-lg border transition
                            ${selectedImage.url === img.url
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                    >
                        <Image
                            src={img.url}
                            alt={img.altText || ""}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
