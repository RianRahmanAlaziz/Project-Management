"use client";

import { useMemo, useState } from "react";
import {
    USERS,
    PROJECTS,
    WORKSPACES,
} from "@/data/data";
import { useRouter } from "next/navigation";
import { Plus, FolderOpen } from "lucide-react";
import { Button, EmptyState } from "@/components/ui";
import ProjectSearch from "../components/ProjectSearch";
import ProjectCard from "../components/ProjectCard";
import WorkspaceOverview from "@/features/workspaces/components/WorkspaceOverview";
import ProjectHeader from "../components/ProjectHeader";


type ProjectsViewProps = {
    slug: string;
};

export default function ProjectsView({
    slug,
}: ProjectsViewProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const workspace = WORKSPACES.find(
        (item) => item.slug === slug
    );

    const filtered = useMemo(() => {
        return PROJECTS.filter(project =>
            project.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    const handleCreateProject = () => {
        console.log("Create Project")
    };

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">

                <WorkspaceOverview
                    workspace={{
                        name: workspace?.name ?? "",
                        slug: workspace?.slug ?? "",
                        description: workspace?.description ?? "",
                        createdAt: "Jan 2024",
                        initials: workspace?.initials ?? "",
                        color: workspace?.color ?? "bg-indigo-500",
                        totalProjects: workspace?.projects ?? 0,
                        totalMembers: workspace?.members ?? 0,
                        totalTasks: 89,
                        completionRate: 76,
                    }}
                    onCreateProject={handleCreateProject}
                />

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
                                slug={slug}
                                project={project}
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
