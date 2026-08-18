"use client";

import {
    WorkspaceDashboard,
    WorkspaceOverviewSkeleton,
} from "@/features/workspaces/components";

import {
    useDetailWorkspace,
    useWorkspaceNavigation,
} from "../hooks";

import {
    useCreateProjectWithMembers,
    useProjectModals,
    useProjects
} from "@/features/projects/hooks";

import { CreateProjectModal } from "@/features/projects/components";
import { useWorkspaceMembers } from "@/features/members/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface WorkspaceOverviewProps {
    workspaceSlug: string;
}

export default function WorkspaceOverview({
    workspaceSlug,
}: WorkspaceOverviewProps) {
    const { user } = useAuth();
    const { members } = useWorkspaceMembers(workspaceSlug);

    const userOptions = members.filter(
        (member) => member.user.id !== user?.id,
    );
    const {
        workspace,
        isLoading,
        error,
    } = useDetailWorkspace(workspaceSlug);

    const {
        projects,
        refetch: refetchProjects,
    } = useProjects(workspaceSlug);

    const {
        handleOpenProject,
        handleOpenMembers,
        handleOpenSetting,
    } = useWorkspaceNavigation();

    const {
        project
    } = useProjectModals();

    const {
        handleCreateProjectWithMembers,
        isSubmitting,
    } = useCreateProjectWithMembers({
        workspaceSlug,
        onSuccess: async () => {
            await refetchProjects();
            project.closeCreate();
        },
    });

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
                    projects={projects}
                    onCreateProject={project.openCreate}
                    onOpenProject={handleOpenProject}
                    onOpenMembers={handleOpenMembers}
                    onOpenSetting={handleOpenSetting}
                />
            </div>
            <CreateProjectModal
                open={project.createOpen}
                users={userOptions}
                workspaceName={workspace?.name ?? ""}
                onClose={project.closeCreate}
                onConfirm={handleCreateProjectWithMembers}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
