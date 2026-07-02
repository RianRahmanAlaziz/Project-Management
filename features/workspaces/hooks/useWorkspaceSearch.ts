import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Workspace } from "../types/workspace";

export function useWorkspaceSearch<T extends { name: string }>(
    workspaces: T[],
) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const filteredWorkspaces = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return workspaces;
        }

        return workspaces.filter((workspace) =>
            workspace.name.toLowerCase().includes(keyword),
        );
    }, [search, workspaces]);

    const handleOpenProjects = (workspace: Workspace) => {
        router.push(
            `/workspaces/${workspace.slug}`
        );
    };

    const handleOpenMembers = (workspace: Workspace) => {
        router.push(
            `/workspaces/${workspace.slug}/members`
        );
    };

    const [workspaceModal, setWorkspaceModal] = useState<{
        open: boolean;
        mode: "create" | "edit";
        workspace: Workspace | null;
    }>({
        open: false,
        mode: "create",
        workspace: null,
    });

    const handleCreateWorkspace = () => {
        setWorkspaceModal({
            open: true,
            mode: "create",
            workspace: null,
        });
    };

    const handleEditWorkspace = (workspace: Workspace) => {
        setWorkspaceModal({
            open: true,
            mode: "edit",
            workspace,
        });
    };

    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        workspace: Workspace | null;
    }>({
        open: false,
        workspace: null,
    });

    const handleDeleteWorkspace = (
        workspace: Workspace
    ) => {
        setDeleteModal({
            open: true,
            workspace,
        });
    };


    return {
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
    };
}