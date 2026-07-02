"use client";

import {
    Pencil,
    Users,
    Trash2,
    MoreHorizontal,
    SquareDashedKanban,
} from "lucide-react";
import clsx from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";


import type { Projects } from "@/features/projects/types/projects";

interface ProjectActionsMenuProps {
    project: Projects;
    onOpen?: (project: Projects) => void;
    onEdit?: (project: Projects) => void;
    onOpenMembers?: (project: Projects) => void;
    onSettings?: (project: Projects) => void;
    onDelete?: (project: Projects) => void;
}

export default function ProjectActionsMenu({
    project,
    onOpen,
    onEdit,
    onOpenMembers,
    onSettings,
    onDelete,
}: ProjectActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label={`Open ${project.name} menu`}
                    onClick={(e) => e.stopPropagation()}
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
                        e.stopPropagation();
                        onOpen?.(project)
                    }}
                >
                    <SquareDashedKanban size={16} />
                    Open Project Board
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenMembers?.(project)
                    }}
                >
                    <Users size={16} />
                    Manage Members
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(project);
                    }}
                >
                    <Pencil size={16} />
                    Edit Project
                </DropdownMenuItem>

                {/* <DropdownMenuItem
                          onClick={(e) => {
                           e.stopPropagation();
                          onSettings?.(project)
                          }}
                      >
                          <Settings size={16} />
                          Settings
                      </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(project)
                    }}
                    className="text-red-500 focus:text-red-500hover:bg-red-500/10"
                >
                    <Trash2 size={16} />
                    Delete Workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
