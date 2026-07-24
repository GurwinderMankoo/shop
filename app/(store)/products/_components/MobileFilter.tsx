"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import ProductFilterContent from "./ProductFilterContent";

type MobileFilterProps = {
    categories: any[];
};

export default function MobileFilter({ categories }: MobileFilterProps) {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-10 shrink-0"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-6 sm:p-3">
                <ProductFilterContent categories={categories} />
            </SheetContent>
        </Sheet>
    );
}
