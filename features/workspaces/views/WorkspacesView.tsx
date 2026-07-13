"use client";

import { WORKSPACES } from "@/features/workspaces/mocks/workspaces";

import {
    WorkspaceGrid,
    WorkspaceSearch,
    WorkspaceHeader,
    WorkspaceFormModal,
} from "@/features/workspaces/components";

import {
    useWorkspaceSearch,
    useWorkspaceNavigation,
    useWorkspaceModal,
} from "../hooks";

export function WorkspacesView() {
    const {
        search,
        setSearch,
        filteredWorkspaces,
    } = useWorkspaceSearch(WORKSPACES.data);

    const {
        handleOpenWorkspace,
        handleOpenMembers,
        handleOpenSetting,
        handleOpenProject,
    } = useWorkspaceNavigation();

    const {
        workspaceModal,
        setWorkspaceModal,
        handleCreateWorkspace,
    } = useWorkspaceModal();

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceHeader
                    onCreateWorkspace={handleCreateWorkspace}
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
                    onCreateWorkspace={handleCreateWorkspace}
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
                onSubmit={(data) => {
                    if (workspaceModal.mode === "create") {
                        console.log("Create Workspace", data);
                    } else {
                        console.log("Update Workspace", data);
                    }
                }}
            />

        </div>
    );
}