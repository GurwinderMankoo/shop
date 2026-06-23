import { Badge } from "../ui/badge";

export default function DiscountBadge({ price, comparePrice }: { price: number, comparePrice: number }) {
    const percentage = ((comparePrice - price) / comparePrice) * 100

    if (!comparePrice && comparePrice < price) return null
    return (
        <Badge className="">
            {Math.round(percentage)}% off
        </Badge>
    )
}
