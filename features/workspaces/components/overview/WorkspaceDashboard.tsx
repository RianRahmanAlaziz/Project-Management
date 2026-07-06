"use client";

import {
    BarChart2,
    FolderOpen,
    ListTodo,
    Users,
} from "lucide-react";

import {
    WorkspaceHero,
    WorkspaceStats,
    WorkspaceRecentProjects,
    WorkspaceActivity,
} from "@/features/workspaces/components";

import type { Projects } from "@/features/projects/types/projects";
import type { Workspace } from "@/features/workspaces/types/workspace";

type WorkspaceDashboardProps = {
    workspace: Workspace;
    projects: Projects[];
    onCreateProject?: () => void;
    onOpenMembers?: () => void;
    onEdit?: () => void;
    onSettings?: () => void;
};

export default function WorkspaceDashboard({
    workspace,
    projects,
    onCreateProject,
    onOpenMembers,
    onEdit,
    onSettings,
}: WorkspaceDashboardProps) {
    return (
        <section className="space-y-6">
            <WorkspaceHero
                workspace={workspace}
                onCreateProject={onCreateProject}
                onOpenMembers={onOpenMembers}
                onEdit={onEdit}
                onSettings={onSettings}
            />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <WorkspaceStats
                    icon={<FolderOpen size={18} />}
                    label="Total Projects"
                    value={workspace.projects_count}
                    color="bg-indigo-500"
                />
                <WorkspaceStats
                    icon={<Users size={18} />}
                    label="Members"
                    value={workspace.members_count}
                    color="bg-blue-500"
                />
                <WorkspaceStats
                    icon={<ListTodo size={18} />}
                    label="Tasks This Week"
                    value={0}
                    color="bg-violet-500"
                />
                <WorkspaceStats
                    icon={<BarChart2 size={18} />}
                    label="Completion"
                    value="0%"
                    color="bg-success"
                />
            </div>

            <WorkspaceRecentProjects
                workspaceSlug={workspace.slug}
                projects={projects}
            />

            <WorkspaceActivity workspace={workspace} />
        </section >
    );
}