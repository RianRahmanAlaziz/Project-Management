import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";


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

    const handleOpenWorkspace = (workspace: any) => {
        router.push(
            `/dashboard/projects?workspace=${workspace.id}`
        );
    };

    const [workspaceModal, setWorkspaceModal] = useState<{
        open: boolean;
        mode: "create" | "edit";
        workspace: any;
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

    const handleEditWorkspace = (workspace: any) => {
        setWorkspaceModal({
            open: true,
            mode: "edit",
            workspace,
        });
    };

    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        workspace: any | null;
    }>({
        open: false,
        workspace: null,
    });

    const handleDeleteWorkspace = (
        workspace: any
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
        handleOpenWorkspace,
        workspaceModal,
        setWorkspaceModal,
        handleCreateWorkspace,
        handleEditWorkspace,
        deleteModal,
        setDeleteModal,
        handleDeleteWorkspace,
    };
}