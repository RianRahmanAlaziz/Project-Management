
import ProjectsView from '@/features/projects/views/ProjectsView'

type ProjectsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { slug } = await params;
    return (
        <ProjectsView slug={slug} />
    )
}
