import { apiClient } from "@/lib/api/apiClient";

import type {
    CreateWorkspacePayload,
    WorkspaceListResponse,
    WorkspaceResponse,
} from "../types/workspace";

export async function getWorkspaces(): Promise<WorkspaceListResponse> {
    const response =
        await apiClient.get<WorkspaceListResponse>(
            "/workspaces",
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