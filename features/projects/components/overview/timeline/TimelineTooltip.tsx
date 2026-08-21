"use client";

import { createPortal } from "react-dom";
import { CalendarDays } from "lucide-react";

import { formatDate } from "@/lib/utils/formatDate";
import type { Tasks } from "@/features/tasks/types/tasks";

interface Props {
    task: Tasks;
    duration: number;
    status: string;
    open: boolean;
    top: number;
    left: number;
}

export default function TimelineTooltip({
    task,
    duration,
    status,
    open,
    top,
    left,
}: Props) {
    if (!open) {
        return null;
    }

    return createPortal(
        <div
            className="
                pointer-events-none
                fixed
                z-[9999]
                w-max
                max-w-64
                -translate-x-1/2
                -translate-y-full
                rounded-lg
                border
                border-border
                bg-popover
                px-3
                py-2.5
                text-xs
                shadow-xl
            "
            style={{
                top,
                left,
            }}
        >
            <p className="max-w-56 truncate font-semibold text-foreground">
                {task.title}
            </p>

            <p className="mt-0.5 text-muted-foreground">
                {status}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays size={11} />

                <span>
                    {formatDate(task.start_date)}
                    {" → "}
                    {formatDate(task.due_date)}
                </span>
            </div>

            <div className="mt-1 text-muted-foreground">
                Duration:{" "}
                <span className="font-medium text-foreground">
                    {duration} days
                </span>
            </div>
        </div>,
        document.body,
    );
}