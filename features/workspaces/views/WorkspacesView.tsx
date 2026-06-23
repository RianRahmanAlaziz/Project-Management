"use client";


import {
    ACTIVITIES,
    USERS,
    WORKSPACES,
} from "@/data/data";
import { ActivityFeedCard } from "../components/ActivityFeedCard";
import { TeamMembersCard } from "../components/TeamMembersCard";
import { WorkspaceGrid } from "../components/WorkspaceGrid";
import { WorkspaceHeader } from "../components/WorkspaceHeader";
import { WorkspaceSearch } from "../components/WorkspaceSearch";
import { useWorkspaceSearch } from "../hooks/useWorkspaceSearch";
import WorkspaceFormModal from "../components/WorkspaceFormModal";
import DeleteWorkspaceModal from "../components/DeleteWorkspaceModal";

export function WorkspacesView() {
    const {
        search,
        setSearch,
        filteredWorkspaces,
        handleOpenWorkspace,
        workspaceModal,
        setWorkspaceModal,
        handleCreateWorkspace,
        handleEditWorkspace,
        deleteModal,
        setDeleteModal,
        handleDeleteWorkspace,
    } = useWorkspaceSearch(WORKSPACES);

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
                    onCreateWorkspace={handleCreateWorkspace}
                    onEditWorkspace={handleEditWorkspace}
                    onDeleteWorkspace={handleDeleteWorkspace}
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <TeamMembersCard members={USERS} />
                    <ActivityFeedCard activities={ACTIVITIES} />
                </div>
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