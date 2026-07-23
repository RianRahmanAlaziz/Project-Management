import { apiClient } from "@/lib/api/apiClient";

import type {
    AddWorkspaceMemberPayload,
    AvailableUsersResponse,
    UpdateWorkspaceMemberRolePayload,
    WorkspaceMemberListResponse,
} from "../types/workspaceMember";

// GET MEMBERS
export async function getWorkspaceMembers(
    workspaceSlug: string,
): Promise<WorkspaceMemberListResponse> {
    const response = await apiClient.get<WorkspaceMemberListResponse>(
        `/workspaces/${workspaceSlug}/members`,
    );

    return response.data;
}

// GET AVAILABLE MEMBERS
export async function getAvailableMembers(
    workspaceSlug: string,
): Promise<AvailableUsersResponse> {
    const response = await apiClient.get<AvailableUsersResponse>(
        `/workspaces/${workspaceSlug}/members/available`,
    );

    return response.data;
}

// ADD MEMBER
export async function addWorkspaceMember(
    workspaceSlug: string,
    payload: AddWorkspaceMemberPayload,
): Promise<void> {
    await apiClient.post(
        `/workspaces/${workspaceSlug}/members`,
        payload,
    );
}

// UPDATE MEMBER ROLE
export async function updateWorkspaceMemberRole(
    workspaceSlug: string,
    memberId: number,
    payload: UpdateWorkspaceMemberRolePayload,
): Promise<void> {
    await apiClient.patch(
        `/workspaces/${workspaceSlug}/members/${memberId}`,
        payload,
    );
}

export async function removeWorkspaceMember(
    workspaceSlug: string,
    memberId: number,
): Promise<void> {
    await apiClient.delete(
        `/workspaces/${workspaceSlug}/members/${memberId}`,
    );
}