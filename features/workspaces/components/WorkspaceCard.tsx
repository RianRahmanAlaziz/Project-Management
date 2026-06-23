import Link from "next/link";
import { Users, FolderOpen, } from "lucide-react";
import type { Workspace } from "../types/workspace";
import { WorkspaceActionsMenu } from "./WorkspaceActionsMenu";

interface WorkspaceCardProps {
    workspace: Workspace;
    onOpen?: (workspace: Workspace) => void;
    onEdit?: (workspace: Workspace) => void;
    onDelete?: (workspace: Workspace) => void;
}

export function WorkspaceCard({
    workspace,
    onOpen,
    onEdit,
    onDelete,
}: WorkspaceCardProps) {
    return (
        <article className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${workspace.color}`}
                    >
                        {workspace.initials}
                    </div>

                    <div className="min-w-0">
                        <Link
                            href={`/dashboard/projects?workspace=${workspace.id}`}
                            className="block truncate text-base font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            {workspace.name}
                        </Link>

                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {workspace.description}
                        </p>
                    </div>
                </div>

                <WorkspaceActionsMenu
                    workspace={workspace}
                    onOpen={onOpen}
                    onEdit={onEdit}
                    onMembers={(workspace) => {
                        console.log("Members", workspace.id);
                    }}
                    onSettings={(workspace) => {
                        console.log("Settings", workspace.id);
                    }}
                    onDelete={onDelete}
                />
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                    <Users size={15} />
                    {workspace.members} members
                </span>

                <span className="flex items-center gap-2">
                    <FolderOpen size={15} />
                    {workspace.projects} projects
                </span>
            </div>
        </article>
    );
}