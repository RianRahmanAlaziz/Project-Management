"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={400}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        className="z-50 bg-foreground text-background text-xs rounded px-2 py-1 shadow-md"
                        sideOffset={4}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-foreground" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}