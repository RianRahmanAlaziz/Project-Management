import type { ReactNode } from "react";

import {
    Crown,
    Eye,
    Shield,
    UserCheck,
} from "lucide-react";

import {
    Avatar,
    Badge,
} from "@/components/ui";

import {
    MemberActionsMenu,
} from "@/features/members/components";

import type {
    WorkspaceMember,
} from "@/features/members/types/workspaceMember";

interface MembersTableProps {
    members: WorkspaceMember[];

    onChangeRole: (
        member: WorkspaceMember,
    ) => void;

    onRemove: (
        member: WorkspaceMember,
    ) => void;
}

const roleIcons: Record<string, ReactNode> = {
    owner: <Crown size={18} />,
    admin: <Shield size={18} />,
    member: <UserCheck size={18} />,
    viewer: <Eye size={18} />,
};

const roleColors: Record<
    string,
    "indigo" | "blue" | "green" | "gray"
> = {
    owner: "indigo",
    admin: "blue",
    member: "green",
    viewer: "gray",
};

function formatRole(role: string) {
    return (
        role.charAt(0).toUpperCase() +
        role.slice(1)
    );
}

function formatJoinedDate(
    date: string | null,
) {
    if (!date) {
        return "-";
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            year: "numeric",
        },
    ).format(new Date(date));
}

export default function MembersTable({
    members,
    onChangeRole,
    onRemove,
}: MembersTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-6 py-4 text-left text-lg font-medium text-muted-foreground">
                            Member
                        </th>

                        <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                            Role
                        </th>

                        <th className="hidden px-6 py-4 text-left text-lg font-medium text-muted-foreground lg:table-cell">
                            Joined
                        </th>

                        <th className="px-6 py-4 text-center text-lg font-medium text-muted-foreground">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {members.map((member) => (
                        <tr
                            key={member.id}
                            className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                        >
                            <td className="px-4 py-5">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        name={
                                            member.user.name
                                        }
                                        size="lg"
                                    />

                                    <div className="flex flex-col">
                                        <span className="text-base font-medium text-foreground">
                                            {
                                                member
                                                    .user
                                                    .name
                                            }
                                        </span>

                                        <span className="text-sm text-muted-foreground">
                                            {
                                                member
                                                    .user
                                                    .email
                                            }
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-5">
                                <div className="flex justify-center">
                                    <Badge
                                        size="md"
                                        label={formatRole(
                                            member.role,
                                        )}
                                        icon={
                                            roleIcons[
                                            member
                                                .role
                                            ]
                                        }
                                        color={
                                            roleColors[
                                            member
                                                .role
                                            ]
                                        }
                                    />
                                </div>
                            </td>

                            <td className="hidden px-4 py-5 lg:table-cell">
                                <span className="text-base text-muted-foreground">
                                    {formatJoinedDate(
                                        member.joined_at,
                                    )}
                                </span>
                            </td>

                            <td className="px-4 py-5">
                                <div className="flex justify-center">
                                    {member.role !== "owner" && (
                                        <MemberActionsMenu
                                            member={member}
                                            onView={(
                                                selectedMember,
                                            ) => {
                                                console.log(
                                                    "View",
                                                    selectedMember
                                                        .id,
                                                );
                                            }}
                                            onChangeRole={
                                                onChangeRole
                                            }
                                            onRemove={
                                                onRemove
                                            }
                                        />
                                    )}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}