import { apiClient } from "@/lib/api/apiClient";

import type {
    CreateWorkspacePayload,
    UpdateWorkspacePayload,
    WorkspaceListResponse,
    WorkspaceResponse,
    WorkspaceDetailResponse,
} from "../types/workspace";

export async function getWorkspaces(): Promise<WorkspaceListResponse> {
    const response =
        await apiClient.get<WorkspaceListResponse>(
            "/workspaces",
        );

    return response.data;
}

export async function getDetailWorkspace(
    workspaceSlug: string,
): Promise<WorkspaceDetailResponse> {
    const response =
        await apiClient.get<WorkspaceDetailResponse>(
            `/workspaces/${workspaceSlug}`,
        );

    return response.data;
}

export async function createWorkspace(
    payload: CreateWorkspacePayload,
): Promise<WorkspaceResponse> {
    const response =
        await apiClient.post<WorkspaceResponse>(
            "/workspaces",
            payload,
        );

    return response.data;
}

export async function updateWorkspace(
    workspaceSlug: string,
    payload: UpdateWorkspacePayload,
): Promise<WorkspaceDetailResponse> {
    const response =
        await apiClient.patch<WorkspaceDetailResponse>(
            `/workspaces/${workspaceSlug}`,
            payload,
        );

    return response.data;
}