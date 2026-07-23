"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getWorkspaceMembers,
} from "../api/workspaceMemberApi";

import type {
    WorkspaceMember,
    WorkspaceMemberPagination,
} from "../types/workspaceMember";

import {
    parseApiError,
} from "@/lib/api/apiError";

export function useWorkspaceMembers(
    workspaceSlug: string,
) {
    const [members, setMembers] = useState<WorkspaceMember[]>([]);

    const [pagination, setPagination] = useState<WorkspaceMemberPagination | null>(null,);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const fetchMembers =
        useCallback(async () => {
            if (!workspaceSlug) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response =
                    await getWorkspaceMembers(
                        workspaceSlug,
                    );

                setMembers(response.data);

                setPagination(
                    response.meta.pagination,
                );
            } catch (fetchError) {
                const apiError =
                    parseApiError(fetchError);

                setError(apiError.message);
            } finally {
                setIsLoading(false);
            }
        }, [workspaceSlug]);

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    return {
        members,
        pagination,
        isLoading,
        error,
        refetch: fetchMembers,
    };
}