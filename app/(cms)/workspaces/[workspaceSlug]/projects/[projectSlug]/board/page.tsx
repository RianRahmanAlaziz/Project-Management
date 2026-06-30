import ProjectsBoardView from "@/features/projects/views/ProjectsBoardView";

type ProjectsBoardPageProps = {
    params: Promise<{
        projectSlug: string;
        workspaceSlug: string;
    }>;
};

export default async function ProjectsBoardPage({ params }: ProjectsBoardPageProps) {
    const { workspaceSlug, projectSlug } = await params;
    return (
        <ProjectsBoardView projectSlug={projectSlug} workspaceSlug={workspaceSlug} />
    )
}
