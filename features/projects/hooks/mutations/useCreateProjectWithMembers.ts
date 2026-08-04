"use client";

import { useState } from "react";
import { CreateProjectForm } from "../../types/projects";
import { AddProjectMemberPayload } from "../../types/projectMembers";
import { useCreateProject } from "./useCreateProject";
import { useAddProjectMember } from "./useAddProjectMember";

interface UseCreateProjectWithMembersOptions {
    workspaceSlug: string;
    onSuccess?: () => void | Promise<void>;
}


export function useCreateProjectWithMembers({
    workspaceSlug,
    onSuccess
}: UseCreateProjectWithMembersOptions) {
    const [isInviting, setIsInviting] = useState(false);

    const {
        handleCreateProject,
        isCreating,
        createError,
    } = useCreateProject({ workspaceSlug });

    const {
        handleAddProjectMember,
    } = useAddProjectMember({ workspaceSlug, showToast: false });

    const handleCreateProjectWithMembers = async (data: CreateProjectForm): Promise<void> => {
        const project = await handleCreateProject(data);

        if (!project) {
            return;
        }

        if (data.members.length === 0) {
            await onSuccess?.();
            return;
        }

        setIsInviting(true);

        try {
            await Promise.all(
                data.members.map((memberId) =>
                    handleAddProjectMember(
                        project.slug,
                        Number(memberId),
                    ),
                ),
            );

            await onSuccess?.();
        } finally {
            setIsInviting(false);
        }
    };
    return {
        handleCreateProjectWithMembers,
        isSubmitting: isCreating || isInviting,
        createError,
    }
}
