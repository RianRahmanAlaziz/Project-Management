import { apiClient } from "@/lib/api/apiClient";

import type {
    WorkspaceListResponse,
} from "../types/workspace";

export async function getWorkspaces(): Promise<WorkspaceListResponse> {
    const response =
        await apiClient.get<WorkspaceListResponse>(
            "/workspaces",
        );

    return response.data;
}