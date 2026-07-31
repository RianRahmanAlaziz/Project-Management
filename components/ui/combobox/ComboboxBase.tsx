"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import clsx from "clsx";
import { ComboboxSearch } from "./ComboboxSearch";

interface ComboboxBaseProps {
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    contentClassName?: string;
    trigger: (props: {
        open: boolean;
    }) => React.ReactNode;

    children: (props: {
        open: boolean;
        close: () => void;
    }) => React.ReactNode;
}

export function ComboboxBase({
    searchable = true,
    searchPlaceholder = "Search...",
    emptyMessage = "No data found",
    contentClassName,
    trigger,
    children,
}: ComboboxBaseProps) {
    const [open, setOpen] = React.useState(false);
    const close = React.useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <Popover.Root
            open={open}
            onOpenChange={setOpen}
        >
            <Popover.Trigger asChild>
                {trigger({ open })}
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    align="start"
                    sideOffset={6}
                    className={clsx(
                        "z-100 w-(--radix-popover-trigger-width)",
                        "rounded-xl border border-border",
                        "bg-card p-2 shadow-xl",
                        "overflow-hidden",
                        contentClassName
                    )}
                >
                    <Command className="flex max-h-96 flex-col">
                        <ComboboxSearch
                            searchable={searchable}
                            placeholder={searchPlaceholder}
                        />
                        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                            {emptyMessage}
                        </Command.Empty>
                        <Command.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain ">
                            {children({
                                open,
                                close,
                            })}
                        </Command.List>
                    </Command>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}