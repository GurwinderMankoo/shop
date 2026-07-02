"use client";

import { cn } from "@/lib/utils";
import { ProductOptionValue } from "@/types/products";

type VariantOptionsProps = {
    id: string
    name: string,
    values: ProductOptionValue[],
    value: string,
    onChange: (value: string, name: string, valueId: string, optionId: string) => void,
}

export default function VariantOptions({ id, name, values, value, onChange }: VariantOptionsProps) {

    const onSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string, name: string, valueId: string, optionId: string) => {
        e.preventDefault();
        onChange(value, name, valueId, optionId);
    }

    return (
        <div className="space-y-3 mb-2 last:mb-0">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{name}</p>

                {value && (
                    <span className="text-sm text-muted-foreground">
                        {value}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {values.map((option) => {
                    const selected = value === option.value;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={(e) => onSelect(e, option.value, name, option.id, id)}
                            className={cn(
                                "rounded-md border px-4 py-2 transition cursor-pointer",
                                selected && "border-primary bg-primary text-primary-foreground",
                            )}
                        >
                            {option.value}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
