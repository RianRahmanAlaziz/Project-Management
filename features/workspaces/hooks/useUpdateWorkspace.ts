"use client";

import { useState } from "react";
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

        try {
            const response =
                await updateWorkspace(
                    workspaceSlug,
                    payload,
                );

            setIsSaved(true);

            await onSuccess?.(
                response.data,
            );
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