"use client";

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
import useProjects from "../hooks/useProjects";
import { ProjectsSkeleton } from "../components/skeleton";

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
        projects,
        isLoading,
        refetch,
    } = useProjects(workspaceSlug);

    const {
        search,
        setSearch,
        filtered,
    } = useProjectSearch(projects);

    const {
        handleOpenProjectBoard,
        handleOpenProject,
        handleSettingProject,
    } = useProjectNavigation(workspaceSlug);

    if (isLoading) {
        return <ProjectsSkeleton />;
    }

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
                        icon={<FolderOpen size={22} />}
                        title="No projects found"
                        description="Try a different search or create a new project to get started."
                        action={
                            <Button size="lg" variant="primary">
                                <Plus size={16} />New Project
                            </Button>}
                    />
                )}

            </div>
        </div>
    )
}
