"use client";

import { useMemo } from "react";
import { PROJECTS } from "@/features/projects/mocks/projects";
import { WORKSPACES } from "@/features/workspaces/mocks/workspaces";

import {
    WorkspaceDashboard,
} from "@/features/workspaces/components";

interface WorkspaceOverviewProps {
    workspaceSlug: string;
}

export default function WorkspaceOverview({
    workspaceSlug,
}: WorkspaceOverviewProps) {

    const workspace = WORKSPACES.data.find(
        item => item.slug === workspaceSlug
    );

    const projects = useMemo(() => {
        if (!workspace) return [];
        return PROJECTS.data.filter(
            project =>
                project.workspace_id === workspace.id
        );
    }, [workspace]);

    const handleCreateProject = () => {
        console.log("Create Project");
    };

    const handleOpenMembers = () => {
        console.log("Open Members");
    };

    const handleonEdit = () => {
        console.log("Open Edit");
    };

    if (!workspace) {
        return null;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceDashboard
                    workspace={workspace}
                    projects={projects}
                    onCreateProject={handleCreateProject}
                    onOpenMembers={handleOpenMembers}
                    onEdit={handleonEdit}
                />
            </div>
        </div>
    )
}
