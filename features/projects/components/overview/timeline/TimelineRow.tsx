"use client";

import { statusOptions } from "@/components/constants";
import type { Tasks } from "@/features/tasks/types/tasks";
import { getPosition } from "./timelineUtils";
import TimelineTooltip from "./TimelineTooltip";

interface TimelineRowProps {
    task: Tasks;
    minDate: Date;
    totalDays: number;
}

const statusColorMap = {
    planning: "bg-blue-500",
    in_progress: "bg-indigo-500",
    review: "bg-purple-500",
    done: "bg-emerald-500",
} as const;

const statusTrackMap = {
    planning: "bg-blue-100 dark:bg-blue-950/40",
    in_progress: "bg-indigo-100 dark:bg-indigo-950/40",
    review: "bg-purple-100 dark:bg-purple-950/40",
    done: "bg-emerald-100 dark:bg-emerald-950/40",
} as const;

export default function TimelineRow({
    task,
    minDate,
    totalDays,
}: TimelineRowProps) {

    const startDate = new Date(task.start_date);
    const endDate = new Date(task.due_date);
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

    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

    const status = statusOptions.find(
        option => option.value === task.status,
    );

    return (
        <div
            className="
                group
                grid
                grid-cols-[280px_1fr]
                gap-5
                rounded-xl
                p-3
                transition-all
                hover:bg-muted/30
            "
        >
            {/* LEFT */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    {status?.icon}
                    <p className="truncate font-medium text-foreground">
                        {task.title}
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                        {task.assignee.name}
                    </span>
                    <span>•</span>
                    <span>
                        {duration} days
                    </span>
                </div>
            </div>
            {/* RIGHT */}
            <div className="relative h-9">
                {/* Track */}
                <div
                    className={`
                        absolute
                        top-3
                        h-4
                        w-full
                        rounded-full
                        ${statusTrackMap[task.status as keyof typeof statusTrackMap]}
                    `}
                />
                {/* Bar */}
                <div
                    className={`
                        absolute
                        top-3
                        h-4
                        rounded-full
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:scale-y-110
                        ${statusColorMap[task.status as keyof typeof statusColorMap]}
                    `}
                    style={{
                        left: `${left}%`,
                        width: `${width}%`,
                    }}
                />
                <TimelineTooltip
                    task={task}
                    duration={duration}
                    status={
                        status?.label ??
                        task.status
                    }
                />
            </div>
        </div>
    );
}