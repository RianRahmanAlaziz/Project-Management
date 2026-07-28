"use client";

import { useState } from "react";
import type { Users } from "../types/users";

interface UserModalState {
    open: boolean;
    user: Users | null;
}

const INITIAL_USER_MODAL: UserModalState = {
    open: false,
    user: null,
};

export function useUserModal() {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [editModal, setEditModal] = useState<UserModalState>(INITIAL_USER_MODAL);

    const [deleteModal, setDeleteModal] = useState<UserModalState>(INITIAL_USER_MODAL);

    const [
        resetPasswordModal,
        setResetPasswordModal,
    ] = useState<UserModalState>(
        INITIAL_USER_MODAL,
    );

    // CREATE

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
    };

    // EDIT

    const handleOpenEditModal = (user: Users) => {
        setEditModal({
            open: true,
            user,
        });
    };

    const handleCloseEditModal = () => {
        setEditModal(INITIAL_USER_MODAL);
    };

    // DELETE

    const handleOpenDeleteModal = (user: Users) => {
        setDeleteModal({
            open: true,
            user,
        });
    };

    const handleCloseDeleteModal = () => {
        setDeleteModal(INITIAL_USER_MODAL);
    };

    // RESET PASSWORD

    const handleOpenResetPasswordModal = (user: Users) => {
        setResetPasswordModal({
            open: true,
            user,
        });
    };

    const handleCloseResetPasswordModal = () => {
        setResetPasswordModal(
            INITIAL_USER_MODAL,
        );
    };

    return {
        create: {
            open: createModalOpen,
            openModal: handleOpenCreateModal,
            closeModal: handleCloseCreateModal,
        },

        edit: {
            ...editModal,
            openModal: handleOpenEditModal,
            closeModal: handleCloseEditModal,
        },

        remove: {
            ...deleteModal,
            openModal: handleOpenDeleteModal,
            closeModal: handleCloseDeleteModal,
        },

        resetPassword: {
            ...resetPasswordModal,
            openModal: handleOpenResetPasswordModal,
            closeModal: handleCloseResetPasswordModal,
        },
    };
}