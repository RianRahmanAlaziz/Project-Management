"use client"

import { useState } from 'react'
import { toast } from "sonner";
import { parseApiError } from "@/lib/api/apiError";
import { CreateProjectForm, Projects, CreateProjectPayload } from '../../types/projects';
import { createProject as createProjectRequest } from '../../api/projectsApi';

interface UseCreateProjectOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useCreateProject({
    workspaceSlug,
    onSuccess,
}: UseCreateProjectOptions) {

    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const handleCreateProject = async (
        form: CreateProjectForm,
    ): Promise<Projects> => {

        const payload: CreateProjectPayload = {
            name: form.name.trim(),
            description: form.description.trim(),
            color: form.color.trim(),
            priority: form.priority.trim(),
            status: form.status.trim(),
            start_date: form.start_date.trim(),
            due_date: form.due_date.trim(),
        };

        setIsCreating(true);
        setCreateError(null);

        const promise = createProjectRequest(
            workspaceSlug,
            payload
        ).then(async (response) => {
            await onSuccess?.();

            return response.data;
        }).catch((error) => {
            const apiError =
                parseApiError(error);

            setCreateError(apiError.message);

            throw error;
        }).finally(() => {
            setIsCreating(false);
        });

        toast.promise(promise, {
            loading: "Creating Project...",
            success: () => ({
                message: "Project Created",
                description:
                    `${payload.name} has been Created successfully.`,
            }),

            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to create Project",
                    description: apiError.message,
                };
            },
        });

        return await promise;
    };

    return {
        handleCreateProject,
        isCreating,
        createError,
    };
}
