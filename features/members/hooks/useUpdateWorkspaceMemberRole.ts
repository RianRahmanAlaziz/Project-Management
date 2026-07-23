"use client";

import { useState } from "react";

import {
    updateWorkspaceMemberRole,
} from "../api/workspaceMemberApi";

import type {
    UpdateWorkspaceMemberRolePayload,
    WorkspaceMember,
    WorkspaceMemberAssignableRole,
} from "../types/workspaceMember";

import { parseApiError } from "@/lib/api/apiError";

interface UseUpdateWorkspaceMemberRoleOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useUpdateWorkspaceMemberRole({
    workspaceSlug,
    onSuccess,
}: UseUpdateWorkspaceMemberRoleOptions) {
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);

    const [updateRoleError, setUpdateRoleError] = useState<string | null>(null);

    const handleUpdateRole = async (
        member: WorkspaceMember,
        role: WorkspaceMemberAssignableRole,
    ): Promise<void> => {
        if (isUpdatingRole) {
            return;
        }

        const payload: UpdateWorkspaceMemberRolePayload = {
            role,
        };

        setIsUpdatingRole(true);
        setUpdateRoleError(null);

        try {
            await updateWorkspaceMemberRole(
                workspaceSlug,
                member.id,
                payload,
            );

            await onSuccess?.();
        } catch (error) {
            const apiError =
                parseApiError(error);

            setUpdateRoleError(
                apiError.message,
            );

            throw error;
        } finally {
            setIsUpdatingRole(false);
        }
    };

    return {
        handleUpdateRole,
        isUpdatingRole,
        updateRoleError,
    };
}