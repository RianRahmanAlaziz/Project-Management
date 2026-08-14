import { apiClient } from "@/lib/api/apiClient";
import { MyTasksResponse, Tasks, TasksListResponse, UpdateTaskPayload } from "../types/tasks";
import { ApiResponse } from "@/lib/api";


export async function getTasks(
    workspaceSlug: string,
    projectSlug: string,
): Promise<TasksListResponse> {
    const response = await apiClient.get<TasksListResponse>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/tasks`,
    );
    return response.data;
}

export async function getMyTasks(): Promise<MyTasksResponse> {
    const response = await apiClient.get<MyTasksResponse>(
        "/my-tasks",
    );
    return response.data;
}

export async function updateTask(
    workspaceSlug: string,
    projectSlug: string,
    taskId: number,
    payload: UpdateTaskPayload,
): Promise<ApiResponse<Tasks>> {
    const response = await apiClient.patch<ApiResponse<Tasks>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/tasks/${taskId}`,
        payload,
    );

    return response.data;
}