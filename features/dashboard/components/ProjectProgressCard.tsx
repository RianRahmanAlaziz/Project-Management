"use client";

import { PROJECT_PROGRESS_DATA } from "@/features/dashboard/data/data";

interface ProjectProgressCardProps {
    onNavigate: (page: string) => void;
}

export function ProjectProgressCard({ onNavigate }: ProjectProgressCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-foreground">
                    Project Progress
                </p>

                <button
                    type="button"
                    onClick={() => onNavigate("projects")}
                    className="cursor-pointer text-sm text-primary hover:underline"
                >
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {PROJECT_PROGRESS_DATA.map((project) => (
                    <div key={project.name}>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="max-w-[180px] truncate text-sm text-foreground">
                                {project.name}
                            </span>

                            <span className="text-sm font-semibold text-foreground">
                                {project.value}%
                            </span>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${project.value}%`,
                                    background: project.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}