'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function CustomSelect({ ...props }: React.ComponentProps<typeof Select>) {
    return (
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
    )
}
