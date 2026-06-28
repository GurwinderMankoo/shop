'use client'

import { useState } from "react";
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import Error from "./Error";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    label?: string

}

export default function PasswordInput({ label, error, ...props }: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="space-y-2">
            {label && <Label htmlFor={props.id}>
                {label}
            </Label>}
            <div className="relative">
                <Input
                    {...props}
                    type={showPassword ? "text" : "password"}
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

                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>
            <Error err={error} id={props.id} />

        </div>
    )
}
