
import WorkspaceOverview from '@/features/workspaces/views/WorkspaceOverview';

type WorkspaceOverviewPageProps = {
    params: Promise<{
        workspaceSlug: string;
    }>;
};

export default async function WorkspaceOverviewPage({ params }: WorkspaceOverviewPageProps) {
    const { workspaceSlug } = await params;
    return (
        <WorkspaceOverview slug={workspaceSlug} />
    )
}
