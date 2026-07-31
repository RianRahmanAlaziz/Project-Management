import { useState } from "react";

export function useProjectModal() {
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

    const openCreateProject = () =>
        setIsCreateProjectOpen(true);

    const closeCreateProject = () =>
        setIsCreateProjectOpen(false);

    return {
        isCreateProjectOpen,
        openCreateProject,
        closeCreateProject,
    }
}
