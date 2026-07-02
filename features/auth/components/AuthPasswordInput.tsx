"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthPasswordInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    placeholder: string;
    autoComplete: string;
    onChange: (value: string) => void;
}

export default function AuthPasswordInput({
    id,
    name,
    label,
    value,
    placeholder,
    autoComplete,
    onChange,
}: AuthPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-xs font-medium text-foreground">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required
                    minLength={8}
                    className="h-12 w-full rounded-md border border-border bg-input-background px-3 pr-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
}