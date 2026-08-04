"use client";

import Link from "next/link";
import {
    ArrowRight,
    Calendar,
    FolderOpen,
} from "lucide-react";

import {
    Badge,
    ProgressBar,
} from "@/components/ui";

import type {
    Projects,
} from "@/features/projects/types/projects";

import { getInitials } from "@/lib/utils/getInitials";
import { formatDate } from "@/lib/utils/formatDate";

const statusColors: Record<
    string,
    "blue" | "indigo" | "purple" | "green" | "gray"
> = {
    planning: "blue",
    in_progress: "indigo",
    review: "purple",
    done: "green",
};

const statusLabel: Record<string, string> = {
    planning: "Planning",
    in_progress: "In Progress",
    review: "Review",
    done: "Done",
};

interface WorkspaceRecentProjectsProps {
    workspaceSlug: string;
    projects: Projects[];
}

export default function WorkspaceRecentProjects({
    workspaceSlug,
    projects,
}: WorkspaceRecentProjectsProps) {
    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
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
                    className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                    View all

                    <ArrowRight size={15} />
                </Link>
            </div>

            <div className="divide-y divide-border">
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                            <FolderOpen
                                size={28}
                                className="text-muted-foreground"
                            />
                        </div>

                        <h3 className="text-base font-semibold text-foreground">
                            No projects yet
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                            This workspace doesn't have any projects yet.
                            Create your first project to start collaborating
                            with your team.
                        </p>
                    </div>
                ) : (
                    projects.slice(0, 3).map((project) => (
                        <Link
                            key={project.id}
                            href={`/workspaces/${workspaceSlug}/projects/${project.slug}`}
                            className="block p-5 transition-colors hover:bg-muted/40"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-m font-bold text-white ${project.color}`}
                                >
                                    {getInitials(project.name)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="min-w-0">
                                            <h3 className="truncate font-semibold text-foreground">
                                                {project.name}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <Badge
                                                    label={
                                                        statusLabel[
                                                        project.status
                                                        ] ??
                                                        project.status
                                                    }
                                                    color={
                                                        statusColors[
                                                        project.status
                                                        ] ??
                                                        "gray"
                                                    }
                                                />

                                                <span className="text-xs text-muted-foreground">
                                                    {project.tasks_count ?? 0}{" "}
                                                    Tasks
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-28 shrink-0">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-semibold">
                                                    {project.progress ?? 0}%
                                                </span>
                                            </div>

                                            <div className="mt-2">
                                                <ProgressBar
                                                    value={
                                                        project.progress ?? 0
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}