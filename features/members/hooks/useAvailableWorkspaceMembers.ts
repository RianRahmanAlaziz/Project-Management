"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { getAvailableMembers } from "../api/workspaceMemberApi";
import type { AvailableUser } from "../types/workspaceMember";
import { parseApiError } from "@/lib/api/apiError";

export function useAvailableWorkspaceMembers(
    workspaceSlug: string,
    enabled = true,
) {
    const [users, setUsers] = useState<AvailableUser[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const fetchAvailableMembers =
        useCallback(async () => {
            if (
                !workspaceSlug ||
                !enabled
            ) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response =
                    await getAvailableMembers(
                        workspaceSlug,
                    );

                setUsers(response.data);
            } catch (fetchError) {
                const apiError =
                    parseApiError(fetchError);

                setError(apiError.message);
            } finally {
                setIsLoading(false);
            }
        }, [workspaceSlug, enabled]);

    useEffect(() => {
        if (!enabled) {
            setUsers([]);
            return;
        }

        void fetchAvailableMembers();
    }, [
        enabled,
        fetchAvailableMembers,
    ]);

    return {
        users,
        isLoading,
        error,
        refetch: fetchAvailableMembers,
    };
}