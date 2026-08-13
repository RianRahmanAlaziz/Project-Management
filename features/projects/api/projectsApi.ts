import { ApiResponse, apiClient } from "@/lib/api";
import type {
    Projects,
    DetailProject,
    ProjectsListResponse,
    CreateProjectPayload,
    UpdateProjectPayload,
} from "../types/projects";

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

export async function updateProject(
    workspaceSlug: string,
    projectSlug: string,
    payload: UpdateProjectPayload,
): Promise<ApiResponse<Projects>> {
    const response = await apiClient.patch<ApiResponse<Projects>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
        payload,
    );

    return response.data;
}




