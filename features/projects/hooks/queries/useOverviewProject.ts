"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { parseApiError } from "@/lib/api/apiError";
import { DetailProject } from "../../types/projects";
import { getDetailProject } from "../../api/projectsApi";

export function useOverviewProject(
    workspaceSlug: string,
    projectSlug: string,
) {
    const [project, setProject] = useState<DetailProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProject = useCallback(async () => {
        if (!workspaceSlug) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getDetailProject(
                workspaceSlug,
                projectSlug
            );

            setProject(response.data);
        } catch (fetchError) {
            const apiError = parseApiError(fetchError);

            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, [workspaceSlug, projectSlug]);

    useEffect(() => {
        void fetchProject();
    }, [fetchProject]);
    return {
        project,
        isLoading,
        error,
        refetch: fetchProject,
    }
}
