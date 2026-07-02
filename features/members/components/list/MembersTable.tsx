import React from 'react'
import { Avatar, Badge } from "@/components/ui";
import { Shield, Eye, UserCheck, Crown } from "lucide-react";
import type { Members } from "@/features/members/types/members";

import {
    MemberActionsMenu,
} from "@/features/members/components"

interface MembersTableProps {
    users: Members[];
    onChangeRole: (
        member: Members
    ) => void;
    onRemove: (
        member: Members
    ) => void;
}

const roleIcons: Record<string, React.ReactNode> = {
    Owner: <Crown size={18} />,
    Admin: <Shield size={18} />,
    Member: <UserCheck size={18} />,
    Viewer: <Eye size={18} />,
};

const roleColors: Record<string, "indigo" | "blue" | "green" | "gray"> = {
    Owner: "indigo",
    Admin: "blue",
    Member: "green",
    Viewer: "gray",
};

export default function MembersTable({
    users,
    onChangeRole,
    onRemove
}: MembersTableProps) {


    return (
        <>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left px-6 py-4 text-lg font-medium text-muted-foreground">
                                Member
                            </th>
                            <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                                Role
                            </th>
                            <th className="text-left px-6 py-4 text-lg font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                            <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                <td className="px-4 py-5">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={user.name} size="lg" />

                                        <div className="flex flex-col">
                                            <span className="text-base font-medium text-foreground">
                                                {user.name}
                                            </span>

                                            <span className="text-sm text-muted-foreground">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-5">
                                    <div className="flex justify-center">
                                        <Badge
                                            size="md"
                                            label={user.role}
                                            icon={roleIcons[user.role]}
                                            color={roleColors[user.role]}
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-5 hidden lg:table-cell">
                                    <span className="text-base text-muted-foreground">Jun 2026</span>
                                </td>
                                <td className="px-4 py-5">
                                    <div className="flex justify-center">
                                        <MemberActionsMenu
                                            member={user}
                                            onView={(member) => {
                                                console.log("View", member.id);
                                            }}
                                            onChangeRole={onChangeRole}
                                            onRemove={onRemove}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
