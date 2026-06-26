"use client";

import { useMemo, useState } from "react";
import {
    USERS,
    PROJECTS,
} from "@/data/data";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal, Calendar, FolderOpen } from "lucide-react";
import { Avatar, Badge, Button, ProgressBar, EmptyState } from "@/components/ui";
import ProjectHeader from "../components/ProjectHeader";
import ProjectSearch from "../components/ProjectSearch";
import ProjectCard from "../components/ProjectCard";


const statusColors: Record<string, "indigo" | "yellow" | "green" | "gray"> = {
    "In Progress": "indigo",
    "Review": "yellow",
    "Done": "green",
    "Todo": "gray",
};

const priorityColors: Record<string, string> = {
    High: "text-destructive",
    Medium: "text-warning",
    Low: "text-muted-foreground",
};

type ProjectsViewProps = {
    slug: string;
};

export default function ProjectsView({
    slug,
}: ProjectsViewProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");

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
