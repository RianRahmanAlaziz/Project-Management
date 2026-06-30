"use client";

import { Check } from "lucide-react";
import clsx from "clsx";
import type { ComboboxOption } from "./types";

interface ComboboxItemProps {
    option: ComboboxOption;
    selected: boolean;
}

export default function ComboboxItem({
    option,
    selected,
}: ComboboxItemProps) {
    return (
        <div
            className={clsx(
                "flex items-center justify-between rounded-lg px-3 py-2",
                "cursor-pointer transition-colors",
                "hover:bg-muted"
            )}
        >
            <div className="flex items-center gap-3 min-w-0">
                {option.avatar}
                {option.icon}
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                        {option.label}
                    </p>
                    {option.description && (
                        <p className="truncate text-xs text-muted-foreground">
                            {option.description}
                        </p>
                    )}
                </div>
            </div>
            {selected && (
                <Check
                    size={16}
                    className="text-primary"
                />
            )}
        </div>
    );
}