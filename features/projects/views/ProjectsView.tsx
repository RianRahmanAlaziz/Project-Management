"use client";

import { PROJECTS } from "@/features/projects/mocks/projects";
import { Plus, FolderOpen } from "lucide-react";
import { Button, EmptyState } from "@/components/ui";

import {
    ProjectSearch,
    ProjectCard,
    ProjectHeader
} from "@/features/projects/components";

import {
    useProjectNavigation,
    useProjectSearch,
} from "../hooks";

type ProjectsViewProps = {
    workspaceSlug: string;
};

export default function ProjectsView({
    workspaceSlug,
}: ProjectsViewProps) {


    const handleCreateProject = () => {
        console.log("Create Project")
    };

    const handleEditProject = () => {
        console.log("Edit Project")
    };

    const handleDeleteProject = () => {
        console.log("Delete Project")
    };

    const {
        search,
        setSearch,
        filtered,
    } = useProjectSearch(PROJECTS.data);

    const {
        handleOpenProjectBoard,
        handleOpenProject,
        handleSettingProject,
    } = useProjectNavigation(workspaceSlug);

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectHeader
                    totalProjects={filtered.length}
                    onCreateProject={handleCreateProject}
                />

                <ProjectSearch
                    value={search}
                    onChange={setSearch}
                />

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {filtered.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpenProject={handleOpenProject}
                                onOpenBoard={handleOpenProjectBoard}
                                onEditProject={handleEditProject}
                                onSettingProject={handleSettingProject}
                                onDeleteProject={handleDeleteProject}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<FolderOpen size={20} />}
                        title="No projects found"
                        description="Try a different search or create a new project to get started."
                        action={<Button size="sm" variant="primary"><Plus size={13} />New Project</Button>}
                    />
                )}

            </div>
        </div>
    )
}
