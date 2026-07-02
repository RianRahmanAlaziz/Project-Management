"use client";

import {
    USERS,
} from "@/data/data";

import { useState } from "react";

import {
    RemoveMemberModal,
    MemberRoleModal,
    MembersHeader,
    MembersTabs,
    MembersSearch,
    MembersTable,
    PermissionsTable,
    InviteTeamMember
} from "@/features/members/components"

type MembersViewProps = {
    slug: string;
};

export default function MembersView({
    slug,
}: MembersViewProps) {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"members" | "permissions">("members");

    const filtered = USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const [roleModal, setRoleModal] = useState<{
        open: boolean;
        member: any | null;
    }>({
        open: false,
        member: null,
    });

    const [removeModal, setRemoveModal] = useState<{
        open: boolean;
        member: any | null;
    }>({
        open: false,
        member: null,
    });

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6 mb-5">
                <MembersHeader
                    onInviteMembers={() =>
                        setInviteModalOpen(true)
                    }
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
                        users={filtered}
                        onChangeRole={(member) =>
                            setRoleModal({
                                open: true,
                                member,
                            })
                        }
                        onRemove={(member) =>
                            setRemoveModal({
                                open: true,
                                member,
                            })
                        }
                    />
                </>
            )}

            {activeTab === "permissions" && (
                <PermissionsTable />
            )}

            <InviteTeamMember
                open={inviteModalOpen}
                onClose={() =>
                    setInviteModalOpen(false)
                }
                onConfirm={(email, role) => {
                    console.log(email, role);
                }}
            />

            <MemberRoleModal
                open={roleModal.open}
                member={roleModal.member}
                onClose={() =>
                    setRoleModal({
                        open: false,
                        member: null,
                    })
                }
                onConfirm={(member, role) => {
                    console.log(member.id, role);
                }}
            />

            <RemoveMemberModal
                open={removeModal.open}
                member={removeModal.member}
                onClose={() =>
                    setRemoveModal({
                        open: false,
                        member: null,
                    })
                }
                onConfirm={(member) => {
                    console.log("remove", member.id);
                }} />
        </div>
    )
}
