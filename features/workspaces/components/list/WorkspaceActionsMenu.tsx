"use client";

import {
    FolderOpen,
    Users,
    MoreHorizontal,
    Settings,
} from "lucide-react";
import clsx from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { Workspace } from "@/features/workspaces/types/workspace";

interface WorkspaceActionsMenuProps {
    workspace: Workspace;
    onOpenWorkspace?: (workspace: Workspace) => void;
    onOpenMembers?: (workspace: Workspace) => void;
    onOpenSetting?: (workspace: Workspace) => void;
}

export default function WorkspaceActionsMenu({
    workspace,
    onOpenWorkspace,
    onOpenMembers,
    onOpenSetting,
}: WorkspaceActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenWorkspace?.(workspace)
                    }}
                >
                    <FolderOpen size={16} />
                    Open Workspace
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

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenSetting?.(workspace)
                    }}
                >
                    <Settings size={16} />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}