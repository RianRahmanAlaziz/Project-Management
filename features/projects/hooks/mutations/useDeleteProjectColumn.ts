"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { deleteProjectColumn } from "../../api/projectsColumnsApi";
import type { WorkflowColumn } from "../../types/workflow";

interface UseDeleteProjectColumnOptions {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useDeleteProjectColumn({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseDeleteProjectColumnOptions) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDeleteColumn = async (column: WorkflowColumn) => {
        if (isDeleting) {
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        const promise = deleteProjectColumn(
            workspaceSlug,
            projectSlug,
            column.id,
        )
            .then(async (response) => {
                await onSuccess?.();
                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setDeleteError(apiError.message);
                throw error;
            })
            .finally(() => {
                setIsDeleting(false);
            });

        toast.promise(promise, {
            loading: "Deleting column...",
            success: "Column deleted successfully.",
            error: (error) => {
                const apiError = parseApiError(error);

                return apiError.message;
            },
        });

        await promise;
    };

    return {
        handleDeleteColumn,
        isDeleting,
        deleteError,
    };
}