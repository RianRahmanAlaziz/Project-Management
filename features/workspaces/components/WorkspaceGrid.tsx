import { Briefcase, Plus } from "lucide-react";

import {
    Button,
    EmptyState,
} from "@/components/ui";

import type { Workspace } from "../types/workspace";
import { WorkspaceCard } from "./WorkspaceCard";

interface WorkspaceGridProps {
    workspaces: Workspace[];
    onOpenWorkspace: (workspace: Workspace) => void;
    onCreateWorkspace: () => void;
    onEditWorkspace: (workspace: Workspace) => void;
    onDeleteWorkspace: (workspace: Workspace) => void;
}

export function WorkspaceGrid({
    workspaces,
    onOpenWorkspace,
    onCreateWorkspace,
    onEditWorkspace,
    onDeleteWorkspace,
}: WorkspaceGridProps) {
    if (workspaces.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-card">
                <EmptyState
                    icon={<Briefcase size={22} />}
                    title="No workspaces found"
                    description="No workspace matches your search. Create a new workspace to start organizing your projects."
                    action={
                        <Button
                            type="button"
                            size="lg"
                            variant="primary"
                            onClick={onCreateWorkspace}
                        >
                            <Plus size={16} />
                            New Workspace
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workspaces.map((workspace) => (
                <WorkspaceCard
                    key={workspace.id}
                    workspace={workspace}
                    onOpen={onOpenWorkspace}
                    onEdit={onEditWorkspace}
                    onDelete={onDeleteWorkspace}
                />
            ))}
        </div>
    );
}