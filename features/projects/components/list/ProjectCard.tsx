"use client";

import {
    Calendar,
    ListTodo,
    Users,
} from "lucide-react";

import {
    ProjectActionsMenu,
} from "@/features/projects/components";

import {
    Badge,
    ProgressBar,
} from "@/components/ui";

import type {
    Projects,
} from "@/features/projects/types/projects";

const statusColorMap: Record<
    string,
    "blue" | "amber" | "purple" | "emerald"
> = {
    planning: "blue",
    in_progress: "amber",
    review: "purple",
    done: "emerald",
};

const statusLabelMap: Record<string, string> = {
    planning: "Planning",
    in_progress: "In Progress",
    review: "Review",
    done: "Done",
};

const priorityColorMap: Record<
    string,
    "emerald" | "amber" | "red"
> = {
    low: "emerald",
    medium: "amber",
    high: "red",
};


type ProjectCardProps = {
    project: Projects;
    onOpenProject: (project: Projects) => void;
    onOpenBoard: (project: Projects) => void;
    onSettingProject: (project: Projects) => void;
};

export default function ProjectCard({
    project,
    onOpenProject,
    onOpenBoard,
    onSettingProject,
}: ProjectCardProps) {
    const statusLabel = statusLabelMap[project.status] ?? project.status;
    const statusColor = statusColorMap[project.status] ?? "blue";
    const priorityColor = priorityColorMap[project.priority.toLowerCase()] ?? "gray";

    return (
        <div
            onClick={() => onOpenProject(project)}
            className="
                group cursor-pointer
                rounded-xl border border-border
                bg-card p-4
                transition-all
                hover:border-primary/40
                hover:shadow-sm
            "
        >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className={`
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg
                            ${project.color}
                            text-sm font-bold text-white
                        `}
                    >
                        {project.name[0]}
                    </div>

                    <div className="min-w-0">
                        <p className="
                            truncate
                            text-base font-semibold
                            text-foreground
                            transition-colors
                            group-hover:text-primary
                        ">
                            {project.name}
                        </p>
                    </div>
                </div>

                <ProjectActionsMenu
                    project={project}
                    onOpenBoard={onOpenBoard}
                    onSettingProject={onSettingProject}
                />
            </div>

            {/* Status & Priority */}
            <div className="mb-3 flex items-center gap-2">
                <Badge
                    label={statusLabel}
                    color={statusColor}
                />

                <Badge
                    label={project.priority}
                    color={priorityColor}
                />
            </div>

            {/* Progress */}
            <div className="mb-3">
                <div className="mb-1 flex justify-between">
                    <span className="text-sm text-muted-foreground">
                        Progress
                    </span>

                    <span className="text-xs font-semibold">
                        {project.progress}%
                    </span>
                </div>

                <ProgressBar
                    value={project.progress}
                />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="
                        flex items-center gap-1
                        text-xs text-muted-foreground
                    ">
                        <ListTodo size={15} />
                        {project.tasks_count ?? 0} Tasks
                    </span>

                    <span className="
                        flex items-center gap-1
                        text-xs text-muted-foreground
                    ">
                        <Users size={15} />
                        {project.member_count ?? 0} members
                    </span>
                </div>

                <div className="
                    flex shrink-0 items-center gap-1.5
                    text-xs text-muted-foreground
                ">
                    <Calendar size={12} />

                    <span>
                        {project.due_date
                            ? project.due_date.slice(5)
                            : "-"}
                    </span>
                </div>
            </div>
        </div>
    );
}