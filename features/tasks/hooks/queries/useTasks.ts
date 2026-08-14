"use client";
import { parseApiError } from "@/lib/api/apiError";
import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { Tasks, TasksPagination } from "../../types/tasks";
import { getTasks } from "../../api/tasksApi";



export function useTasks(
    workspaceSlug: string,
    projectSlug: string,
) {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [pagination, setPagination] = useState<TasksPagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getTasks(workspaceSlug, projectSlug);
            setTasks(response.data)
            setPagination(response.meta.pagination);
        } catch (fetchError) {
            const apiError = parseApiError(fetchError);
            setError(apiError.message);
        } finally {
            setIsLoading(false);
        }

    }, [workspaceSlug, projectSlug]);

    useEffect(() => {
        void fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        pagination,
        isLoading,
        error,
        refetch: fetchTasks,
    }
}
