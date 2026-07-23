"use client";

import {
    WorkspaceDashboard,
    WorkspaceOverviewSkeleton,
} from "@/features/workspaces/components";

import {
    useDetailWorkspace,
    useWorkspaceNavigation,
} from "../hooks";

interface WorkspaceOverviewProps {
    workspaceSlug: string;
}

export default function WorkspaceOverview({
    workspaceSlug,
}: WorkspaceOverviewProps) {

    const {
        workspace,
        isLoading,
        error,
        refetch,
    } = useDetailWorkspace(workspaceSlug);

    const {
        handleOpenProject,
        handleOpenMembers,
        handleOpenSetting,
    } = useWorkspaceNavigation();

    if (isLoading) {
        return <WorkspaceOverviewSkeleton />;
    }

    if (error || !workspace) {
        return (
            <div className="px-6 py-8 xl:px-8">
                <p className="text-sm text-destructive">
                    {error ??
                        "Workspace not found."}
                </p>
            </div>
        );
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceDashboard
                    workspace={workspace}
                    projects={[]}
                    onOpenProject={handleOpenProject}
                    onOpenMembers={handleOpenMembers}
                    onOpenSetting={handleOpenSetting}
                />
            </div>
        </div>
    )
}
