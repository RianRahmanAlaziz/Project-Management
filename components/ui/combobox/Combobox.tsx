"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import {
    ChevronDown,
} from "lucide-react";
import clsx from "clsx";
import ComboboxItem from "./ComboboxItem";
import type {
    ComboboxOption,
} from "./types";

interface ComboboxProps {
    label?: React.ReactNode;
    placeholder?: string;
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
    options,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No data found",
    onValueChange,
    className,
    searchable,
}: ComboboxProps) {

    const [open, setOpen] = React.useState(false);
    const selected =
        options.find(
            item =>
                item.value === value
        );

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                    {label}
                </label>
            )}
            <Popover.Root
                open={open}
                onOpenChange={setOpen}
            >

                <Popover.Trigger asChild>
                    <button
                        type="button"
                        className={clsx(
                            "flex h-12 w-full items-center justify-between",
                            "rounded-lg border border-border",
                            "bg-background px-4",
                            "text-left",
                            "transition-colors",
                            "hover:border-primary/40",
                            "focus:outline-none",
                            "focus:ring-2",
                            "focus:ring-primary/20",
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
                            className="text-muted-foreground"
                        />
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        align="start"
                        sideOffset={6}
                        className=" z-100 w-(--radix-popover-trigger-width) rounded-xl border border-border bg-card p-2 shadow-xl "
                    >
                        <Command>
                            {searchable && (
                                <Command.Input
                                    placeholder={searchPlaceholder}
                                    className="mb-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none"
                                />
                            )}
                            <Command.Empty
                                className="py-6 text-center text-sm text-muted-foreground "
                            >
                                {emptyMessage}
                            </Command.Empty>
                            <Command.List
                                className="max-h-72 overflow-y-auto "
                            >
                                {options.map(option => (
                                    <Command.Item
                                        key={option.value}
                                        value={option.label}
                                        disabled={option.disabled}
                                        onSelect={() => {
                                            onValueChange?.(
                                                option.value
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <ComboboxItem
                                            option={option}
                                            selected={
                                                option.value === value
                                            }
                                        />
                                    </Command.Item>
                                ))}
                            </Command.List>
                        </Command>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
}