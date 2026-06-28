'use client'
import { cn } from "@/lib/utils";

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Error from './Error'
import { useFormStatus } from "react-dom";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    label?: string

}

export default function InputField({ error, label, ...props }: InputFieldProps) {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2">
            {label && <Label htmlFor={props.id}>
                {label}
            </Label>}

            <Input
                {...props}
                disabled={pending || props.disabled}
                className={cn(
                    props.className,
                    error && "border-red-500! focus-visible:ring-red-500!"
                )}
                aria-invalid={!!error}
                aria-describedby={
                    error ? `${props.id}-error` : undefined
                }

                style={error ? { border: "1px solid red" } : {}}

            />
            <Error err={error} id={props.id} />
        </div>
    )
}
