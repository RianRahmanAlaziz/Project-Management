"use client";

import {
    FolderOpen,
    Pencil,
    Users,
    Trash2,
    MoreHorizontal,
} from "lucide-react";
import clsx from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { Workspace } from "@/features/workspaces/types/workspace";
import { Button } from "@/components/ui";

interface ActionsMenuActionsMenuProps {
    workspace: Workspace;

    onOpenMembers?: (workspace: Workspace) => void;
    onEdit?: (workspace: Workspace) => void;
    onSettings?: (workspace: Workspace) => void;
}

export default function ActionsMenu({
    workspace,
    onOpenMembers,
    onEdit,
    onSettings,
}: ActionsMenuActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <MoreHorizontal size={17} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(workspace)
                    }}
                >
                    <Pencil size={16} />
                    Edit Workspace
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenMembers?.(workspace)
                    }}
                >
                    <Users size={16} />
                    Manage Members
                </DropdownMenuItem>

                {/* <DropdownMenuItem
                    onClick={() => onSettings?.(workspace)}
                >
                    <Settings size={16} />
                    Settings
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}