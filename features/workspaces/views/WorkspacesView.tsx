"use client";

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
} from "@/features/workspaces/hooks";

export function WorkspacesView() {

    const {
        workspaces,
        isLoading,
        refetch,
    } = useWorkspaces();

    const {
        handleCreateWorkspace,
        isCreating,
        createError,
    } = useCreateWorkspace({
        onSuccess: async () => {
            await refetch();

            setWorkspaceModal((prev) => ({
                ...prev,
                open: false,
            }));
        },
    });

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
        workspaceModal,
        setWorkspaceModal,
        OpenCreateWorkspace,
    } = useWorkspaceModal();

    if (isLoading) {
        return <WorkspacesSkeleton />;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceHeader
                    OpenCreateWorkspace={OpenCreateWorkspace}
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
                    OpenCreateWorkspace={OpenCreateWorkspace}
                />
            </div>

            <WorkspaceFormModal
                open={workspaceModal.open}
                mode={workspaceModal.mode}
                workspace={workspaceModal.workspace}
                onClose={() =>
                    setWorkspaceModal((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
                onSubmit={handleCreateWorkspace}
            />

        </div>
    );
}