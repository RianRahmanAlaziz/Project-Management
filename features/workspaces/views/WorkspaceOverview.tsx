"use client";

import { useMemo, useState } from "react";
import {
    USERS,
    PROJECTS,
    WORKSPACES,
} from "@/data/data";

import {
    Plus,
    FolderOpen,
    BarChart3,
    BriefcaseBusiness,
    Clock3,
    Users,
} from "lucide-react";

import { Button, EmptyState } from "@/components/ui";
import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectCard from "@/features/projects/components/ProjectCard";
import WorkspaceDashboard from "../components/WorkspaceDashboard";

interface WorkspaceOverviewProps {
    slug: string;
}

export default function WorkspaceOverview({
    slug,
}: WorkspaceOverviewProps) {
    const [search, setSearch] = useState("");

    const workspace = WORKSPACES.find(
        (item) => item.slug === slug
    );

    const filtered = useMemo(() => {
        if (!workspace) return [];

        return PROJECTS.filter((project) => {
            const matchWorkspace =
                project.workspace === workspace.id;

            const matchSearch =
                project.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return matchWorkspace && matchSearch;
        });
    }, [workspace, search]);

    const handleCreateProject = () => {
        console.log("Create Project")
    };

    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <WorkspaceDashboard
                    workspace={{
                        name: workspace?.name ?? "",
                        slug: workspace?.slug ?? "",
                        description: workspace?.description ?? "",
                        initials: workspace?.initials ?? "",
                        color: workspace?.color ?? "bg-indigo-500",
                        visibility: "Public",
                        createdAt: "Jan 2024",
                        projects: workspace?.projects ?? 0,
                        members: workspace?.members ?? 0,
                        tasks: 89,
                        completion: 76,
                    }}
                    projects={filtered}
                    onCreateProject={handleCreateProject}
                />
            </div>
        </div>
    )
}
