import { apiClient } from "@/lib/api/apiClient";
import type {
    AddProjectMemberPayload,
    ProjectMembersResponse,
} from "../types/projectMembers";
import { ApiResponse } from "@/lib/api/apiResponse";

export async function getProjectMembers(
    workspaceSlug: string,
    projectSlug: string,
): Promise<ProjectMembersResponse> {
    const response =
        await apiClient.get<ProjectMembersResponse>(
            `/workspaces/${workspaceSlug}/projects/${projectSlug}/members`,
        );

    return response.data;
}

export async function addProjectMember(
    workspaceSlug: string,
    projectSlug: string,
    payload: AddProjectMemberPayload,
): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>(
        `/workspaces/${workspaceSlug}/projects/${projectSlug}/members`,
        payload,
    );

    return response.data;
}