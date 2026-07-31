"use client";

import clsx from "clsx";
import { CheckSquare, Square } from "lucide-react";
import { Command } from "cmdk";
import type { ComboboxOption } from "../combobox/";

interface MultiSelectItemProps {
    option: ComboboxOption;
    selected: boolean;
    onSelect?: () => void;
}

export function MultiSelectItem({
    option,
    selected,
    onSelect,
}: MultiSelectItemProps) {
    return (
        <Command.Item
            value={option.label}
            disabled={option.disabled}
            onSelect={onSelect}
            className={clsx(
                "cursor-pointer rounded-lg outline-none",
                "data-[selected=true]:bg-muted"
            )}
        >
            <div
                className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2",
                    "transition-colors",
                    "hover:bg-muted"
                )}
            >
                {selected ? (
                    <CheckSquare
                        size={18}
                        className="text-primary shrink-0"
                    />
                ) : (
                    <Square
                        size={18}
                        className="text-muted-foreground shrink-0"
                    />
                )}
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
        </Command.Item>

    );
}