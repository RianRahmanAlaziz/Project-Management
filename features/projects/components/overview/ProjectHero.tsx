"use client";

import {
    Plus,
    SquareDashedKanban,
} from "lucide-react";
import { Button } from "@/components/ui";
import type { DetailProject, Projects } from "@/features/projects/types/projects";
import { Badge } from "@/components/ui";
import { statusOptions } from "@/components/constants";
import { formatDate } from "@/lib/utils/formatDate";
import { ProjectActionsMenu } from "../list";
import ActionsMenu from "./ActionsMenu";

const statusColorMap = {
    planning: "blue",
    in_progress: "indigo",
    review: "purple",
    done: "green",
} as const;

const priorityColorMap = {
    Low: "green",
    Medium: "yellow",
    High: "red",
} as const;

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
    const status = statusOptions.find(
        (option) => option.value === project.status,
    ) ?? null;

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
                                label={status?.label ?? project.status}
                                color={statusColorMap[project.status] ?? "gray"}
                            />

                            <Badge
                                label={`${project.priority} Priority`}
                                color={priorityColorMap[project.priority] ?? "gray"}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">{project.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Started: {formatDate(project.start_date)} - Due: {formatDate(project.due_date)}
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
