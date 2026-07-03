"use client";

import {
    BarChart2,
    BarChart3,
    BriefcaseBusiness,
    FolderOpen,
    ListTodo,
    Users,
} from "lucide-react";

import {
    WorkspaceHero,
    WorkspaceStats,
    RecentActivity,
    RecentProjects,
} from "@/features/workspaces/components";

import type { Projects } from "@/features/projects/types/projects";

import TeamPerformance from "@/features/dashboard/components/TeamPerformance";

type WorkspaceDashboardProps = {
    workspace: {
        name: string;
        slug: string;
        description: string;
        initials: string;
        color: string;
        visibility: "Public" | "Private";
        createdAt: string;
        projects: number;
        members: number;
        tasks: number;
        completion: number;
    };
    projects: Projects[];
    onCreateProject?: () => void;
    onSettings?: () => void;
};

export default function WorkspaceDashboard({
    workspace,
    projects,
    onCreateProject,
    onSettings,
}: WorkspaceDashboardProps) {
    return (
        <section className="space-y-6">
            <WorkspaceHero
                workspace={workspace}
                onCreateProject={onCreateProject}
                onSettings={onSettings}
            />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <WorkspaceStats
                    icon={<FolderOpen size={18} />}
                    label="Total Projects"
                    value={workspace.projects}
                    color="bg-indigo-500"
                />
                <WorkspaceStats
                    icon={<Users size={18} />}
                    label="Members"
                    value={workspace.members}
                    color="bg-blue-500"
                />
                <WorkspaceStats
                    icon={<ListTodo size={18} />}
                    label="Tasks This Week"
                    value={workspace.tasks}
                    color="bg-violet-500"
                />
                <WorkspaceStats
                    icon={<BarChart2 size={18} />}
                    label="Completion"
                    value={`${workspace.completion}%`}
                    color="bg-success"
                />
            </div>

            <TeamPerformance />

            <div className="grid gap-6 xl:grid-cols-5">
                <div className="xl:col-span-3">
                    <RecentProjects
                        workspaceSlug={workspace.slug}
                        projects={projects}
                    />
                </div>
                <div className="xl:col-span-2">
                    <RecentActivity />
                </div>
            </div>

        </section>
    );
}