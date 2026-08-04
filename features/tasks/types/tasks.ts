export interface Tasks {
    id: number;
    project_id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    start_date: string;
    due_date: string;
    assignee: {
        id: number;
        name: string;
    };
}

export interface TasksPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface TasksListResponse {
    success: boolean;
    message: string;
    data: Tasks[];
    meta: {
        pagination: TasksPagination;
    };
}