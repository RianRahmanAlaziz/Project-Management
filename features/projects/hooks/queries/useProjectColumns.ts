"use client";

import { useCallback, useEffect, useState } from "react";

import type { WorkflowColumn } from "../../types/workflow";
import { getProjectColumns } from "../../api/projectsColumnsApi";

interface UseProjectColumnsOptions {
    workspaceSlug: string;
    projectSlug: string;
}

export function useProjectColumns({
    workspaceSlug,
    projectSlug,
}: UseProjectColumnsOptions) {
    const [columns, setColumns] = useState<WorkflowColumn[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchColumns = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getProjectColumns(
                workspaceSlug,
                projectSlug,
            );

            setColumns(response.data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load workflow columns.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [
        workspaceSlug,
        projectSlug,
    ]);

    useEffect(() => {
        fetchColumns();
    }, [fetchColumns]);

    return {
        columns,
        setColumns,
        isLoading,
        error,
        refetch: fetchColumns,
    };
}