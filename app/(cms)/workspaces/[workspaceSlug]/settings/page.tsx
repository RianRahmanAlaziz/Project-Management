import WorkspaceSettings from "@/features/workspaces/views/WorkspaceSettings";

interface WorkspaceSettingsProps {
    params: Promise<{
        workspaceSlug: string;
    }>;
}

export default async function WorkspaceSettingsPage({ params }: WorkspaceSettingsProps) {
    const { workspaceSlug } = await params;
    return (
        <WorkspaceSettings workspaceSlug={workspaceSlug} />
    )
}
