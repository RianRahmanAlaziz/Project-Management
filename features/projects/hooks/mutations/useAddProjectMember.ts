"use client";

import { toast } from "sonner";
import { useState } from "react";
import { parseApiError } from "@/lib/api/apiError";
import { AddProjectMemberPayload } from "../../types/projectMembers";
import { addProjectMember } from "../../api/projectMembersApi";

interface UseAddProjectMemberOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
    showToast?: boolean;
}

export function useAddProjectMember({
    workspaceSlug,
    onSuccess,
    showToast = true,
}: UseAddProjectMemberOptions) {
    const [isAdding, setIsAdding] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);

    const handleAddProjectMember = async (
        projectSlug: string,
        userId: number,
    ): Promise<void> => {
        if (isAdding) {
            return;
        }
        const payload: AddProjectMemberPayload = {
            user_id: userId,
            role: "member",
        };
        setIsAdding(true);
        setAddError(null);

        const promise = addProjectMember(workspaceSlug, projectSlug, payload)
            .then(async () => {
                await onSuccess?.();
            })
            .catch((error) => {
                const apiError = parseApiError(error);
                setAddError(apiError.message);
                throw error;
            })
            .finally(() => {
                setIsAdding(false);
            });

        if (showToast) {
            toast.promise(promise, {
                loading: "Adding member...",
                success: () => ({
                    message: "Member Added",
                    description: "Project member has been added successfully.",
                }),
                error: (error) => {
                    const apiError =
                        parseApiError(error);

                    return apiError.message;
                },
            });
        }
        await promise;
    };

    return {
        handleAddProjectMember,
        isAdding,
        addError,
    }
}
