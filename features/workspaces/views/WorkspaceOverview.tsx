"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "@/features/projects/mocks/projects";
import { WORKSPACES } from "@/features/workspaces/mocks/workspaces";

import {
    WorkspaceDashboard,
} from "@/features/workspaces/components";

interface WorkspaceOverviewProps {
    slug: string;
}

export default function WorkspaceOverview({
    slug,
}: WorkspaceOverviewProps) {
    const [search, setSearch] = useState("");

    const workspace = WORKSPACES.data.find(
        (item) => item.slug === slug
    );

    const filtered = useMemo(() => {
        if (!workspace) return [];

        return PROJECTS.data.filter((project) => {
            const matchWorkspace =
                project.workspace_id === workspace.id;

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
                        projects: workspace?.projects_count ?? 0,
                        members: workspace?.members_count ?? 0,
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
