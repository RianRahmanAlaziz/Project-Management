import { useRouter } from "next/navigation";
import type { Projects } from "@/features/projects/types/projects";

export function useProjectNavigation(workspaceSlug: string) {
    const router = useRouter();

    const handleOpenProject = (project: Projects) => {
        router.push(
            `/workspaces/${workspaceSlug}/projects/${project.slug}`
        );
    };

    const handleOpenProjectBoard = (project: Projects) => {
        router.push(
            `/workspaces/${workspaceSlug}/projects/${project.slug}/board`
        );
    };

    const handleSettingProject = (project: Projects) => {
        router.push(
            `/workspaces/${workspaceSlug}/projects/${project.slug}/settings`
        );
    };


    return {
        handleOpenProjectBoard,
        handleOpenProject,
        handleSettingProject,
    }
}
