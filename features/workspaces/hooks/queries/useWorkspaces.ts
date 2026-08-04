"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { parseApiError } from "@/lib/api/apiError";
import { Workspace, WorkspacePagination } from "../../types/workspace";
import { getWorkspaces } from "../../api/workspaceApi";

export function useWorkspaces() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

    const [pagination, setPagination] = useState<WorkspacePagination | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const fetchWorkspaces = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getWorkspaces();

            setWorkspaces(response.data);
            setPagination(response.meta.pagination);

        } catch (fetchError) {
            const apiError = parseApiError(fetchError);

            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchWorkspaces();
    }, [fetchWorkspaces]);

    return {
        workspaces,
        pagination,
        isLoading,
        error,
        refetch: fetchWorkspaces,
    };
}