"use client";

import { CheckSquare, ChevronDown, Square, X } from "lucide-react";
import clsx from "clsx";
import { Avatar } from "../Avatar";
import { MultiSelectItem } from "./MultiSelectItem";
import type { ComboboxOption } from "../combobox/types";
import { useCallback, useMemo } from "react";
import { Command } from "cmdk";
import MultiSelectBase from "./MultiSelectBase";
import MultiSelectFooter from "./MultiSelectFooter";
import { MultiSelectHeader } from "./MultiSelectHeader";
import { FieldWrapper } from "../FieldWrapper";

interface MultiSelectProps {
    label?: React.ReactNode;
    error?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    values: string[];
    options: ComboboxOption[];
    onValueChange?: (values: string[]) => void;
    className?: string;
    searchable?: boolean;
    maxVisible?: number;
    clearable?: boolean;
    portalled?: boolean;
}

export function MultiSelect({
    label,
    values,
    error,
    options,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No data found",
    onValueChange,
    className,
    searchable,
    maxVisible = 3,
    clearable = true,
    portalled = true,
}: MultiSelectProps) {

    const selectedOptions = useMemo(
        () => options.filter(option => values.includes(option.value)),
        [options, values]
    );

    const visibleOptions = useMemo(
        () => selectedOptions.slice(0, maxVisible),
        [selectedOptions, maxVisible]
    );

    const hiddenCount = useMemo(
        () => Math.max(selectedOptions.length - maxVisible, 0),
        [selectedOptions.length, maxVisible]
    );

    const toggleOption = useCallback(
        (value: string) => {
            if (values.includes(value)) {
                onValueChange?.(
                    values.filter(v => v !== value)
                );
            } else {
                onValueChange?.([
                    ...values,
                    value,
                ]);
            }
        },
        [values, onValueChange]
    );

    const toggleSelectAll = useCallback(() => {
        const allSelected = values.length === options.length;

        onValueChange?.(
            allSelected
                ? []
                : options.map(option => option.value)
        );
    }, [values, options, onValueChange]);

    const clearAll = useCallback(() => {
        onValueChange?.([]);
    }, [onValueChange]);

    return (
        <FieldWrapper label={label}>
            <MultiSelectBase
                portalled={portalled}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                emptyMessage={emptyMessage}
                trigger={({ open }) => (
                    <button
                        type="button"
                        className={clsx(
                            "flex min-h-12 w-full items-center justify-between rounded-lg border border-border bg-background px-3",
                            "cursor-pointer",
                            "hover:border-primary/40",
                            "focus:outline-none focus:ring-2 focus:ring-ring ",
                            className
                        )}
                    >
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                            {selectedOptions.length === 0 ? (
                                <span className="text-sm text-muted-foreground">
                                    {placeholder}
                                </span>
                            ) : (
                                <>
                                    {visibleOptions.map(option => (

                                        <span
                                            key={option.value}
                                            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                                        >
                                            <Avatar
                                                name={option.label}
                                                size="xs"
                                            />
                                            {option.label}
                                            <X
                                                size={12}
                                                className="cursor-pointer"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    toggleOption(option.value);
                                                }}
                                            />
                                        </span>
                                    ))}
                                    {hiddenCount > 0 && (
                                        <span
                                            className={clsx(
                                                "inline-flex items-center rounded-md",
                                                "border border-dashed border-border",
                                                "px-2 py-1 text-xs font-medium",
                                                "text-muted-foreground"
                                            )}
                                        >
                                            +{hiddenCount}
                                        </span>
                                    )}
                                </>

                            )}
                        </div>

                        {clearable && selectedOptions.length > 0 && (
                            <div
                                role="button"
                                tabIndex={0}
                                className={clsx(
                                    "rounded-md p-1 cursor-pointer",
                                    "text-muted-foreground",
                                    "hover:bg-destructive",
                                    "hover:text-foreground",
                                    "transition-colors"
                                )}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clearAll();
                                }}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        clearAll();
                                    }
                                }}
                            >
                                <X size={16} />
                            </div>
                        )}
                        <ChevronDown
                            size={18}
                            className={clsx(
                                "shrink-0 transition-transform duration-200",
                                open && "rotate-180"
                            )}
                        />
                    </button>
                )}
                header={() => (
                    <MultiSelectHeader
                        selectedCount={values.length}
                        totalCount={options.length}
                        onToggleAll={toggleSelectAll}
                    />
                )}
                footer={({ close }) => (
                    <MultiSelectFooter
                        selectedCount={values.length}
                        onDone={close}
                    />
                )}
            >

                {({ close }) => (
                    options.map(option => (
                        <MultiSelectItem
                            key={option.value}
                            option={option}
                            selected={values.includes(option.value)}
                            onSelect={() =>
                                toggleOption(option.value)
                            }
                        />
                    ))
                )}
            </MultiSelectBase>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </FieldWrapper>
    );
}