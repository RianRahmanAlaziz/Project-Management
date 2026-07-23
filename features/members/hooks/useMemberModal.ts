"use client";

import { useState } from "react";

import type {
    WorkspaceMember,
} from "../types/workspaceMember";

interface MemberModalState {
    open: boolean;
    member: WorkspaceMember | null;
}

const INITIAL_MEMBER_MODAL: MemberModalState = {
    open: false,
    member: null,
};

export function useMemberModal() {
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

    const [roleModal, setRoleModal] = useState<MemberModalState>(INITIAL_MEMBER_MODAL,);

    const [removeModal, setRemoveModal] = useState<MemberModalState>(INITIAL_MEMBER_MODAL);

    const handleOpenAddMember = () => {
        setAddMemberModalOpen(true);
    };

    const handleCloseAddMember = () => {
        setAddMemberModalOpen(false);
    };

    const handleOpenRoleModal = (
        member: WorkspaceMember,
    ) => {
        setRoleModal({
            open: true,
            member,
        });
    };

    const handleCloseRoleModal = () => {
        setRoleModal({
            open: false,
            member: null,
        });
    };

    const handleOpenRemoveModal = (
        member: WorkspaceMember,
    ) => {
        setRemoveModal({
            open: true,
            member,
        });
    };

    const handleCloseRemoveModal = () => {
        setRemoveModal({
            open: false,
            member: null,
        });
    };

    return {
        addMemberModalOpen,
        roleModal,
        removeModal,

        handleOpenAddMember,
        handleCloseAddMember,

        handleOpenRoleModal,
        handleCloseRoleModal,

        handleOpenRemoveModal,
        handleCloseRemoveModal,
    };
}