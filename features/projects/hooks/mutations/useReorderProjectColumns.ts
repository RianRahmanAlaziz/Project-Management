"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { reorderProjectColumns } from "../../api/projectsColumnsApi";

interface UseReorderProjectColumnsOptions {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useReorderProjectColumns({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseReorderProjectColumnsOptions) {
    const [isReordering, setIsReordering] = useState(false);
    const [reorderError, setReorderError] = useState<string | null>(null);

    const handleReorderColumns = async (
        columns: {
            id: number;
            position: number;
        }[],
    ) => {
        if (isReordering) {
            return;
        }

        setIsReordering(true);
        setReorderError(null);

        const promise = reorderProjectColumns(
            workspaceSlug,
            projectSlug,
            columns,
        )
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setReorderError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsReordering(false);
            });

        toast.promise(promise, {
            loading: "Saving workflow...",
            success: "Workflow updated successfully.",
            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to update workflow",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleReorderColumns,
        isReordering,
        reorderError,
    };
}