"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUsers } from "@/features/users/hooks";
import {
    WorkspaceGrid,
    WorkspaceSearch,
    WorkspaceHeader,
    WorkspaceFormModal,
    WorkspacesSkeleton,
} from "@/features/workspaces/components";

import {
    useWorkspaces,
    useWorkspaceSearch,
    useWorkspaceNavigation,
    useWorkspaceModal,
    useCreateWorkspaceWithMembers,
} from "@/features/workspaces/hooks";

export function WorkspacesView() {
    const { user } = useAuth();
    const {
        workspaces,
        isLoading,
        refetch,
    } = useWorkspaces();

    const {
        search,
        setSearch,
        filteredWorkspaces,
    } = useWorkspaceSearch(workspaces);

    const {
        handleOpenWorkspace,
        handleOpenMembers,
        handleOpenSetting,
        handleOpenProject,
    } = useWorkspaceNavigation();

    const workspaceModal = useWorkspaceModal();

    const {
        users,
    } = useUsers();

    const userOptions = users.filter(
        (users) => users.id !== user?.id,
    );

    const {
        handleCreateWorkspaceWithMembers,
        isSubmitting,
    } = useCreateWorkspaceWithMembers({
        onSuccess: async () => {
            await refetch();
            workspaceModal.create.closeModal();
        },
    });

    if (isLoading) {
        return <WorkspacesSkeleton />;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceHeader
                    OpenCreateWorkspace={workspaceModal.create.openModal}
                />

                <WorkspaceSearch
                    value={search}
                    onChange={setSearch}
                />

                <WorkspaceGrid
                    workspaces={filteredWorkspaces}
                    onOpenWorkspace={handleOpenWorkspace}
                    onOpenProjects={handleOpenProject}
                    onOpenMembers={handleOpenMembers}
                    onOpenSetting={handleOpenSetting}
                    OpenCreateWorkspace={workspaceModal.create.openModal}
                />
            </div>

            <WorkspaceFormModal
                open={workspaceModal.create.open}
                users={userOptions}
                isSubmitting={isSubmitting}
                onClose={workspaceModal.create.closeModal}
                onSubmit={handleCreateWorkspaceWithMembers}
            />

        </div>
    );
}