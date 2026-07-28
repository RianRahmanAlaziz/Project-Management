"use client";

import {
    UsersHeader,
    UsersSearch,
    UsersTable,
    UsersSkeleton,
    CreateUserModal,
    EditUserModal,
    ResetPasswordModal,
    DeleteUserModal
} from "../components";

import {
    useUsers,
    useUsersSearch,
    useUserModal,
    useCreateUser,
    useUpdateUser,
    useResetPassword,
    useDeleteUser,
} from "@/features/users/hooks";


export function UsersView() {
    const {
        users,
        isLoading,
        error,
        refetch,
    } = useUsers();

    const {
        search,
        setSearch,
        role,
        setRole,
        filteredUsers,
    } = useUsersSearch(users);

    const {
        create,
        edit,
        remove,
        resetPassword,
    } = useUserModal();

    const {
        handleCreateUser,
        isCreating,
    } = useCreateUser({
        onSuccess: async () => {
            await refetch();
            create.closeModal();
        },
    });

    const {
        handleUpdateUser,
        isUpdating,
    } = useUpdateUser({
        onSuccess: async () => {
            await refetch();
            edit.closeModal();
        },
    });

    const {
        handleResetPassword,
        isResetting,
    } = useResetPassword({
        onSuccess: async () => {
            await refetch();
            resetPassword.closeModal();
        },
    });

    const {
        handleDeleteUser,
        isDeleting,
    } = useDeleteUser({
        onSuccess: async () => {
            await refetch();
            remove.closeModal();
        },
    });

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="mb-5 w-full space-y-6">
                <UsersHeader
                    user={users}
                    onCreate={create.openModal}
                />
            </div>

            <div className="mb-4 border-b border-border" />

            {isLoading ? (
                <UsersSkeleton />
            ) : (
                <>
                    <UsersSearch
                        search={search}
                        role={role}
                        onSearchChange={setSearch}
                        onRoleChange={setRole}
                    />

                    <UsersTable
                        users={filteredUsers}
                        onEdit={edit.openModal}
                        onDelete={remove.openModal}
                        onResetPassword={resetPassword.openModal}
                    />
                </>
            )}

            <CreateUserModal
                open={create.open}
                onClose={create.closeModal}
                onConfirm={handleCreateUser}
                isSubmitting={isCreating}
            />

            <EditUserModal
                open={edit.open}
                user={edit.user}
                onClose={edit.closeModal}
                onConfirm={handleUpdateUser}
                isSubmitting={isUpdating}
            />

            <ResetPasswordModal
                open={resetPassword.open}
                user={resetPassword.user}
                onClose={resetPassword.closeModal}
                isSubmitting={isResetting}
                onConfirm={handleResetPassword}
            />

            <DeleteUserModal
                open={remove.open}
                user={remove.user}
                onClose={remove.closeModal}
                onConfirm={handleDeleteUser}
                isSubmitting={isDeleting}
            />
        </div>
    );
}