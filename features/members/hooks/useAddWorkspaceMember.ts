"use client";

import { useState } from "react";

import {
    addWorkspaceMember,
} from "../api/workspaceMemberApi";

import type {
    AddWorkspaceMemberPayload,
    WorkspaceMemberAssignableRole,
} from "../types/workspaceMember";

import {
    parseApiError,
} from "@/lib/api/apiError";

interface UseAddWorkspaceMemberOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useAddWorkspaceMember({
    workspaceSlug,
    onSuccess,
}: UseAddWorkspaceMemberOptions) {
    const [isAdding, setIsAdding] = useState(false);

    const [addError, setAddError] = useState<string | null>(null);

    const handleAddMember = async (
        userId: number,
        role: WorkspaceMemberAssignableRole,
    ): Promise<void> => {
        if (isAdding) {
            return;
        }

        const payload: AddWorkspaceMemberPayload = {
            user_id: userId,
            role,
        };

        setIsAdding(true);
        setAddError(null);

        try {
            await addWorkspaceMember(
                workspaceSlug,
                payload,
            );

            await onSuccess?.();
        } catch (error) {
            const apiError =
                parseApiError(error);

            setAddError(apiError.message);

            throw error;
        } finally {
            setIsAdding(false);
        }
    };

    return {
        handleAddMember,
        isAdding,
        addError,
    };
}