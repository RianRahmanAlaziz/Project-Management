import type {
    WorkspaceRole,
} from "@/features/workspaces/types/workspace";

export interface Members {
    id: number | string;
    name: string;
    email: string;
    role: string;
}

export interface WorkspaceMemberUser {
    id: number;
    name: string;
    email: string;
}

export interface WorkspaceMember {
    id: number;
    user: WorkspaceMemberUser;
    role: WorkspaceRole;
    joined_at: string | null;
}

export interface WorkspaceMemberPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface WorkspaceMemberListResponse {
    success: boolean;
    message: string;
    data: WorkspaceMember[];
    meta: {
        pagination: WorkspaceMemberPagination;
    };
}

export type WorkspaceMemberAssignableRole =
    | "member"
    | "viewer";

export interface AvailableUser {
    id: number;
    name: string;
    email: string;
}

export interface AddWorkspaceMemberPayload {
    user_id: number;
    role: WorkspaceMemberAssignableRole;
}

export interface AvailableUsersResponse {
    success: boolean;
    message: string;
    data: AvailableUser[];
}

export interface UpdateWorkspaceMemberRolePayload {
    role: WorkspaceMemberAssignableRole;
}