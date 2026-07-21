
import { Users, FolderOpen, } from "lucide-react";
import type { Workspace } from "@/features/workspaces/types/workspace";
import WorkspaceActionsMenu from "./WorkspaceActionsMenu";
import { getWorkspaceInitials } from "../../utils/getWorkspaceInitials";

interface WorkspaceCardProps {
    workspace: Workspace;
    onOpenWorkspace: (workspace: Workspace) => void;
    onOpenProjects: (workspace: Workspace) => void;
    onOpenMembers: (workspace: Workspace) => void;
    onOpenSetting: (workspace: Workspace) => void;
}

export default function WorkspaceCard({
    workspace,
    onOpenWorkspace,
    onOpenProjects,
    onOpenMembers,
    onOpenSetting,
}: WorkspaceCardProps) {
    const initials = getWorkspaceInitials(workspace.name);
    return (
        <article
            onClick={() => onOpenWorkspace?.(workspace)}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-xl cursor-pointer">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${workspace.color}`}
                    >
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <h3 className="block truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                            {workspace.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {workspace.description}
                        </p>
                    </div>
                </div>

                <WorkspaceActionsMenu
                    workspace={workspace}
                    onOpenProjects={onOpenProjects}
                    onOpenMembers={onOpenMembers}
                    onOpenSetting={onOpenSetting}
                />
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                    <Users size={15} />
                    {workspace.members_count} members
                </span>

                <span className="flex items-center gap-2">
                    <FolderOpen size={15} />
                    {workspace.project_count} projects
                </span>
            </div>
        </article>
    );
}