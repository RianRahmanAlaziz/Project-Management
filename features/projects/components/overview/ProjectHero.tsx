"use client";

import {
    FolderOpen,
    SquareDashedKanban,
} from "lucide-react";
import { Button } from "@/components/ui";
import type { Projects } from "@/features/projects/types/projects";
import { WORKSPACES } from "@/features/workspaces/mocks/workspaces";

const statusColor: Record<string, string> = {
    Done: "text-success bg-green-50 dark:bg-green-950/30",
    "In Progress": "text-primary bg-indigo-50 dark:bg-indigo-950/30",
    Review: "text-warning bg-amber-50 dark:bg-amber-950/30",
    Todo: "text-muted-foreground bg-muted",
    Backlog: "text-muted-foreground bg-muted",
};

type ProjectHeroProps = {
    project: Projects;
    onCreateTasks?: () => void;
    onOpenBoard?: (project: Projects) => void;
};

export default function ProjectHero({
    project,
    onCreateTasks,
    onOpenBoard,
}: ProjectHeroProps) {
    const workspace = WORKSPACES.data.find(
        (item) => item.id === project.workspace_id
    );
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
                            <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${statusColor[project.status]}`}>{project.status}</span>
                            <span className={`text-sm font-semibold ${project.priority === "High" ? "text-destructive" : project.priority === "Medium" ? "text-warning" : "text-muted-foreground"}`}>
                                ● {project.priority} priority
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">{project.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {workspace?.name} · Started {project.start_date} · Due {project.due_date}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => onOpenBoard?.(project)}
                    >
                        <SquareDashedKanban size={16} />
                        Open Board
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onCreateTasks}
                    >
                        <FolderOpen size={16} />
                        Add Tasks
                    </Button>
                </div>
            </div>
        </div>
    )
}
