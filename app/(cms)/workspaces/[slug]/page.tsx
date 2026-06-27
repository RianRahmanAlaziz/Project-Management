
import WorkspaceOverview from '@/features/workspaces/views/WorkspaceOverview';

type WorkspaceOverviewPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function WorkspaceOverviewPage({ params }: WorkspaceOverviewPageProps) {
    const { slug } = await params;
    return (
        <WorkspaceOverview slug={slug} />
    )
}
