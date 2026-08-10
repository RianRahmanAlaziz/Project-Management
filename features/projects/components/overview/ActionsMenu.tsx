"use client";

import {
    MoreHorizontal,
    SquareDashedKanban,
    Settings,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui";
import type { DetailProject } from "@/features/projects/types/projects";


interface ActionsMenuActionsMenuProps {
    project: DetailProject;
    onOpenBoard: (project: DetailProject) => void;
    onSettingProject: (project: DetailProject) => void;
}

export default function ActionsMenu({
    project,
    onOpenBoard,
    onSettingProject,
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
                        e.stopPropagation();
                        onOpenBoard?.(project)
                    }}
                >
                    <SquareDashedKanban size={16} />
                    Open Project Board
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onSettingProject?.(project)
                    }}
                >
                    <Settings size={16} />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}