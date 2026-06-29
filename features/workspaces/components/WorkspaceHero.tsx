"use client";

import {
    FolderOpen,
    Globe,
    Lock,
    Plus,
    Settings,
} from "lucide-react";

import { Button } from "@/components/ui";

type WorkspaceHeroProps = {
    workspace: {
        name: string;
        slug: string;
        description: string;
        initials: string;
        color: string;
        visibility: "Public" | "Private";
        createdAt: string;
        projects: number;
        members: number;
        tasks: number;
        completion: number;
    };

    onCreateProject?: () => void;

    onSettings?: () => void;
};

export default function WorkspaceHero({
    workspace,
    onCreateProject,
    onSettings,
}: WorkspaceHeroProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-7 shadow-xl">
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
                                Created: {workspace.createdAt}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={onSettings}
                    >
                        <Settings size={16} />
                        Settings
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onCreateProject}
                    >
                        <FolderOpen size={16} />
                        Open Project
                    </Button>
                </div>
            </div>
        </div>
    );
}