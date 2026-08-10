"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseApiError } from "@/lib/api/apiError";
import { Projects, UpdateProjectPayload } from "../../types/projects";
import { updateProject } from "../../api/projectsApi";


interface UseUpdateProjectOptions {
    workspaceSlug: string;
    projectSlug: string;

    onSuccess?: (
        project: Projects,
    ) => void | Promise<void>;
}

export function useUpdateProject({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseUpdateProjectOptions) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    const handleUpdateProject = async (
        payload: UpdateProjectPayload,
    ): Promise<void> => {
        if (isUpdating) {
            return;
        }

        setIsUpdating(true);
        setUpdateError(null);
        setIsSaved(false);

        const updatePromise = updateProject(
            workspaceSlug,
            projectSlug,
            payload,
        );

        toast.promise(updatePromise, {
            loading: "Updating project...",
            success: (response) => `${response.data.name} updated successfully.`,
            error: (error) => {
                const apiError = parseApiError(error);
                return apiError.message;
            },
        });

        try {
            const response = await updatePromise;
            setIsSaved(true);
            try {
                await onSuccess?.(response.data);
            } catch (error) {
                console.error(
                    "Project post-update action failed:",
                    error,
                );
            }
        } catch (error) {
            const apiError = parseApiError(error);
            setUpdateError(apiError.message);
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        handleUpdateProject,
        isUpdating,
        updateError,
        isSaved,
    };
}