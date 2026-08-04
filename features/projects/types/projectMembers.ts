export interface ProjectMember {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string | null;
}
export interface AddProjectMemberPayload {
    user_id: number;
    role: "member";
}