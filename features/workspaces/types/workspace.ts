export interface Workspace {
    id: string | number;
    name: string;
    slug: string;
    initials: string;
    description: string;
    color: string;
    members: number;
    projects: number;
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