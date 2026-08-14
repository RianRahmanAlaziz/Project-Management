"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { Tasks, UpdateTaskPayload } from "../../types/tasks";
import { updateTask } from "../../api/tasksApi";
import { ApiResponse } from "@/lib/api";


interface UseUpdateTaskOptions {
    workspaceSlug: string;
    projectSlug: string;

    onSuccess?: (task: Tasks) => void | Promise<void>;
}

export function useUpdateTask({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseUpdateTaskOptions) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const handleUpdateTask = async (
        taskId: number,
        payload: UpdateTaskPayload,
    ): Promise<ApiResponse<Tasks> | undefined> => {
        if (isUpdating) {
            return;
        }

        setIsUpdating(true);
        setUpdateError(null);

        const promise = updateTask(
            workspaceSlug,
            projectSlug,
            taskId,
            payload,
        )
            .then(async (response) => {
                await onSuccess?.(
                    response.data,
                );

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
            loading: "Updating task...",
            success: "Task updated successfully.",
            error: (error) => {
                const apiError = parseApiError(error);
                return {
                    message: "Failed to update task",
                    description:
                        apiError.message,
                };
            },
        });

        return promise;
    };

    return {
        handleUpdateTask,
        isUpdating,
        updateError,
    };
}