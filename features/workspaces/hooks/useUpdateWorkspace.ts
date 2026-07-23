"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api/apiError";
import { updateWorkspace } from "../api/workspaceApi";

import type {
    UpdateWorkspacePayload,
    Workspace,
} from "../types/workspace";


interface UseUpdateWorkspaceOptions {
    workspaceSlug: string;

    onSuccess?: (
        workspace: Workspace,
    ) => void | Promise<void>;
}

export function useUpdateWorkspace({
    workspaceSlug,
    onSuccess,
}: UseUpdateWorkspaceOptions) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    const handleUpdateWorkspace = async (
        payload: UpdateWorkspacePayload,
    ): Promise<void> => {
        if (isUpdating) {
            return;
        }

        setIsUpdating(true);
        setUpdateError(null);
        setIsSaved(false);

        const updatePromise = updateWorkspace(
            workspaceSlug,
            payload,
        );

        toast.promise(updatePromise, {
            loading: "Updating workspace...",

            success: (response) =>
                `${response.data.name} updated successfully.`,

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return apiError.message;
            },
        });

        try {
            const response =
                await updatePromise;

            setIsSaved(true);

            try {
                await onSuccess?.(
                    response.data,
                );
            } catch (error) {
                console.error(
                    "Workspace post-update action failed:",
                    error,
                );
            }
        } catch (error) {
            const apiError =
                parseApiError(error);

            setUpdateError(
                apiError.message,
            );

            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        handleUpdateWorkspace,
        isUpdating,
        updateError,
        isSaved,
    };
}