"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { parseApiError } from "@/lib/api/apiError";
import { Projects, ProjectsPagination } from "../../types/projects";
import { getProjects } from "../../api/projectsApi";


export function useProjects(workspaceSlug: string) {
    const [projects, setProjects] = useState<Projects[]>([])
    const [pagination, setPagination] = useState<ProjectsPagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getProjects(workspaceSlug);
            setProjects(response.data)
            setPagination(response.meta.pagination);
        } catch (fetchError) {
            const apiError = parseApiError(fetchError);
            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, [workspaceSlug]);

    useEffect(() => {
        void fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        pagination,
        isLoading,
        error,
        refetch: fetchProjects,
    }
}
