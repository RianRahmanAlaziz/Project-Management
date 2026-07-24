import type { ApiResponse } from "@/lib/api/apiResponse";
import { apiClient } from "@/lib/api/apiClient";
import type { Workspace } from "../types/workspace";

import type {
    CreateWorkspacePayload,
    UpdateWorkspacePayload,
    WorkspaceListResponse,
    TransferWorkspaceOwnershipPayload,
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
): Promise<ApiResponse<Workspace>> {
    const response =
        await apiClient.get<ApiResponse<Workspace>>(
            `/workspaces/${workspaceSlug}`,
        );
    return response.data;
}

export async function createWorkspace(
    payload: CreateWorkspacePayload,
): Promise<ApiResponse<Workspace>> {
    const response =
        await apiClient.post<ApiResponse<Workspace>>(
            "/workspaces",
            payload,
        );
    return response.data;
}

export async function updateWorkspace(
    workspaceSlug: string,
    payload: UpdateWorkspacePayload,
): Promise<ApiResponse<Workspace>> {
    const response =
        await apiClient.patch<ApiResponse<Workspace>>(
            `/workspaces/${workspaceSlug}`,
            payload,
        );
    return response.data;
}

export async function transferWorkspaceOwnership(
    workspaceSlug: string,
    payload: TransferWorkspaceOwnershipPayload,
): Promise<ApiResponse<Workspace>> {
    const response =
        await apiClient.patch<ApiResponse<Workspace>>(
            `/workspaces/${workspaceSlug}/transfer-ownership`,
            payload,
        );

    return response.data;
}

export async function deleteWorkspace(
    workspaceSlug: string,
): Promise<ApiResponse<Workspace>> {
    const response =
        await apiClient.delete<ApiResponse<Workspace>>(
            `/workspaces/${workspaceSlug}`,
        );
    return response.data;
}