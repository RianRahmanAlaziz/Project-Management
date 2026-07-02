"use client";

import { Calendar, ListTodo, Users } from "lucide-react";
import {
    ProjectActionsMenu,
} from "@/features/projects/components";
import { Badge, ProgressBar } from "@/components/ui";
import { USERS } from "@/features/users/mocks/users";
import type { Projects } from "@/features/projects/types/projects";


const statusColors: Record<string, "indigo" | "yellow" | "green" | "gray"> = {
    "In Progress": "indigo",
    Review: "yellow",
    Done: "green",
    Todo: "gray",
};

const priorityColors: Record<string, string> = {
    High: "text-destructive",
    Medium: "text-warning",
    Low: "text-muted-foreground",
};


type ProjectCardProps = {
    workspaceSlug: string;
    project: Projects;
    onOpen?: (project: Projects) => void;
    onOpenMembers?: (project: Projects) => void;
    onEdit?: (project: Projects) => void;
    onDelete?: (project: Projects) => void;
};

export default function ProjectCard({
    workspaceSlug,
    project,
    onOpen,
    onOpenMembers,
    onEdit,
    onDelete,
}: ProjectCardProps) {

    const members = USERS.data.filter(user =>
        project.member_id.includes(user.id)
    );

    return (
        <div
            onClick={() => onOpen?.(project)}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div
                        className={`w-8 h-8 rounded-lg ${project.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                    >
                        {project.name[0]}
                    </div>

                    <div>
                        <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {project.total_tasks} tasks
                        </p>
                    </div>
                </div>

                <ProjectActionsMenu
                    project={project}
                    onOpen={onOpen}
                    onEdit={onEdit}
                    onOpenMembers={onOpenMembers}
                    onSettings={(workspace) => {
                        console.log("Settings", workspace.id);
                    }}
                    onDelete={onDelete}
                />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-3">
                <Badge
                    label={project.status}
                    color={statusColors[project.status] ?? "gray"}
                />

                <span
                    className={`text-xs font-medium ${priorityColors[project.priority]}`}
                >
                    {project.priority}
                </span>
            </div>

            {/* Progress */}
            <div className="mb-3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                        Progress
                    </span>

                    <span className="text-xs font-semibold">
                        {project.progress}%
                    </span>
                </div>

                <ProgressBar value={project.progress} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ListTodo size={15} />
                        {project.total_tasks} Tasks
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users size={15} />
                        {members.length} members
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                    <Calendar size={12} />
                    <span>{project.due_date.slice(5)}</span>
                </div>
            </div>
        </div>
    );
}