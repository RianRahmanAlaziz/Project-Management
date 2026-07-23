"use client";

import { useState } from "react";
import { toast } from "sonner";
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

        const promise = addWorkspaceMember(workspaceSlug, payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError =
                    parseApiError(error);

                setAddError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsAdding(false);
            });

        toast.promise(promise, {
            loading: "Adding member...",
            success: "Member added successfully.",
            error: (error) => {
                const apiError =
                    parseApiError(error);

                return apiError.message;
            },
        });

        await promise;
    };

    return {
        handleAddMember,
        isAdding,
        addError,
    };
}