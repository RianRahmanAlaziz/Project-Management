"use client";

import { useState } from "react";
import { toast } from "sonner";
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

        const promise = updateWorkspaceMemberRole(workspaceSlug, member.id, payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError =
                    parseApiError(error);

                setUpdateRoleError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsUpdatingRole(false);
            });

        toast.promise(promise, {
            loading: "Updating member role...",

            success: () => ({
                message: "Member role updated",
                description:
                    `${member.user.name}'s role has been changed to ${role.charAt(0).toUpperCase() +
                    role.slice(1)
                    }.`,
            }),

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return {
                    message: "Failed to update member role",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleUpdateRole,
        isUpdatingRole,
        updateRoleError,
    };
}