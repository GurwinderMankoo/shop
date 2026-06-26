"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
    SlidersHorizontal
} from "lucide-react";


import ProductFilterContent from "./ProductFilterContent";


export default function ProductFilters({
    categories,
}: {
    categories: any[];
}) {


    return (
        <>
            {/* Desktop */}
            <aside className="hidden lg:block sticky top-24 h-fit rounded-xl border bg-card p-5">
                <ProductFilterContent
                    categories={categories}
                />
            </aside>



            {/* Mobile */}
            <div className="lg:hidden mb-4 p-6">

                <Sheet>

                    <SheetTrigger asChild>

                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            <SlidersHorizontal
                                className="mr-2 h-4 w-4"
                            />

                            Filters
                        </Button>

                    </SheetTrigger>


                    <SheetContent
                        side="left"
                        className="w-[280px] p-6 sm:p-3"
                    >

                        <ProductFilterContent
                            categories={categories}
                        />

                    </SheetContent>


                </Sheet>

            </div>
        </>
    );
}