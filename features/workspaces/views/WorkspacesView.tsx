"use client";

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
    useCreateWorkspace,
    useCreateWorkspaceWithMembers,
} from "@/features/workspaces/hooks";

export function WorkspacesView() {

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

    const {
        isCreateWorkspaceOpen,
        openCreateWorkspace,
        closeCreateWorkspace,
    } = useWorkspaceModal();

    const {
        users,
    } = useUsers();

    const {
        handleCreateWorkspaceWithMembers,
        isSubmitting,
    } = useCreateWorkspaceWithMembers({
        onSuccess: async () => {
            await refetch();
            closeCreateWorkspace();
        },
    });

    if (isLoading) {
        return <WorkspacesSkeleton />;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceHeader
                    OpenCreateWorkspace={openCreateWorkspace}
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
                    OpenCreateWorkspace={openCreateWorkspace}
                />
            </div>

            <WorkspaceFormModal
                open={isCreateWorkspaceOpen}
                users={users}
                isSubmitting={isSubmitting}
                onClose={closeCreateWorkspace}
                onSubmit={handleCreateWorkspaceWithMembers}
            />

        </div>
    );
}