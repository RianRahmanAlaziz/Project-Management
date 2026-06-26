"use client";

import {
    FolderOpen,
    Pencil,
    Users,
    Settings,
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

export type Project = (typeof import("@/data/data").PROJECTS)[number];

interface ProjectActionsMenuProps {
    project: Project;
    onOpen?: (project: Project) => void;
    onEdit?: (project: Project) => void;
    onMembers?: (project: Project) => void;
    onSettings?: (project: Project) => void;
    onDelete?: (project: Project) => void;
}

export default function ProjectActionsMenu({
    project,
    onOpen,
    onEdit,
    onMembers,
    onSettings,
    onDelete,
}: ProjectActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label={`Open ${project.name} menu`}
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
                    onClick={() => onOpen?.(project)}
                >
                    <SquareDashedKanban size={16} />
                    Open Kanban Board
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onEdit?.(project)}
                >
                    <Pencil size={16} />
                    Edit Project
                </DropdownMenuItem>

                {/* <DropdownMenuItem
                          onClick={() => onSettings?.(project)}
                      >
                          <Settings size={16} />
                          Settings
                      </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => onDelete?.(project)}
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
    )
}
