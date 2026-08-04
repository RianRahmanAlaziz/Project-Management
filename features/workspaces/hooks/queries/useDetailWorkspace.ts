"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { parseApiError } from "@/lib/api/apiError";
import { Workspace } from "../../types/workspace";
import { getDetailWorkspace } from "../../api/workspaceApi";

export function useDetailWorkspace(
    workspaceSlug: string,
) {
    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkspace = useCallback(async () => {
        if (!workspaceSlug) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await getDetailWorkspace(workspaceSlug);

            setWorkspace(response.data);
        } catch (fetchError) {
            const apiError = parseApiError(fetchError);

            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, [workspaceSlug]);

    useEffect(() => {
        void fetchWorkspace();
    }, [fetchWorkspace]);

    return {
        workspace,
        isLoading,
        error,
        refetch: fetchWorkspace,
    };
}