"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { Badge, ProgressBar } from "@/components/ui";

import type { Projects } from "@/features/projects/types/projects";

type WorkspaceRecentProjectsProps = {
    workspaceSlug: string;
    projects: Projects[];
};

const statusColors: Record<
    string,
    "indigo" | "yellow" | "green" | "gray"
> = {
    "In Progress": "indigo",
    Review: "yellow",
    Done: "green",
    Todo: "gray",
};

export default function WorkspaceRecentProjects({
    workspaceSlug,
    projects,
}: WorkspaceRecentProjectsProps) {
    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Projects
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Recently updated projects
                    </p>
                </div>
                <Link
                    href={`/workspaces/${workspaceSlug}/projects`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    View all
                    <ArrowRight size={15} />
                </Link>
            </div>
            <div className="divide-y divide-border">
                {projects.slice(0, 4).map((project) => (
                    <Link
                        key={project.id}
                        href={`/workspaces/${workspaceSlug}/projects/${project.slug}`}
                        className="block p-5 transition-colors hover:bg-muted/40"
                    >
                        <div className="flex items-center justify-between gap-5">
                            <div className="flex flex-1 items-center gap-4">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${project.color}`}
                                >
                                    {project.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                {project.name}
                                            </h3>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Badge
                                                    label={project.status}
                                                    color={
                                                        statusColors[project.status]
                                                        ?? "gray"
                                                    }
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {project.total_tasks} Tasks
                                                </span>
                                            </div>
                                        </div>
                                        <div className="min-w-35 text-right">
                                            <p className="text-sm font-semibold">
                                                {project.progress}%
                                            </p>
                                            <div className="mt-2">
                                                <ProgressBar
                                                    value={project.progress}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Updated 2 hours ago
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar size={13} />
                                            {project.due_date?.slice(5) ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}