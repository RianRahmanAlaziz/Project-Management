"use client";

import { useState } from "react";
import type { Tasks } from "@/features/tasks/types/tasks";
import type { ProjectMember } from "@/features/projects/types/projectMembers";
import { WorkflowColumn } from "../../types/workflow";

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

type WorkflowColumnModalState = {
    open: boolean;
    mode: "create" | "edit";
    column: WorkflowColumn | null;
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

const INITIAL_WORKFLOW_COLUMN_MODAL: WorkflowColumnModalState = {
    open: false,
    mode: "create",
    column: null,
};

export function useProjectModals() {
    // Project
    const [createProjectOpen, setCreateProjectOpen] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState("");
    const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
    // Invite Member
    const [inviteMemberOpen, setInviteMemberOpen] = useState(false);

    // Change Role
    const [changeRoleModal, setChangeRoleModal] = useState<ProjectMemberModalState>(
        INITIAL_MEMBER_STATE,
    );

    // Remove Member
    const [removeMemberModal, setRemoveMemberModal] = useState<ProjectMemberModalState>(
        INITIAL_MEMBER_STATE,
    );

    // Task
    const [taskModal, setTaskModal] = useState<ProjectTaskModalState>(
        INITIAL_TASK_STATE,
    );
    // Workflow Column
    const [createWorkflowColumnOpen, setCreateWorkflowColumnOpen] = useState(false);

    const [workflowColumnModal, setWorkflowColumnModal] = useState<WorkflowColumnModalState>(
        INITIAL_WORKFLOW_COLUMN_MODAL,
    );

    return {
        project: {
            createOpen: createProjectOpen,
            openCreate: () => setCreateProjectOpen(true),
            closeCreate: () => setCreateProjectOpen(false),

            deleteOpen: deleteProjectOpen,
            confirmDelete,
            openDelete: () => setDeleteProjectOpen(true),
            closeDelete: () => {
                setDeleteProjectOpen(false);
                setConfirmDelete("");
            },
            setConfirmDelete
        },

        member: {
            inviteOpen: inviteMemberOpen,
            openInvite: () => setInviteMemberOpen(true),
            closeInvite: () => setInviteMemberOpen(false),

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

        workflow: {
            modal: workflowColumnModal,
            openCreate: () => setWorkflowColumnModal({
                open: true,
                mode: "create",
                column: null,
            }),

            openEdit: (column: WorkflowColumn) => setWorkflowColumnModal({
                open: true,
                mode: "edit",
                column,
            }),

            close: () => setWorkflowColumnModal(
                INITIAL_WORKFLOW_COLUMN_MODAL,
            ),
        },
    };
}