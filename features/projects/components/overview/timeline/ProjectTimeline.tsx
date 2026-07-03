"use client";


import { ProgressBar } from "@/components/ui/ProgressBar";
import { Projects } from "@/features/projects/types/projects";
import { CalendarDays, Flag, Clock3 } from "lucide-react";

interface ProjectTimelineProps {
    project: Projects;
}

export default function ProjectTimeline({
    project,
}: ProjectTimelineProps) {
    const startDate = new Date(project.start_date);
    const dueDate = new Date(project.due_date);
    const today = new Date();

    const totalDays = Math.max(
        1,
        Math.ceil(
            (dueDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );
    const passedDays = Math.min(
        totalDays,
        Math.max(
            0,
            Math.ceil(
                (today.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
        )
    );
    const remainingDays = Math.max(
        0,
        Math.ceil(
            (dueDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );
    const timelineProgress = Math.min(
        100,
        Math.round((passedDays / totalDays) * 100)
    );
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">
                        Project Timeline
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track project duration and deadline
                    </p>
                </div>
                <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                    On Track
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
                                {project.start_date}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-warning/10 p-2 ">
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
                                {project.due_date}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="rounded-xl bg-muted/40 p-3 border border-border">
                        <p className="text-sm text-muted-foreground">
                            Duration
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            {totalDays} Days
                        </p>
                    </div>
                    <div className="rounded-xl bg-muted/40 p-3 border border-border">
                        <p className="text-sm text-muted-foreground">
                            Remaining
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            {remainingDays} Days
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
    )
}
