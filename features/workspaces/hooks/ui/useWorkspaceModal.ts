import { useState } from "react";

export function useWorkspaceModal() {
    // Create
    const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen,] = useState(false);
    // Delete
    const [isDeleteWorkspaceOpen, setIsDeleteWorkspaceOpen,] = useState(false);
    const [confirmDelete, setConfirmDelete,] = useState("");
    // Transfer ownership
    const [isTransferOwnershipOpen, setIsTransferOwnershipOpen,] = useState(false);

    return {
        create: {
            open: isCreateWorkspaceOpen,
            openModal: () => setIsCreateWorkspaceOpen(true),
            closeModal: () => setIsCreateWorkspaceOpen(false),
        },
        delete: {
            open: isDeleteWorkspaceOpen,
            confirmDelete,
            openModal: () => setIsDeleteWorkspaceOpen(true),
            closeModal: () => {
                setIsDeleteWorkspaceOpen(false);
                setConfirmDelete("");
            },
            setConfirmDelete,
        },

        transferOwnership: {
            open: isTransferOwnershipOpen,
            openModal: () => setIsTransferOwnershipOpen(true),
            closeModal: () => setIsTransferOwnershipOpen(false),
        },
    };
}