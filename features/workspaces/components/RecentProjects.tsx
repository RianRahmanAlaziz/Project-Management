"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { Badge, ProgressBar } from "@/components/ui";

import type { Project } from "@/features/projects/components/ProjectCard";

type RecentProjectsProps = {
    workspaceSlug: string;
    projects: Project[];
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

export default function RecentProjects({
    workspaceSlug,
    projects,
}: RecentProjectsProps) {
    return (
        <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Recent Projects
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
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">
                                    {project.name}
                                </h3>
                                <div className="mt-1 flex items-center gap-2">
                                    <Badge
                                        label={project.status}
                                        color={
                                            statusColors[
                                            project.status
                                            ] ?? "gray"
                                        }
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        {project.tasks} Tasks
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">
                                    {project.progress}%
                                </p>
                                <div className="mt-2 w-28">
                                    <ProgressBar
                                        value={project.progress}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                Updated 2 hours ago
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar size={13} />
                                {project.dueDate?.slice(5) ?? "-"}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}