"use client";

import { useCallback, useEffect, useState } from "react";

import { getProjectMembers } from "../../api/projectMembersApi";

import type {
    ProjectMember,
} from "../../types/projectMembers";

interface UseProjectMembersOptions {
    workspaceSlug: string;
    projectSlug: string;
}

export function useProjectMembers({
    workspaceSlug,
    projectSlug,
}: UseProjectMembersOptions) {
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getProjectMembers(
                workspaceSlug,
                projectSlug,
            );

            setMembers(response.data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load project members.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [
        workspaceSlug,
        projectSlug,
    ]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return {
        members,
        isLoading,
        error,
        refetch: fetchMembers,
    };
}