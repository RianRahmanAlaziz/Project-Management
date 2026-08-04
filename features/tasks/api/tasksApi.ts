import { apiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/api/apiResponse";
import { TasksListResponse } from "../types/tasks";


export async function getTasks(
    workspaceSlug: string,
    projectSlug: string,
): Promise<TasksListResponse> {
    const response = await apiClient.get<TasksListResponse>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/tasks`,
    );
    return response.data;
}