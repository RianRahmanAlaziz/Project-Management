import MembersView from '@/features/members/views/MembersView'

type MembersPageProps = {
    params: Promise<{
        workspaceSlug: string;
    }>;
};

export default async function MembersPage({ params }: MembersPageProps) {
    const { workspaceSlug } = await params;
    return (
        <MembersView workspaceSlug={workspaceSlug} />
    )
}
