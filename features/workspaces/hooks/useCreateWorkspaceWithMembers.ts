"use client";

import { useState } from "react";
import { useCreateWorkspace } from "./useCreateWorkspace";

import {
    addWorkspaceMember,
} from "@/features/members/api/workspaceMemberApi";

import type {
    WorkspaceFormData,
} from "../types/workspace";

import type {
    AddWorkspaceMemberPayload,
} from "@/features/members/types/workspaceMember";

interface UseCreateWorkspaceWithMembersOptions {
    onSuccess?: () => void | Promise<void>;
}


export function useCreateWorkspaceWithMembers({
    onSuccess,
}: UseCreateWorkspaceWithMembersOptions = {}) {
    const [isInviting, setIsInviting] = useState(false);

    const {
        handleCreateWorkspace,
        isCreating,
        createError,
    } = useCreateWorkspace();

    const handleCreateWorkspaceWithMembers = async (data: WorkspaceFormData) => {
        const workspace = await handleCreateWorkspace(data);
        const invites = data.invites.filter(({ userId, role }) => userId && role);

        if (invites.length === 0) {
            await onSuccess?.();
            return;
        }

        setIsInviting(true);

        try {
            await Promise.all(
                invites.map((invite) => {
                    const payload: AddWorkspaceMemberPayload = {
                        user_id: Number(invite.userId),
                        role: invite.role,
                    };
                    console.log("Workspace:", workspace.slug);

                    console.log("Payload:", payload);
                    return addWorkspaceMember(
                        workspace.slug,
                        payload,
                    );
                }),
            );
            await onSuccess?.();
        } finally {
            setIsInviting(false);
        }
    };


    return {
        handleCreateWorkspaceWithMembers,
        isSubmitting: isCreating || isInviting,
        createError,
    };
}
