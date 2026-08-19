"use client";
import { toast } from "sonner";
import { useState } from 'react'
import { CreateTaskForm, Tasks } from '../../types/tasks';
import { createTask } from "../../api/tasksApi";
import { parseApiError } from "@/lib/api";


interface useCreateTaskOptions {
    workspaceSlug: string;
    projectSlug: string;

    onSuccess?: (task: Tasks) => void | Promise<void>;
}

export function useCreateTask({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: useCreateTaskOptions) {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const handleCreateTask = async (
        form: CreateTaskForm,
    ): Promise<Tasks | undefined> => {
        if (isCreating) {
            return;
        }
        setIsCreating(true);
        setCreateError(null);
        const promise = createTask(
            workspaceSlug,
            projectSlug,
            {
                title: form.title,
                description: form.description || undefined,
                column_id: Number(form.columnId),
                priority: form.priority || undefined,
                assignee_id: form.assigneeId
                    ? Number(form.assigneeId)
                    : null,
                start_date: form.startDate || null,
                due_date: form.dueDate || null,
            },
        )
            .then(async (response) => {
                await onSuccess?.(
                    response.data,
                );

                return response.data;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setCreateError(
                    apiError.message,
                );

                throw error;
            })
            .finally(() => {
                setIsCreating(false);
            });

        toast.promise(promise, {
            loading: "Creating task...",
            success: "Task created successfully.",
            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to create task",
                    description: apiError.message,
                };
            },
        });

        return promise;
    };

    return {
        handleCreateTask,
        isCreating,
        createError,
    }
}
