"use client";

import {
    ProjectDashboard,
    SkeletonProjectsOverview,
} from "@/features/projects/components";

import {
    useProjectNavigation,
} from "../hooks";
import { useOverviewProject } from "../hooks/queries/useOverviewProject";
import { useTasks } from "@/features/tasks/hooks/useTasks";

interface ProjectsOverviewProps {
    workspaceSlug: string;
    projectSlug: string;
}


export default function ProjectsOverview({
    workspaceSlug,
    projectSlug,
}: ProjectsOverviewProps) {

    const {
        project,
        isLoading,
        error,
        refetch,
    } = useOverviewProject(workspaceSlug, projectSlug);

    const {
        tasks,
    } = useTasks(workspaceSlug, projectSlug);

    const onCreateTasks = () => {
        console.log("Create Tasks")
    };

    const {
        handleOpenProjectBoard,
    } = useProjectNavigation(workspaceSlug);

    if (!project) {
        return (
            <SkeletonProjectsOverview />
        );
    }
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectDashboard
                    project={project}
                    tasks={tasks}
                    onCreateTasks={onCreateTasks}
                    onOpenBoard={handleOpenProjectBoard}
                />
            </div>
        </div>
    )
}
