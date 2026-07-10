"use client";

import {
    FolderOpen,
} from "lucide-react";
import type { Workspace } from "@/features/workspaces/types/workspace";
import { Button } from "@/components/ui";
import ActionsMenu from "./ActionsMenu";

type WorkspaceHeroProps = {
    workspace: Workspace;
    onOpenProject?: (workspace: Workspace) => void;
    onOpenMembers: (workspace: Workspace) => void;
    onEdit?: () => void;
    onOpenSetting: (workspace: Workspace) => void;
};

export default function WorkspaceHero({
    workspace,
    onOpenProject,
    onOpenMembers,
    onEdit,
    onOpenSetting,
}: WorkspaceHeroProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex gap-5">
                    <div
                        className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl ${workspace.color} text-3xl font-bold text-white`}
                    >
                        {workspace.initials}
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold">
                                {workspace.name}
                            </h1>
                        </div>
                        <p className="max-w-3xl text-muted-foreground">
                            {workspace.description}
                        </p>
                        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                            <span>
                                Created: {workspace.created_at}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => onOpenProject?.(workspace)}
                    >
                        <FolderOpen size={16} />
                        Open Project
                    </Button>

                    <ActionsMenu
                        workspace={workspace}
                        onOpenMembers={onOpenMembers}
                        onEdit={onEdit}
                        onOpenSetting={onOpenSetting}
                    />
                </div>
            </div>
        </div>
    );
}