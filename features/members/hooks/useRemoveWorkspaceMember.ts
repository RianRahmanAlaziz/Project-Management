"use client";

import { useState } from "react";
import { toast } from "sonner";
import { removeWorkspaceMember } from "../api/workspaceMemberApi";

import type { WorkspaceMember } from "../types/workspaceMember";

import { parseApiError } from "@/lib/api/apiError";

interface UseRemoveWorkspaceMemberOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useRemoveWorkspaceMember({
    workspaceSlug,
    onSuccess,
}: UseRemoveWorkspaceMemberOptions) {
    const [isRemoving, setIsRemoving] = useState(false);

    const [removeError, setRemoveError] = useState<string | null>(null);

    const handleRemoveMember = async (
        member: WorkspaceMember,
    ): Promise<void> => {
        if (isRemoving) {
            return;
        }

        setIsRemoving(true);
        setRemoveError(null);

        const promise = removeWorkspaceMember(workspaceSlug, member.id)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError =
                    parseApiError(error);

                setRemoveError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsRemoving(false);
            });

        toast.promise(promise, {
            loading: "Removing member...",

            success: () => ({
                message: "Member removed",
                description:
                    `${member.user.name} has been removed from the workspace.`,
            }),

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return {
                    message: "Failed to remove member",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleRemoveMember,
        isRemoving,
        removeError,
    };
}