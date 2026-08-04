import { apiClient } from "@/lib/api/apiClient";
import type {
    Projects,
    DetailProject,
    ProjectsListResponse,
    CreateProjectPayload,
} from "../types/projects";
import { ApiResponse } from "@/lib/api/apiResponse";

export async function getProjects(
    workspaceSlug: string,
): Promise<ProjectsListResponse> {
    const response = await apiClient.get<ProjectsListResponse>(
        `/workspaces/${workspaceSlug}/projects`,
    );
    return response.data;
}

export async function getDetailProject(
    workspaceSlug: string,
    projectSlug: string,
): Promise<ApiResponse<DetailProject>> {
    const response = await apiClient.get<ApiResponse<DetailProject>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
    );
    return response.data;
}


export async function createProject(
    workspaceSlug: string,
    payload: CreateProjectPayload,
): Promise<ApiResponse<Projects>> {
    const response = await apiClient.post<ApiResponse<Projects>>(
        `/workspaces/${workspaceSlug}/projects`,
        payload,
    );

    return response.data;
}


