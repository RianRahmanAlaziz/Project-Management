"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createWorkspace as createWorkspaceRequest } from "../api/workspaceApi";

import type {
    CreateWorkspacePayload,
    WorkspaceFormData,
} from "../types/workspace";

import { parseApiError } from "@/lib/api/apiError";

interface UseCreateWorkspaceOptions {
    onSuccess?: () => void | Promise<void>;
}

export function useCreateWorkspace({
    onSuccess,
}: UseCreateWorkspaceOptions = {}) {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const handleCreateWorkspace = async (
        data: WorkspaceFormData,
    ): Promise<void> => {
        if (isCreating) {
            return;
        }

        const payload: CreateWorkspacePayload = {
            name: data.name.trim(),
            description:
                data.description.trim() || undefined,
            color: data.color,
        };

        setIsCreating(true);
        setCreateError(null);

        const promise = createWorkspaceRequest(payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError =
                    parseApiError(error);

                setCreateError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsCreating(false);
            });

        toast.promise(promise, {
            loading: "Creating workspace...",

            success: () => ({
                message: "Workspace created",
                description:
                    `${payload.name} has been created successfully.`,
            }),

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return {
                    message: "Failed to create workspace",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleCreateWorkspace,
        isCreating,
        createError,
    };
}