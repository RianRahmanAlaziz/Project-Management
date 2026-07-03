"use client";

import ProjectsDashboard from '../components/overview/ProjectDashboard';
import { PROJECTS } from "../mocks/projects";

interface ProjectsOverviewProps {
    slug: string;
}


export default function ProjectsOverview({
    slug,
}: ProjectsOverviewProps) {

    const project = PROJECTS.data.find(
        (item) => item.slug === slug
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

    const onOpenBoard = () => {
        console.log("Open Board")
    };

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectsDashboard
                    project={project}
                    onCreateTasks={onCreateTasks}
                    onOpenBoard={onOpenBoard}
                />
            </div>
        </div>
    )
}
