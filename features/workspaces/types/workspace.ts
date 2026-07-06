export interface Workspace {
    id: number;
    owner_id: number;
    slug: string;
    name: string;
    initials: string;
    description: string;
    color: string;
    member_id: number[];
    members_count: number;
    projects_count: number;
    created_at: string;
}