export interface ProjectMemberUser {
    id: number;
    name: string;
    email: string;
}
export interface ProjectMember {
    id: number;
    project_id: number;
    user_id: number;
    user: ProjectMemberUser;
    role: string;
    joined_at: string | null;
    created_at: string;
    updated_at: string;
}
export interface ProjectMembersPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}
export interface ProjectMembersResponse {
    success: boolean;
    message: string;
    data: ProjectMember[];
    meta: {
        pagination: ProjectMembersPagination;
    };
}
export interface AddProjectMemberPayload {
    user_id: number;
    role: "member";
}