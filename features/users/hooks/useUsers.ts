"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { getUsers } from "../api/userApi";

import { parseApiError } from "@/lib/api/apiError";

import type {
    Users,
    UserPagination
} from "../types/users";

export function useUsers() {
    const [users, setUsers] = useState<Users[]>([]);

    const [pagination, setPagination] = useState<UserPagination | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getUsers();

            setUsers(response.data);
            setPagination(response.meta);
        } catch (error) {
            const apiError = parseApiError(error);

            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        pagination,
        isLoading,
        error,
        refetch: fetchUsers,
    };
}