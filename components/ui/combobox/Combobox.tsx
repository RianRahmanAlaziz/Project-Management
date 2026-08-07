"use client";

import {
    ChevronDown,
} from "lucide-react";
import clsx from "clsx";
import { ComboboxBase } from "./ComboboxBase";
import ComboboxItem from "./ComboboxItem";
import type { ComboboxOption } from "./types";
import { useMemo } from "react";
import { FieldWrapper } from "../FieldWrapper";

interface ComboboxProps {
    label?: React.ReactNode;
    placeholder?: string;
    error?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    value?: string;
    options: ComboboxOption[];
    onValueChange?: (value: string) => void;
    className?: string;
    searchable?: boolean;
}

export function Combobox({
    label,
    value,
    error,
    options,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No data found",
    onValueChange,
    className,
    searchable,
}: ComboboxProps) {

    const selected = useMemo(() =>
        options.find(
            option => option.value === value
        ),
        [options, value]
    );

    return (
        <FieldWrapper label={label}>
            <ComboboxBase
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                emptyMessage={emptyMessage}
                trigger={({ open }) => (
                    <button
                        type="button"
                        className={clsx(
                            "flex h-12 w-full items-center justify-between",
                            "rounded-lg border border-border bg-background px-4",
                            "cursor-pointer text-left transition-colors",
                            "hover:border-primary/40",
                            "focus:outline-none focus:ring-2 focus:ring-ring ",
                            className
                        )}
                    >
                        {selected ? (
                            <div className="flex items-center gap-3">
                                {selected.avatar}
                                {selected.icon}

                                <div>
                                    <p className="text-sm">
                                        {selected.label}
                                    </p>

                                    {selected.description && (
                                        <p className="text-xs text-muted-foreground">
                                            {selected.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <span className="text-sm text-muted-foreground">
                                {placeholder}
                            </span>
                        )}

                        <ChevronDown
                            size={18}
                            className={clsx(
                                "transition-transform duration-200",
                                open && "rotate-180"
                            )}
                        />
                    </button>
                )}
            >
                {({ close }) =>
                    options.map(option => (
                        <ComboboxItem
                            key={option.value}
                            option={option}
                            selected={option.value === value}
                            onSelect={() => {
                                onValueChange?.(option.value);
                                close();
                            }}
                        />
                    ))
                }
            </ComboboxBase>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </FieldWrapper>

    );
}