"use client";

import { CalendarDays, Flag } from "lucide-react";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatDate } from "@/lib/utils/formatDate";

import type { DetailProject } from "@/features/projects/types/projects";

interface ProjectTimelineProps {
    project: DetailProject;
}

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export default function ProjectTimeline({
    project,
}: ProjectTimelineProps) {
    const hasDates =
        Boolean(project.start_date) &&
        Boolean(project.due_date);

    const startDate = project.start_date
        ? new Date(project.start_date)
        : null;

    const dueDate = project.due_date
        ? new Date(project.due_date)
        : null;

    const today = new Date();

    const totalDays =
        startDate && dueDate
            ? Math.max(
                1,
                Math.ceil(
                    (dueDate.getTime() -
                        startDate.getTime()) /
                    DAY_IN_MS,
                ),
            )
            : 0;

    const passedDays = startDate && dueDate ? Math.min(totalDays, Math.max(0,
        Math.ceil(
            (today.getTime() -
                startDate.getTime()) /
            DAY_IN_MS,
        ),),) : 0;

    const remainingDays = startDate && dueDate
        ? Math.max(
            0,
            Math.ceil((dueDate.getTime() -
                today.getTime()) /
                DAY_IN_MS,
            ),) : 0;

    const timelineProgress = totalDays > 0
        ? Math.min(
            100,
            Math.round((passedDays / totalDays) * 100,),) : 0;

    const timelineStatus = project.status === "done"
        ? {
            label: "Completed",
            className: "bg-success/10 text-success",
        }
        : dueDate && today.getTime() > dueDate.getTime()
            ? {
                label: "Overdue",
                className: "bg-destructive/10 text-destructive",
            }
            : {
                label: "On Track",
                className: "bg-success/10 text-success",
            };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">
                        Project Timeline
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Track project duration and deadline
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium  ${timelineStatus.className}`} >
                    {timelineStatus.label}
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <CalendarDays
                                size={18}
                                className="text-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Start Date
                            </p>
                            <p className="font-medium">
                                {project.start_date ? formatDate(project.start_date) : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-warning/10 p-2">
                            <Flag
                                size={18}
                                className="text-warning"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Due Date
                            </p>

                            <p className="font-medium">
                                {project.due_date ? formatDate(project.due_date) : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <p className="text-sm text-muted-foreground">
                            Duration
                        </p>

                        <p className="mt-1 text-xl font-bold">
                            {hasDates ? `${totalDays} Days` : "-"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <p className="text-sm text-muted-foreground">
                            Remaining
                        </p>

                        <p className="mt-1 text-xl font-bold">
                            {hasDates ? `${remainingDays} Days` : "-"}
                        </p>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Timeline Progress
                        </span>

                        <span className="font-semibold">
                            {timelineProgress}%
                        </span>
                    </div>

                    <ProgressBar
                        value={timelineProgress}
                        color="indigo"
                    />
                </div>
            </div>
        </div>
    );
}