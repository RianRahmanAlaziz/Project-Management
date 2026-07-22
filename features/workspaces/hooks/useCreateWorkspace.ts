"use client";

import { useState } from "react";

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
    const [isCreating, setIsCreating] =
        useState(false);

    const [createError, setCreateError] =
        useState<string | null>(null);

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

        try {
            await createWorkspaceRequest(payload);

            await onSuccess?.();
        } catch (error) {
            const apiError =
                parseApiError(error);

            setCreateError(apiError.message);

            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    return {
        handleCreateWorkspace,
        isCreating,
        createError,
    };
}