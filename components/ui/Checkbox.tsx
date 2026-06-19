"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <CheckboxPrimitive.Root
                checked={checked}
                onCheckedChange={(value) => onChange(Boolean(value))}
                className="w-4 h-4 rounded border border-border bg-input-background data-[state=checked]:bg-primary data-[state=checked]:border-primary flex items-center justify-center transition-colors"
            >
                <CheckboxPrimitive.Indicator>
                    <Check size={10} strokeWidth={3} className="text-white" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            {label && <span className="text-sm text-foreground">{label}</span>}
        </label>
    );
}