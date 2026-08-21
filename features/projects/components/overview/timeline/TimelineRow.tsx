"use client";

import { statusOptions } from "@/components/constants";
import type { Tasks } from "@/features/tasks/types/tasks";
import { getColorOption } from "@/lib/utils/getColorOption";
import { getPosition } from "./timelineUtils";
import TimelineTooltip from "./TimelineTooltip";
import { useState } from "react";

interface TimelineRowProps {
    task: Tasks;
    minDate: Date;
    totalDays: number;
}

export default function TimelineRow({
    task,
    minDate,
    totalDays,
}: TimelineRowProps) {
    if (!task.start_date || !task.due_date) {
        return null;
    }

    const startDate = new Date(task.start_date);
    const endDate = new Date(task.due_date);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate < startDate
    ) {
        return null;
    }

    const left = getPosition(
        startDate,
        minDate,
        totalDays,
    );

    const right = getPosition(
        endDate,
        minDate,
        totalDays,
    );

    const width = Math.max(
        right - left,
        2,
    );

    const duration =
        Math.ceil(
            (endDate.getTime() -
                startDate.getTime()) /
            86400000,
        ) + 1;

    const status = statusOptions.find(
        (option) =>
            option.value === task.status,
    );

    const color = getColorOption(
        task.column?.color,
    );

    const barColor = color?.bg ?? "bg-slate-500";

    const [tooltip, setTooltip] = useState<{
        open: boolean;
        top: number;
        left: number;
    }>({
        open: false,
        top: 0,
        left: 0,
    });

    const handleMouseEnter = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const rect =
            event.currentTarget.getBoundingClientRect();

        setTooltip({
            open: true,
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
        });
    };

    const handleMouseLeave = () => {
        setTooltip((current) => ({
            ...current,
            open: false,
        }));
    };

    return (
        <div
            className="
                group
                grid
                grid-cols-[280px_minmax(0,1fr)]
                gap-5
                rounded-xl
                p-3
                transition-colors
                hover:bg-muted/30
            "
        >
            {/* LEFT */}
            <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                    <span
                        className={[
                            "h-2 w-2 shrink-0 rounded-full",
                            barColor,
                        ].join(" ")}
                        aria-hidden="true"
                    />

                    <p className="truncate font-medium text-foreground">
                        {task.title}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">
                        {task.assignee?.name ??
                            "Unassigned"}
                    </span>

                    <span>•</span>

                    <span className="shrink-0">
                        {duration} days
                    </span>
                </div>
            </div>

            {/* RIGHT */}
            <div className="relative h-9">
                {/* Track */}
                <div
                    className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2  rounded-full bg-muted/50"
                />

                {/* Task Bar */}
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={[
                        "group/bar",
                        "absolute",
                        "top-1/2",
                        "h-7",
                        "-translate-y-1/2",
                        "rounded-md",
                        "shadow-sm",
                        "transition-all",
                        "duration-200",
                        "hover:h-8",
                        "hover:shadow-md",
                        "hover:brightness-110",
                        barColor,
                    ].join(" ")}
                    style={{
                        left: `${left}%`,
                        width: `${width}%`,
                    }}
                >
                    <TimelineTooltip
                        task={task}
                        duration={duration}
                        status={status?.label ?? task.status}
                        open={tooltip.open}
                        top={tooltip.top}
                        left={tooltip.left}
                    />
                </div>
            </div>
        </div>
    );
}