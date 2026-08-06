"use client";

import {
    Pencil,
    Users,
    MoreHorizontal,
    Settings,
    FolderOpen,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { Workspace } from "@/features/workspaces/types/workspace";
import { Button } from "@/components/ui";

interface ActionsMenuActionsMenuProps {
    workspace: Workspace;
    onOpenProject: (workspace: Workspace) => void;
    onOpenMembers: (workspace: Workspace) => void;
    onOpenSetting: (workspace: Workspace) => void;
}

export default function ActionsMenu({
    workspace,
    onOpenProject,
    onOpenMembers,
    onOpenSetting,
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
                        onOpenProject?.(workspace)
                    }}
                >
                    <FolderOpen size={16} />
                    Open Projects
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