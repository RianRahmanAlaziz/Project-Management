"use client";

import { useState } from "react";
import type { Tasks } from "@/features/tasks/types/tasks";
import type { ProjectMember } from "@/features/projects/types/projectMembers";

type ProjectTaskModalState = {
    open: boolean;
    mode: "create" | "edit";
    task: Tasks | null;
    column: string;
};

type ProjectMemberModalState = {
    open: boolean;
    member: ProjectMember | null;
};

const INITIAL_TASK_STATE: ProjectTaskModalState = {
    open: false,
    mode: "create",
    task: null,
    column: "",
};

const INITIAL_MEMBER_STATE: ProjectMemberModalState = {
    open: false,
    member: null,
};

export function useProjectModals() {
    // Project
    const [createProjectOpen, setCreateProjectOpen] = useState(false);

    // Invite Member
    const [inviteMemberOpen, setInviteMemberOpen] = useState(false);

    // Change Role
    const [changeRoleModal, setChangeRoleModal] =
        useState<ProjectMemberModalState>(
            INITIAL_MEMBER_STATE,
        );

    // Remove Member
    const [removeMemberModal, setRemoveMemberModal] =
        useState<ProjectMemberModalState>(
            INITIAL_MEMBER_STATE,
        );

    // Task
    const [taskModal, setTaskModal] =
        useState<ProjectTaskModalState>(
            INITIAL_TASK_STATE,
        );

    return {
        project: {
            createOpen: createProjectOpen,

            openCreate: () =>
                setCreateProjectOpen(true),

            closeCreate: () =>
                setCreateProjectOpen(false),
        },

        member: {
            inviteOpen: inviteMemberOpen,

            openInvite: () =>
                setInviteMemberOpen(true),

            closeInvite: () =>
                setInviteMemberOpen(false),

            changeRole: {
                modal: changeRoleModal,

                open: (member: ProjectMember) =>
                    setChangeRoleModal({
                        open: true,
                        member,
                    }),

                close: () =>
                    setChangeRoleModal(
                        INITIAL_MEMBER_STATE,
                    ),
            },

            remove: {
                modal: removeMemberModal,

                open: (member: ProjectMember) =>
                    setRemoveMemberModal({
                        open: true,
                        member,
                    }),

                close: () =>
                    setRemoveMemberModal(
                        INITIAL_MEMBER_STATE,
                    ),
            },
        },

        task: {
            modal: taskModal,

            openCreate: (column = "") =>
                setTaskModal({
                    open: true,
                    mode: "create",
                    task: null,
                    column,
                }),

            openEdit: (
                task: Tasks,
                column = "",
            ) =>
                setTaskModal({
                    open: true,
                    mode: "edit",
                    task,
                    column,
                }),

            close: () =>
                setTaskModal(
                    INITIAL_TASK_STATE,
                ),
        },
    };
}