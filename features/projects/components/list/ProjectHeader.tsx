
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

interface ProjectHeaderProops {
    totalProjects: number
    onCreateProject: () => void;
}

export default function ProjectHeader({
    totalProjects,
    onCreateProject,
}: ProjectHeaderProops) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Projects
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {totalProjects} Projects across all workspaces
                </p>
            </div>

            <Button
                type="button"
                size="lg"
                variant="primary"
                onClick={onCreateProject}
                className="w-full sm:w-auto"
            >
                <Plus size={16} />
                New Projects
            </Button>
        </div>
    )
}
