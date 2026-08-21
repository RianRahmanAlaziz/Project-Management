"use client";

import TimelineHeader from "./TimelineHeader";
import TimelineToday from "./TimelineToday";
import TimelineRow from "./TimelineRow";

import {
    getTimelineMonths,
    getTimelineRange,
    getTotalDays,
    getPosition,
    isValidTimelineTask,
} from "./timelineUtils";

import type {
    Tasks,
} from "@/features/tasks/types/tasks";

interface ProjectTasksTimelineProps {
    tasks: Tasks[];
}

export default function ProjectTasksTimeline({
    tasks,
}: ProjectTasksTimelineProps) {
    if (tasks.length === 0) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No tasks available.
            </div>
        );
    }

    const timelineTasks = tasks.filter(
        isValidTimelineTask,
    );

    const {
        minDate,
        maxDate,
    } = getTimelineRange(timelineTasks);

    const totalDays = getTotalDays(
        minDate,
        maxDate,
    );

    const months = getTimelineMonths(
        minDate,
        maxDate,
    );
    const timelineWidth = Math.max(
        months.length * 140,
        900,
    );

    const today = new Date();
    const showToday = today >= minDate && today <= maxDate;
    const todayPercent = showToday ? getPosition(today, minDate, totalDays,) : 0;

    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Project Timeline
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Timeline based on task duration
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                    {minDate.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    })}
                    {" - "}
                    {maxDate.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </div>
            </div>

            {/* Timeline */}
            <div className="overflow-x-auto overflow-y-hidden">
                <div
                    className="w-full"
                    style={{ minWidth: `${timelineWidth}px` }}
                >
                    {/* Header */}
                    <TimelineHeader months={months} />

                    {/* Timeline Body */}
                    <div className="relative mt-5">

                        {/* Month Grid */}
                        <div
                            className="pointer-events-none absolute inset-0 grid"
                            style={{
                                gridTemplateColumns: `repeat(${months.length},minmax(140px, 1fr))`,
                            }}
                        >
                            {months.map((month) => (
                                <div
                                    key={month.key}
                                    className="border-l border-border/40 last:border-r"
                                />
                            ))}
                        </div>

                        {/* Today */}
                        {showToday && (
                            <div
                                className="pointer-events-none absolute inset-y-0 left-75 right-0 z-20"
                            >
                                <TimelineToday
                                    percent={todayPercent}
                                />
                            </div>
                        )}

                        {/* Tasks */}
                        <div className="relative space-y-2">
                            {timelineTasks.map((task) => (
                                <TimelineRow
                                    key={task.id}
                                    task={task}
                                    minDate={minDate}
                                    totalDays={totalDays}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}