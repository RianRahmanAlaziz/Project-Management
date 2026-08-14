"use client";
import { parseApiError } from "@/lib/api/apiError";
import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { MyTasks, TasksPagination } from "../../types/tasks";
import { getMyTasks } from "../../api/tasksApi";

export function useMyTasks() {
    const [myTasks, setMyTasks] = useState<MyTasks[]>([]);
    const [pagination, setPagination] = useState<TasksPagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getMyTasks();
            setMyTasks(response.data)
            setPagination(response.meta.pagination);
        } catch (fetchError) {
            const apiError = parseApiError(fetchError);
            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }

    }, []);

    useEffect(() => {
        void fetchTasks();
    }, [fetchTasks]);

    return {
        myTasks,
        pagination,
        isLoading,
        error,
        refetch: fetchTasks,
    }
}
