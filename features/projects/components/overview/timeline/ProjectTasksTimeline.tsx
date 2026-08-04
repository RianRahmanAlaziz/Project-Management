"use client";

import TimelineHeader from "./TimelineHeader";
import TimelineToday from "./TimelineToday";
import TimelineRow from "./TimelineRow";

import {
    getTimelineMonths,
    getTimelineRange,
    getTotalDays,
    getPosition,
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

    const {
        minDate,
        maxDate,
    } = getTimelineRange(tasks);

    const totalDays = getTotalDays(
        minDate,
        maxDate,
    );

    const months = getTimelineMonths(
        minDate,
        maxDate,
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
            <TimelineHeader
                months={months}
            />
            <div className="relative">
                {showToday && (
                    <TimelineToday
                        percent={todayPercent}
                    />
                )}
                <div className="space-y-2">
                    {tasks.map((task) => (
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
    );

}