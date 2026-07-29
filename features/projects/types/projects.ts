export interface Projects {
    id: number;
    workspace_id: number;
    name: string;
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