"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { updateProjectColumn } from "../../api/projectsColumnsApi";

interface UpdateProjectColumnData {
    name?: string;
    color?: string;
    enabled?: boolean;
}

interface UseUpdateProjectColumnOptions {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useUpdateProjectColumn({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseUpdateProjectColumnOptions) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const handleUpdateColumn = async (
        columnId: number,
        data: UpdateProjectColumnData,
    ) => {
        if (isUpdating) {
            return;
        }

        setIsUpdating(true);
        setUpdateError(null);

        const promise = updateProjectColumn(
            workspaceSlug,
            projectSlug,
            columnId,
            data,
        )
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setUpdateError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsUpdating(false);
            });

        toast.promise(promise, {
            loading: "Saving column...",
            success: "Column updated successfully.",
            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to update column",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleUpdateColumn,
        isUpdating,
        updateError,
    };
}