"use client";

import { WORKSPACES } from "@/features/workspaces/mocks/workspaces";

import {
    WorkspaceGrid,
    WorkspaceSearch,
    WorkspaceHeader,
    WorkspaceFormModal,
    DeleteWorkspaceModal,
} from "@/features/workspaces/components";

import { useWorkspaceSearch } from "../hooks/useWorkspaceSearch";

export function WorkspacesView() {
    const {
        search,
        setSearch,
        filteredWorkspaces,
        handleOpenProjects,
        handleOpenMembers,
        workspaceModal,
        setWorkspaceModal,
        handleCreateWorkspace,
        handleEditWorkspace,
        deleteModal,
        setDeleteModal,
        handleDeleteWorkspace,
    } = useWorkspaceSearch(WORKSPACES.data);

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
                    onOpenProjects={handleOpenProjects}
                    onOpenMembers={handleOpenMembers}
                    onCreateWorkspace={handleCreateWorkspace}
                    onEditWorkspace={handleEditWorkspace}
                    onDeleteWorkspace={handleDeleteWorkspace}
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

            <DeleteWorkspaceModal
                open={deleteModal.open}
                workspace={deleteModal.workspace}
                onClose={() =>
                    setDeleteModal({
                        open: false,
                        workspace: null,
                    })
                }
                onConfirm={(workspace) => {
                    console.log(
                        "Delete Workspace",
                        workspace.id
                    );

                    // nanti:
                    // DELETE /api/v1/workspaces/{id}
                }}
            />
        </div>
    );
}