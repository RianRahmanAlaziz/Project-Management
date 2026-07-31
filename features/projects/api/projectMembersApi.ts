import { apiClient } from "@/lib/api/apiClient";
import type {
    AddProjectMemberPayload,
} from "../types/projectMembers";
import { ApiResponse } from "@/lib/api/apiResponse";


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