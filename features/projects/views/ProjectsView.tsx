"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PROJECTS } from "@/features/projects/mocks/projects";
import { Plus, FolderOpen } from "lucide-react";
import { Button, EmptyState } from "@/components/ui";
import type { Projects } from "@/features/projects/types/projects";

import {
    ProjectSearch,
    ProjectCard,
    ProjectHeader
} from "@/features/projects/components";

type ProjectsViewProps = {
    workspaceSlug: string;
};

export default function ProjectsView({
    workspaceSlug,
}: ProjectsViewProps) {

    const [search, setSearch] = useState("");
    const router = useRouter();

    const filtered = useMemo(() => {
        return PROJECTS.data.filter(project =>
            project.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    const handleCreateProject = () => {
        console.log("Create Project")
    };

    const handleOpenProjectBoard = (project: Projects) => {
        router.push(
            `/workspaces/${workspaceSlug}/projects/${project.slug}/board`
        );
    };

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
                                workspaceSlug={workspaceSlug}
                                project={project}
                                onOpen={handleOpenProjectBoard}
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
