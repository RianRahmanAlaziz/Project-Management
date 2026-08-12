"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api/apiError";
import { removeProjectMember } from "../../api/projectMembersApi";
import { ProjectMember } from "../../types/projectMembers";

interface useRemoveProjectMemberOption {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => void | Promise<void>;
}

export function useRemoveProjectMember({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: useRemoveProjectMemberOption) {
    const [isRemoving, setIsRemoving] = useState(false);
    const [removeError, setRemoveError] = useState<string | null>(null);

    const handleRemoveMemberProject = async (
        member: ProjectMember,
    ): Promise<void> => {
        if (isRemoving) {
            return;
        }
        setIsRemoving(true);
        setRemoveError(null);

        const promise = removeProjectMember(workspaceSlug, projectSlug, member.id)
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
                    `${member.user.name} has been removed from the Project.`,
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
        handleRemoveMemberProject,
        isRemoving,
        removeError,
    };
}
