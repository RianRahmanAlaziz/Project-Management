"use client";

import { useState } from "react";

import {
    RemoveMemberModal,
    MemberRoleModal,
    MembersHeader,
    MembersTabs,
    MembersSearch,
    MembersTable,
    PermissionsTable,
    InviteTeamMember,
} from "@/features/members/components";

import {
    useAddWorkspaceMember,
    useAvailableWorkspaceMembers,
    useMemberModal,
    useMemberSearch,
    useWorkspaceMembers,
    useUpdateWorkspaceMemberRole,
    useRemoveWorkspaceMember,
} from "../hooks";

import {
    MembersSkeleton,
} from "@/features/members/components";

type MembersViewProps = {
    workspaceSlug: string;
};

export default function MembersView({
    workspaceSlug,
}: MembersViewProps) {
    const [activeTab, setActiveTab] = useState<"members" | "permissions">("members");

    const {
        members,
        isLoading,
        refetch,
    } = useWorkspaceMembers(workspaceSlug);

    const {
        search,
        setSearch,
        filteredMembers,
    } = useMemberSearch(members);

    const {
        addMemberModalOpen,
        roleModal,
        removeModal,
        handleOpenAddMember,
        handleCloseAddMember,
        handleOpenRoleModal,
        handleCloseRoleModal,
        handleOpenRemoveModal,
        handleCloseRemoveModal,
    } = useMemberModal();

    const {
        users: availableUsers,
        isLoading: isLoadingAvailableUsers,
    } = useAvailableWorkspaceMembers(
        workspaceSlug,
        addMemberModalOpen,
    );

    const {
        handleAddMember,
        isAdding,
    } = useAddWorkspaceMember({
        workspaceSlug,
        onSuccess: async () => {
            await refetch();
            handleCloseAddMember();
        },
    });

    const {
        handleUpdateRole,
        isUpdatingRole,
    } = useUpdateWorkspaceMemberRole({
        workspaceSlug,
        onSuccess: async () => {
            await refetch();
            handleCloseRoleModal();
        },
    });

    const {
        handleRemoveMember,
        isRemoving,
    } = useRemoveWorkspaceMember({
        workspaceSlug,
        onSuccess: async () => {
            await refetch();
            handleCloseRemoveModal();
        },
    });

    if (isLoading) {
        return <MembersSkeleton />;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="mb-5 w-full space-y-6">
                <MembersHeader
                    onInviteMembers={handleOpenAddMember}
                />
            </div>

            <MembersTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "members" && (
                <>
                    <MembersSearch
                        value={search}
                        onChange={setSearch}
                    />

                    <MembersTable
                        members={filteredMembers}
                        onChangeRole={handleOpenRoleModal}
                        onRemove={handleOpenRemoveModal}
                    />
                </>
            )}

            {activeTab === "permissions" && (
                <PermissionsTable />
            )}

            <InviteTeamMember
                open={addMemberModalOpen}
                users={availableUsers}
                isLoadingUsers={
                    isLoadingAvailableUsers
                }
                isSubmitting={isAdding}
                onClose={handleCloseAddMember}
                onConfirm={handleAddMember}
            />

            <MemberRoleModal
                open={roleModal.open}
                member={roleModal.member}
                isSubmitting={isUpdatingRole}
                onClose={handleCloseRoleModal}
                onConfirm={handleUpdateRole}
            />

            <RemoveMemberModal
                open={removeModal.open}
                member={removeModal.member}
                isSubmitting={isRemoving}
                onClose={handleCloseRemoveModal}
                onConfirm={handleRemoveMember}
            />
        </div>
    );
}