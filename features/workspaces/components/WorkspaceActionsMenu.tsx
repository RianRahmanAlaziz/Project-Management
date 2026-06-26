"use client";

import {
    FolderOpen,
    Pencil,
    Users,
    Settings,
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

interface WorkspaceActionsMenuProps {
    workspace: Workspace;

    onOpenProjects?: (workspace: Workspace) => void;
    onOpenMembers?: (workspace: Workspace) => void;
    onEdit?: (workspace: Workspace) => void;
    onSettings?: (workspace: Workspace) => void;
    onDelete?: (workspace: Workspace) => void;
}

export function WorkspaceActionsMenu({
    workspace,
    onOpenProjects,
    onOpenMembers,
    onEdit,
    onSettings,
    onDelete,
}: WorkspaceActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label={`Open ${workspace.name} menu`}
                    className={clsx(
                        "cursor-pointer",
                        "flex h-8 w-8 shrink-0",
                        "items-center justify-center",
                        "rounded-lg",
                        "text-muted-foreground",
                        "transition-colors",
                        "hover:bg-muted",
                        "hover:text-foreground",
                        "opacity-100",
                        "lg:opacity-0",
                        "lg:group-hover:opacity-100"
                    )}
                >
                    <MoreHorizontal size={17} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => onOpenProjects?.(workspace)}
                >
                    <FolderOpen size={16} />
                    Open Workspace
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onEdit?.(workspace)}
                >
                    <Pencil size={16} />
                    Edit Workspace
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onOpenMembers?.(workspace)}
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

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => onDelete?.(workspace)}
                    className="
                        text-red-500
                        focus:text-red-500
                        hover:bg-red-500/10
                    "
                >
                    <Trash2 size={16} />
                    Delete Workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}