"use client";

import { Plus } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { DetailProject } from "@/features/projects/types/projects";
import { formatDate } from "@/lib/utils/formatDate";
import ActionsMenu from "./ActionsMenu";

const statusLabelMap: Record<string, string> = {
    planning: "Planning",
    in_progress: "In Progress",
    review: "Review",
    done: "Done",
};

const statusColorMap: Record<
    string,
    "blue" | "amber" | "purple" | "emerald"
> = {
    planning: "blue",
    in_progress: "amber",
    review: "purple",
    done: "emerald",
};

const priorityColorMap: Record<
    string,
    "emerald" | "amber" | "red"
> = {
    low: "emerald",
    medium: "amber",
    high: "red",
};

type ProjectHeroProps = {
    project: DetailProject;
    onCreateTasks?: () => void;
    onOpenBoard: (project: DetailProject) => void;
    onSettingProject: (project: DetailProject) => void;
};

export default function ProjectHero({
    project,
    onCreateTasks,
    onOpenBoard,
    onSettingProject,
}: ProjectHeroProps) {
    const statusLabel = statusLabelMap[project.status] ?? project.status;
    const statusColor = statusColorMap[project.status] ?? "blue";
    const priorityColor = priorityColorMap[project.priority.toLowerCase()] ?? "emerald";

    return (
        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex gap-5">
                    <div
                        className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl ${project.color} text-3xl font-bold text-white`}
                    >
                        {project.name[0]}
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-3xl font-bold">
                                {project.name}
                            </h2>
                            <Badge
                                label={statusLabel}
                                color={statusColor}
                            />

                            <Badge
                                label={`${project.priority} priority`}
                                color={priorityColor}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">
                            {project.description?.length > 200
                                ? `${project.description.slice(0, 200)}...`
                                : project.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Started:{" "}
                            {formatDate(project.start_date) || "-"}
                            {" - "}
                            Due:{" "}
                            {formatDate(project.due_date) || "-"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onCreateTasks}
                    >
                        <Plus size={16} />
                        Add Tasks
                    </Button>
                    <ActionsMenu
                        project={project}
                        onOpenBoard={onOpenBoard}
                        onSettingProject={onSettingProject}
                    />
                </div>
            </div>
        </div>
    )
}
