"use client";
import { useRouter } from "next/navigation";
import { PROJECTS } from "../mocks/projects";
import type { Projects } from "@/features/projects/types/projects";
import {
    ProjectDashboard,
}
    from "@/features/projects/components";

interface ProjectsOverviewProps {
    workspaceSlug: string;
    projectSlug: string;
}


export default function ProjectsOverview({
    workspaceSlug,
    projectSlug,
}: ProjectsOverviewProps) {
    const router = useRouter();
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

    const onOpenBoard = (project: Projects) => {
        router.push(
            `/workspaces/${workspaceSlug}/projects/${project.slug}/board`
        );
    };

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectDashboard
                    project={project}
                    onCreateTasks={onCreateTasks}
                    onOpenBoard={onOpenBoard}
                />
            </div>
        </div>
    )
}
