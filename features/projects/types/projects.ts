export type ProjectStatus =
    | "planning"
    | "in_progress"
    | "review"
    | "done";

export type ProjectPriority =
    | "Low"
    | "Medium"
    | "High";

export interface Projects {
    id: number;
    workspace_id: number;
    name: string;
    description: string;
    slug: string;
    status: string;
    priority: string;
    progress: number;
    color: string;
    member_count: number;
    tasks_count: number;
    start_date: string;
    due_date: string;
}

export interface DetailProject {
    id: number;
    workspace_id: number;
    workspace: {
        id: number;
        name: string;
        slug: string;
        description: string;
        color: string;
    };
    name: string;
    description: string;
    slug: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    progress: number;
    color: string;
    member_count: number;
    members: {
        id: number;
        name: string;
        email: string;
        role: string;
        joined_at: string | null;
    }[];
    tasks_count: number;
    start_date: string;
    due_date: string;
}


export interface ProjectsPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface ProjectsListResponse {
    success: boolean;
    message: string;
    data: Projects[];
    meta: {
        pagination: ProjectsPagination;
    };
}

export interface CreateProjectForm {
    name: string;
    description: string;
    color: string;
    priority: string;
    status: string;
    start_date: string;
    due_date: string;
    members: string[];
}

export interface CreateProjectPayload {
    name: string;
    description: string;
    color: string;
    priority: string;
    status: string;
    start_date: string;
    due_date: string;
}