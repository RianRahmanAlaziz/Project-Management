"use client";

import {
    ACTIVITIES,
    USERS,
    WORKSPACES,
} from "@/data/data";


import React, { useState } from "react";
import { Search, Shield, Eye, UserCheck, Crown } from "lucide-react";

import { MemberActionsMenu } from "../components/MemberActionsMenu";
import RemoveMemberModal from "../components/RemoveMemberModal";
import MemberRoleModal from "../components/MemberRoleModal";
import MembersHeader from "../components/MembersHeader";
import MembersTabs from "../components/MembersTabs";
import { MembersSearch } from "../components/MembersSearch";
import MembersTable from "../components/MembersTable";
import PermissionsTable from "../components/PermissionsTable";
import InviteTeamMember from "../components/InviteTeamMember";



export default function MembersView() {
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
