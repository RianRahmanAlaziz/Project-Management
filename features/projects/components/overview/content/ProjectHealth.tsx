"use client";

import {
    Activity,
    AlertTriangle,
    CalendarClock,
    CheckCircle2,
    Users,
} from "lucide-react";

import type { Projects } from "@/features/projects/types/projects";
import { TASKS } from "@/features/tasks/mocks/tasks";
import { ProgressBar } from "@/components/ui/ProgressBar";

type ProjectHealthProps = {
    project: Projects;
};

export default function ProjectHealth({
    project,
}: ProjectHealthProps) {

    const tasks = TASKS.data.filter(
        (task) => task.project_id === project.id
    );

    const completed = tasks.filter(
        (task) => task.status === "Done"
    ).length;

    const overdue = tasks.filter(
        (task) =>
            task.status !== "Done" &&
            new Date(task.due_date) < new Date()
    ).length;

    const remainingDays = Math.max(
        0,
        Math.ceil(
            (new Date(project.due_date).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
    );

    const healthScore = Math.max(
        0,
        Math.min(
            100,
            project.progress - overdue * 5
        )
    );

    const healthStatus =
        healthScore >= 90
            ? {
                label: "Excellent",
                color: "text-success",
                bg: "bg-success/10",
            }
            : healthScore >= 75
                ? {
                    label: "Good",
                    color: "text-primary",
                    bg: "bg-primary/10",
                }
                : healthScore >= 60
                    ? {
                        label: "Fair",
                        color: "text-warning",
                        bg: "bg-warning/10",
                    }
                    : {
                        label: "Needs Attention",
                        color: "text-destructive",
                        bg: "bg-destructive/10",
                    };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-muted-foreground">
                        Project Health
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                        {healthScore}%
                    </h2>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${healthStatus.bg} ${healthStatus.color}`}
                >
                    {healthStatus.label}
                </span>

            </div>

            <div className="mt-5">

                <ProgressBar
                    value={healthScore}
                    color="indigo"
                />

            </div>

            <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Activity
                            size={18}
                            className="text-primary"
                        />

                        <span className="text-sm">
                            Progress
                        </span>

                    </div>

                    <span className="font-semibold">
                        {project.progress}%
                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <CheckCircle2
                            size={18}
                            className="text-success"
                        />

                        <span className="text-sm">
                            Completed Tasks
                        </span>

                    </div>

                    <span className="font-semibold">
                        {completed}/{tasks.length}
                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Users
                            size={18}
                            className="text-indigo-500"
                        />

                        <span className="text-sm">
                            Team Members
                        </span>

                    </div>

                    <span className="font-semibold">
                        {project.member_id.length}
                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <AlertTriangle
                            size={18}
                            className="text-warning"
                        />

                        <span className="text-sm">
                            Overdue Tasks
                        </span>

                    </div>

                    <span className="font-semibold">
                        {overdue}
                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <CalendarClock
                            size={18}
                            className="text-primary"
                        />

                        <span className="text-sm">
                            Remaining Time
                        </span>

                    </div>

                    <span className="font-semibold">
                        {remainingDays} Days
                    </span>

                </div>

            </div>

        </div>
    );
}