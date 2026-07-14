import ProjectSettingsView from '@/features/projects/views/ProjectSettingsView';
import React from 'react'

interface ProjectSettingsProps {
    params: Promise<{
        projectSlug: string;
        workspaceSlug: string;
    }>;
}

export default async function ProjectSettings({ params }: ProjectSettingsProps) {
    const { workspaceSlug, projectSlug } = await params;

    return (
        <ProjectSettingsView workspaceSlug={workspaceSlug} projectSlug={projectSlug} />
    )
}
