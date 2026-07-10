import { useRouter } from "next/navigation";
import type { Workspace } from "../types/workspace";

export function useWorkspaceNavigation() {
    const router = useRouter();

    const handleOpenWorkspace = (
        workspace: Workspace
    ) => {
        router.push(
            `/workspaces/${workspace.slug}`
        );
    };

    const handleOpenMembers = (
        workspace: Workspace
    ) => {
        router.push(
            `/workspaces/${workspace.slug}/members`
        );
    };

    const handleOpenSetting = (
        workspace: Workspace
    ) => {
        router.push(
            `/workspaces/${workspace.slug}/settings`
        );
    };

    const handleOpenProject = (
        workspace: Workspace
    ) => {
        router.push(
            `/workspaces/${workspace.slug}/projects`
        );
    };

    return {
        handleOpenWorkspace,
        handleOpenProject,
        handleOpenMembers,
        handleOpenSetting
    };
}