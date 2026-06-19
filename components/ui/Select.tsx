import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-xs font-medium text-foreground">{label}</label>}

            <select
                {...props}
                className={`h-8 w-full bg-input-background border border-border rounded-md px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors appearance-none cursor-pointer ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}