
import ProjectsView from '@/features/projects/views/ProjectsView'

type ProjectsPageProps = {
    params: Promise<{
        workspaceSlug: string;
    }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { workspaceSlug } = await params;
    return (
        <ProjectsView workspaceSlug={workspaceSlug} />
    )
}
