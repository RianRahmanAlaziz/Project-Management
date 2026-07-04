import ProjectsOverview from '@/features/projects/views/ProjectsOverview';
import React from 'react'

type ProjectsOverviewPage = {
    params: Promise<{
        workspaceSlug: string;
        projectSlug: string;
    }>;
};

export default async function ProjectsOverviewPage({ params }: ProjectsOverviewPage) {
    const { projectSlug, workspaceSlug } = await params;
    return (
        <ProjectsOverview
            workspaceSlug={workspaceSlug}
            projectSlug={projectSlug}
        />
    )
}
