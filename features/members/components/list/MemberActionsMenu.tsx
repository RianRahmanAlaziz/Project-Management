"use client";

import {
    MoreHorizontal,
    User,
    Shield,
    Mail,
    Trash2,
} from "lucide-react";

import clsx from "clsx";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { WorkspaceMember } from "@/features/members/types/workspaceMember";


interface MemberActionsMenuProps {
    member: WorkspaceMember;

    onView?: (member: WorkspaceMember) => void;
    onChangeRole?: (member: WorkspaceMember) => void;
    onResendInvite?: (member: WorkspaceMember) => void;
    onRemove?: (member: WorkspaceMember) => void;
}

export default function MemberActionsMenu({
    member,
    onView,
    onChangeRole,
    onResendInvite,
    onRemove,
}: MemberActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className={clsx(
                        "cursor-pointer",
                        "text-muted-foreground",
                        "hover:text-foreground",
                        "transition-colors"
                    )}
                >
                    <MoreHorizontal size={18} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => onView?.(member)}
                >
                    <User size={16} />
                    View Profile
                </DropdownMenuItem>

                {member.role !== "owner" && (
                    <>
                        <DropdownMenuItem
                            onClick={() =>
                                onChangeRole?.(member)
                            }
                        >
                            <Shield size={16} />
                            Change Role
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => onResendInvite?.(member)}
                        >
                            <Mail size={16} />
                            Resend Invite
                        </DropdownMenuItem>
                    </>
                )}



                {onResendInvite && (
                    <DropdownMenuItem
                        onClick={() =>
                            onResendInvite(member)
                        }
                    >
                        <Mail size={16} />
                        Resend Invite
                    </DropdownMenuItem>
                )}


                {member.role !== "owner" && (
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() =>
                                onRemove?.(member)
                            }
                            className=" text-destructive hover:bg-destructive/10 "
                        >
                            <Trash2 size={16} />
                            Remove Member
                        </DropdownMenuItem>
                    </>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    );
}