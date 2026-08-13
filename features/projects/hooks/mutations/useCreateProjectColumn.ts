"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { createProjectColumn } from "../../api/projectsColumnsApi";

interface UseCreateProjectColumnOptions {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useCreateProjectColumn({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseCreateProjectColumnOptions) {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const handleCreateColumn = async (data: {
        name: string;
        color?: string;
    }) => {
        if (isCreating) {
            return;
        }

        setIsCreating(true);
        setCreateError(null);

        const promise = createProjectColumn(
            workspaceSlug,
            projectSlug,
            data,
        )
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setCreateError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsCreating(false);
            });

        toast.promise(promise, {
            loading: "Creating column...",
            success: "Column created successfully.",
            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to create column",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleCreateColumn,
        isCreating,
        createError,
    };
}