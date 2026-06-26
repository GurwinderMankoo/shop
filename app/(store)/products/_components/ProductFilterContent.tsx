"use client";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";


const SORT_OPTIONS = [
    { label: "Newest", value: "" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
];


type Category = {
    name: string;
    id: string;
    imageUrl: string | null;
    slug: string;
    isActive: boolean;
};


type Props = {
    categories: Category[];
};


export default function ProductFilterContent({
    categories,
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();


    const currentCategory =
        searchParams.get("category") ?? "";


    const currentSort =
        searchParams.get("sort") ?? "";


    const updateFilter = (
        key: string,
        value: string
    ) => {

        const params = new URLSearchParams(
            searchParams.toString()
        );


        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }


        params.set("page", "1");


        router.push(
            `/products?${params.toString()}`
        );
    };


    return (
        <div>

            <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />

                <h2 className="font-semibold">
                    Filters
                </h2>
            </div>


            <h3 className="mb-3 text-sm font-medium">
                Category
            </h3>


            <RadioGroup
                value={currentCategory}
                onValueChange={(value) =>
                    updateFilter("category", value)
                }
                className="space-y-3"
            >

                <div className="flex items-center gap-2">
                    <RadioGroupItem
                        value=""
                        id="all"
                    />

                    <Label
                        htmlFor="all"
                        className="cursor-pointer"
                    >
                        All
                    </Label>
                </div>


                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center gap-2"
                    >

                        <RadioGroupItem
                            value={category.slug}
                            id={category.slug}
                        />

                        <Label
                            htmlFor={category.slug}
                            className="cursor-pointer"
                        >
                            {category.name}
                        </Label>

                    </div>
                ))}

            </RadioGroup>


            <Separator className="my-6" />


            <h3 className="mb-3 text-sm font-medium">
                Sort By
            </h3>


            <RadioGroup
                value={currentSort}
                onValueChange={(value) =>
                    updateFilter("sort", value)
                }
                className="space-3"
            >

                {SORT_OPTIONS.map((sort) => (
                    <div
                        key={sort.label}
                        className="flex items-center gap-2"
                    >

                        <RadioGroupItem
                            value={sort.value}
                            id={sort.label}
                        />

                        <Label
                            htmlFor={sort.label}
                            className="cursor-pointer"
                        >
                            {sort.label}
                        </Label>

                    </div>
                ))}

            </RadioGroup>


        </div>
    );
}