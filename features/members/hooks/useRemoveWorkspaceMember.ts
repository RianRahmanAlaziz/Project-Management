"use client";

import { useState } from "react";

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

        console.log({
            workspaceSlug,
            membershipId: member.id,
            userId: member.user.id,
        });

        setIsRemoving(true);
        setRemoveError(null);

        try {
            await removeWorkspaceMember(
                workspaceSlug,
                member.id,
            );

            await onSuccess?.();
        } catch (error) {
            const apiError =
                parseApiError(error);

            setRemoveError(
                apiError.message,
            );

            throw error;
        } finally {
            setIsRemoving(false);
        }
    };

    return {
        handleRemoveMember,
        isRemoving,
        removeError,
    };
}