"use client";
import { PROJECTS } from "../mocks/projects";

import {
    ProjectDashboard,
} from "@/features/projects/components";

import {
    useProjectNavigation,
} from "../hooks";

interface ProjectsOverviewProps {
    workspaceSlug: string;
    projectSlug: string;
}


export default function ProjectsOverview({
    workspaceSlug,
    projectSlug,
}: ProjectsOverviewProps) {
    const project = PROJECTS.data.find(
        (item) => item.slug === projectSlug
    );

    if (!project) {
        return (
            <div className="p-6 text-center">
                Project not found.
            </div>
        );
    }

    const onCreateTasks = () => {
        console.log("Create Tasks")
    };


    const {
        handleOpenProjectBoard,
    } = useProjectNavigation(workspaceSlug);

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectDashboard
                    project={project}
                    onCreateTasks={onCreateTasks}
                    onOpenBoard={handleOpenProjectBoard}
                />
            </div>
        </div>
    )
}
