import MembersView from '@/features/members/views/MembersView'

type MembersPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function MembersPage({ params }: MembersPageProps) {
    const { slug } = await params;
    return (
        <MembersView slug={slug} />
    )
}
