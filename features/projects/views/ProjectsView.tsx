"use client";

import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/ui";

import {
    ProjectSearch,
    ProjectCard,
    ProjectHeader,
    ProjectsSkeleton,
    CreateProjectModal,
} from "@/features/projects/components";

import {
    useCreateProjectWithMembers,
    useProjectModals,
    useProjectNavigation,
    useProjectSearch,
    useProjects,
} from "../hooks";

import { useWorkspaceMembers } from "@/features/members/hooks";
import { useDetailWorkspace } from "@/features/workspaces/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";

type ProjectsViewProps = {
    workspaceSlug: string;
};

export default function ProjectsView({
    workspaceSlug,
}: ProjectsViewProps) {
    const { user } = useAuth();
    const { workspace } = useDetailWorkspace(workspaceSlug);
    const { members } = useWorkspaceMembers(workspaceSlug);

    const availableMembers = members.filter(
        (member) => member.user.id !== user?.id,
    );
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

    const {
        project
    } = useProjectModals();

    const {
        handleCreateProjectWithMembers,
        isSubmitting,
    } = useCreateProjectWithMembers({
        workspaceSlug,
        onSuccess: async () => {
            await refetch();
            project.closeCreate();
        },
    });

    if (isLoading) {
        return <ProjectsSkeleton />;
    }

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectHeader
                    totalProjects={filtered.length}
                    onCreateProject={project.openCreate}
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
                                onSettingProject={handleSettingProject}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<FolderOpen size={22} />}
                        title="No projects found"
                        description="Try a different search or create a new project to get started."
                    />
                )}
            </div>

            <CreateProjectModal
                open={project.createOpen}
                users={availableMembers}
                workspaceName={workspace?.name ?? ""}
                onClose={project.closeCreate}
                onConfirm={handleCreateProjectWithMembers}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
