"use client";

import Toggle from "./Toggle";

interface ToggleRowProps {
    label: string;
    desc: string;
    value: boolean;
    onChange: () => void;
    disabled?: boolean;
}

export default function ToggleRow({
    label,
    desc,
    value,
    onChange,
    disabled = false,
}: ToggleRowProps) {
    return (
        <div className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-0">
            <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-foreground">
                    {label}
                </h4>

                <p className="text-xs leading-5 text-muted-foreground">
                    {desc}
                </p>
            </div>

            <Toggle
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}