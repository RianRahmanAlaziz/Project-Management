import { useState } from "react";
import type { Workspace } from "../types/workspace";

export function useWorkspaceModal() {
    const [
        workspaceModal,
        setWorkspaceModal,

    ] = useState<{
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

    return {
        workspaceModal,
        setWorkspaceModal,
        handleCreateWorkspace,
    };
}