export type WorkspaceRole =
    | "owner"
    | "admin"
    | "member"
    | "viewer";

export interface WorkspaceOwner {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Workspace {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    color: string;
    owner: WorkspaceOwner;
    current_user_role: WorkspaceRole;
    project_count: number;
    members_count: number;
    created_at: string;
    updated_at: string;
}

export interface WorkspacePagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface WorkspaceListResponse {
    success: boolean;
    message: string;
    data: Workspace[];
    meta: {
        pagination: WorkspacePagination;
    };
}

export interface CreateWorkspacePayload {
    name: string;
    description?: string;
    color: string;
}

export interface WorkspaceResponse {
    success: boolean;
    message: string;
    data: Workspace;
}

export interface WorkspaceInviteFormData {
    email: string;
    role: string;
}

export interface WorkspaceFormData {
    name: string;
    description: string;
    color: string;
    invites: WorkspaceInviteFormData[];
}

export interface WorkspaceDetailResponse {
    success: boolean;
    message: string;
    data: Workspace;
}