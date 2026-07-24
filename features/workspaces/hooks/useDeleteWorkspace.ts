"use client";

import { toast } from "sonner";
import { useState } from "react";
import { parseApiError } from "@/lib/api/apiError";
import { deleteWorkspace } from "../api/workspaceApi";

interface UseDeleteWorkspaceOptions {
    workspaceSlug: string;
    onSuccess?: () => Promise<void> | void;
}

export function useDeleteWorkspace({
    workspaceSlug,
    onSuccess,
}: UseDeleteWorkspaceOptions) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDeleteWorkspace = async (): Promise<void> => {
        if (isDeleting) {
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        const deletePromise = async () => {
            try {
                const response = await deleteWorkspace(
                    workspaceSlug,
                );
                await onSuccess?.();
                return response;
            } catch (error) {
                const apiError = parseApiError(error);
                setDeleteError(apiError.message);
                throw new Error(apiError.message);
            } finally {
                setIsDeleting(false);
            }
        };

        toast.promise(
            deletePromise(),
            {
                loading: "Deleting workspace...",
                success: "Workspace deleted successfully.",
                error: (error) =>
                    error instanceof Error
                        ? error.message
                        : "Failed to delete workspace.",
            },
        );
    };

    return {
        handleDeleteWorkspace,
        isDeleting,
        deleteError,
    };
}