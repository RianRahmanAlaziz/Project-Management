export interface Workspace {
    id: string | number;
    name: string;
    slug: string;
    initials: string;
    description: string;
    color: string;
    members_count: number;
    projects_count: number;
}

export interface WorkspaceMember {
    id: string | number;
    name: string;
    email: string;
    role: string;
}

export interface WorkspaceActivity {
    id: string | number;
    user: string;
    action: string;
    target: string;
    time: string;
}