import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface WorkspaceHeaderProps {
    OpenCreateWorkspace: () => void;
}

export default function WorkspaceHeader({
    OpenCreateWorkspace,
}: WorkspaceHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Workspaces
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your team workspaces and projects.
                </p>
            </div>
            <Button
                type="button"
                size="lg"
                variant="primary"
                onClick={OpenCreateWorkspace}
                className="w-full sm:w-auto shadow-xl"
            >
                <Plus size={16} />
                New Workspace
            </Button>
        </div>
    );
}