"use client";

import { Command } from "cmdk";
import { Check } from "lucide-react";
import clsx from "clsx";

import type { ComboboxOption } from "./types";

interface ComboboxItemProps {
    option: ComboboxOption;
    selected: boolean;
    onSelect?: () => void;
}

export default function ComboboxItem({
    option,
    selected,
    onSelect,
}: ComboboxItemProps) {
    return (
        <Command.Item
            value={option.label}
            disabled={option.disabled}
            onSelect={onSelect}
            className={clsx(
                "cursor-pointer rounded-lg",
                "data-[selected=true]:bg-muted",
                "outline-none"
            )}
        >
            <div
                className={clsx(
                    "flex items-center justify-between px-3 py-2",
                    "transition-colors"
                )}
            >
                <div className="flex min-w-0 items-center gap-3">
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
        </Command.Item>
    );
}