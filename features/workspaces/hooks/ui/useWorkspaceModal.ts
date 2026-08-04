import { useState } from "react";

export function useWorkspaceModal() {
    const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] =
        useState(false);

    const openCreateWorkspace = () =>
        setIsCreateWorkspaceOpen(true);

    const closeCreateWorkspace = () =>
        setIsCreateWorkspaceOpen(false);

    return {
        isCreateWorkspaceOpen,
        openCreateWorkspace,
        closeCreateWorkspace,
    };
}