"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
    Check,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import clsx from "clsx";

export interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps {
    label?: string;
    value?: string;
    placeholder?: string;
    options: SelectOption[];
    onValueChange?: (value: string) => void;
    className?: string;
}

export function Select({
    label,
    value,
    placeholder = "Select an option",
    options,
    onValueChange,
    className,
}: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-base font-medium text-foreground">
                    {label}
                </label>
            )}

            <SelectPrimitive.Root
                value={value}
                onValueChange={onValueChange}
            >
                <SelectPrimitive.Trigger
                    className={clsx(
                        "flex h-12 w-full items-center justify-between",
                        "rounded-md border border-border",
                        "bg-card px-4",
                        "text-sm text-foreground",
                        "shadow-sm",
                        "transition-all",
                        "hover:border-primary/50",
                        "focus:outline-none",
                        "focus:ring-2",
                        "focus:ring-primary/20",
                        className
                    )}
                >
                    <SelectPrimitive.Value
                        placeholder={placeholder}
                    />

                    <SelectPrimitive.Icon>
                        <ChevronDown
                            size={16}
                            className="text-muted-foreground"
                        />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        position="popper"
                        className="
                            z-50
                            w-(--radix-select-trigger-width)

                            overflow-hidden

                            rounded-xl
                            border border-border

                            bg-card

                            shadow-xl

                            data-[state=open]:animate-in
                            data-[state=closed]:animate-out

                            data-[state=open]:fade-in-0
                            data-[state=closed]:fade-out-0

                            data-[state=open]:zoom-in-95
                            data-[state=closed]:zoom-out-95
                        "
                    >
                        <SelectPrimitive.ScrollUpButton
                            className="flex items-center justify-center py-1"
                        >
                            <ChevronUp size={14} />
                        </SelectPrimitive.ScrollUpButton>

                        <SelectPrimitive.Viewport className="p-1">
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    className="
                                        relative

                                        flex
                                        cursor-pointer
                                        items-center

                                        rounded-lg

                                        px-3
                                        py-2

                                        text-sm

                                        text-foreground

                                        outline-none

                                        hover:bg-muted
                                        focus:bg-muted
                                    "
                                >
                                    <SelectPrimitive.ItemText>
                                        <div className="flex items-center gap-2">
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </div>
                                    </SelectPrimitive.ItemText>

                                    <SelectPrimitive.ItemIndicator
                                        className="
                                            absolute
                                            right-3
                                        "
                                    >
                                        <Check size={14} />
                                    </SelectPrimitive.ItemIndicator>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>

                        <SelectPrimitive.ScrollDownButton
                            className="flex items-center justify-center py-1"
                        >
                            <ChevronDown size={14} />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
        </div>
    );
}