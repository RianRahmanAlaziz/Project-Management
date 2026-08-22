"use client";

import { useState } from "react";

import type {
    ReorderTaskPayload,
    Tasks,
} from "@/features/tasks/types/tasks";
import { reorderTasks } from "../../api/tasksApi";
import { ApiResponse, parseApiError } from "@/lib/api";

interface UseReorderTasksOptions {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: (task: Tasks) => void | Promise<void>;
}

export function useReorderTasks({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseReorderTasksOptions) {
    const [isReordering, setIsReordering] = useState(false);
    const [reorderError, setReorderError] = useState<string | null>(null);

    const handleReorderTasks = async (
        payload: ReorderTaskPayload
    ): Promise<ApiResponse<Tasks> | undefined> => {
        if (isReordering) {
            return;
        }

        setIsReordering(true);
        setReorderError(null);

        const promise = reorderTasks(
            workspaceSlug,
            projectSlug,
            payload,
        ).then(async (response) => {
            await onSuccess?.(response.data);
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

        return promise;
    };

    return {
        handleReorderTasks,
        isReordering,
        reorderError,
    };
}