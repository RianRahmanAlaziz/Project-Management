"use client";

import {
    Eye,
    Shield,
    Trash2,
    MoreHorizontal,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui";

import { ProjectMember } from "@/features/projects/types/projectMembers";

interface ProjectMemberActionsMenuProps {
    member: ProjectMember;
    onRole?: (member: ProjectMember) => void;
    onRemove?: (member: ProjectMember) => void;
}

export default function ProjectMemberActionsMenu({
    member,
    onRemove,
    onRole,
}: ProjectMemberActionsMenuProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-lg p-2 hover:bg-muted cursor-pointer">
                    <MoreHorizontal size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => onRole?.(member)}
                >
                    <Shield size={16} />
                    Change Role
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onRemove?.(member)}
                >
                    <Trash2 size={16} />
                    Remove Member
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );
}