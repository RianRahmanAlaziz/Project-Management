import { ApiResponse, apiClient } from "@/lib/api";
import { WorkflowColumn } from "../types/workflow";

export async function getProjectColumns(
    workspaceSlug: string,
    projectSlug: string,
) {
    const response = await apiClient.get<ApiResponse<WorkflowColumn[]>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/columns`,
    );

    return response.data;
}

export async function createProjectColumn(
    workspaceSlug: string,
    projectSlug: string,
    data: {
        name: string;
        color?: string;
    },
) {
    const response = await apiClient.post<ApiResponse<WorkflowColumn>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/columns`,
        data,
    );

    return response.data;
}

export async function updateProjectColumn(
    workspaceSlug: string,
    projectSlug: string,
    columnId: number,
    data: {
        name?: string;
        color?: string;
        enabled?: boolean;
    },
) {
    const response = await apiClient.patch<ApiResponse<WorkflowColumn>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/columns/${columnId}`,
        data,
    );

    return response.data;
}

export async function reorderProjectColumns(
    workspaceSlug: string,
    projectSlug: string,
    columns: {
        id: number;
        position: number;
    }[],
) {
    const response = await apiClient.patch<ApiResponse<WorkflowColumn[]>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/columns/reorder`,
        {
            columns,
        },
    );

    return response.data;
}

export async function deleteProjectColumn(
    workspaceSlug: string,
    projectSlug: string,
    columnId: number,
) {
    const response = await apiClient.delete<ApiResponse<null>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/columns/${columnId}`,
    );

    return response.data;
}