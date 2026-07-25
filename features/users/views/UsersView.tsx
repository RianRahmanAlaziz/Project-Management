"use client";

import { useMemo, useState } from "react";

import {
    UsersHeader,
    UsersSearch,
    UsersTable,
} from "../components";

import CreateUserModal, {
    CreateUserForm,
} from "../components/modal/CreateUserModal";

import EditUserModal, {
    EditUserForm,
} from "../components/modal/EditUserModal";

import ResetPasswordModal, {
    ResetPasswordForm
} from "../components/modal/ResetPasswordModal";

import DeleteUserModal from "../components/modal/DeleteUserModal";

import { USERS } from "../mocks/users";
import type { Users } from "../types/users";


export function UsersView() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return USERS.filter((user) => {
            const matchesSearch =
                !query ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query);

            const matchesRole =
                !role || user.role === role;

            return matchesSearch && matchesRole;
        });
    }, [search, role]);

    const handleCreate = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreate = () => {
        setOpenCreateModal(false);
    };

    const handleSubmitCreate = async (
        data: CreateUserForm,
    ) => {
        console.log("Create User:", data);

        // TODO: API Create User

        setOpenCreateModal(false);
    };

    // EDIT

    const handleEdit = (user: Users) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };

    const handleSubmitEdit = async (
        data: EditUserForm,
    ) => {
        console.log("Edit", data);

        setOpenEditModal(false);
        setSelectedUser(null);
    };

    // DELETE

    const handleDelete = (user: Users) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };

    const handleSubmitDelete = async () => {
        console.log("Delete", selectedUser);

        setOpenDeleteModal(false);
        setSelectedUser(null);
    };

    const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

    const handleResetPassword = (
        user: Users,
    ) => {
        setSelectedUser(user);
        setOpenResetPasswordModal(true);
    };

    const handleSubmitResetPassword = async (
        data: ResetPasswordForm,
    ) => {
        console.log(
            "Reset Password",
            selectedUser,
            data,
        );

        setOpenResetPasswordModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="mb-5 w-full space-y-6">
                <UsersHeader
                    user={USERS}
                    onCreate={handleCreate}
                />
            </div>

            <div className="mb-4 border-b border-border" />

            <UsersSearch
                search={search}
                role={role}
                onSearchChange={setSearch}
                onRoleChange={setRole}
            />

            <UsersTable
                users={filteredUsers}
                onResetPassword={handleResetPassword}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CreateUserModal
                open={openCreateModal}
                onClose={handleCloseCreate}
                onConfirm={handleSubmitCreate}
            />

            <EditUserModal
                open={openEditModal}
                user={
                    selectedUser
                        ? {
                            name: selectedUser.name,
                            email: selectedUser.email,
                            role: selectedUser.role,
                        }
                        : null
                }
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedUser(null);
                }}
                onConfirm={handleSubmitEdit}
            />

            <ResetPasswordModal
                open={openResetPasswordModal}
                user={selectedUser}
                onClose={() => {
                    setOpenResetPasswordModal(false);
                    setSelectedUser(null);
                }}
                onConfirm={
                    handleSubmitResetPassword
                }
            />

            <DeleteUserModal
                open={openDeleteModal}
                user={selectedUser}
                onClose={() => {
                    setOpenDeleteModal(false);
                    setSelectedUser(null);
                }}
                onConfirm={handleSubmitDelete}
            />

        </div>
    );
}