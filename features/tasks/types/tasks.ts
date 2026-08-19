export interface Tasks {
    id: number;
    project_id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    start_date: string;
    due_date: string;
    completed_at: boolean;
    workspace: {
        id: number;
        name: string;
        slug: string;
    };
    project: {
        id: number;
        name: string;
        slug: string;
        color: string;
    };
    column: {
        id: number;
        name: string;
        description: string;
        position: number;
        color?: string;
        is_completed: boolean;
    };
    assignee?: {
        id: number | string;
        name: string;
        email: string;
        role: string;
    } | null;
}

export interface Task {
    id?: number;
    title: string;
    description?: string;
    projectId?: string;
    columnId?: string;
    priority?: string;
    assigneeId?: string;
    labels?: string[];
    startDate?: string;
    dueDate?: string;
    estimateHours?: number;
}

export interface MyTasks {
    id: number;
    title: string;
    description: string;
    priority: string;
    position: number;
    start_date: string;
    due_date: string;
    completed_at: boolean;
    workspace: {
        id: number;
        name: string;
        slug: string;
    };
    project: {
        id: number;
        name: string;
        slug: string;
        color: string;
    };
    column: {
        id: number;
        name: string;
        description?: string;
        color?: string;
        position: number;
        is_completed: boolean;
    };
    creator: {
        id: number;
        name: string;
    };
}

export interface TaskDrawer {
    id: number;
    title: string;
    description: string;
    priority: string;
    due_date: string | null;
    column: {
        id: number;
        name: string;
        description?: string;
        color?: string;
        position?: number;
    };
    assignee?: {
        id: number | string;
        name: string;
        email: string;
        role: string;
    } | null;
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

export interface MyTasksResponse {
    success: boolean;
    message: string;
    data: MyTasks[];
    meta: {
        pagination: TasksPagination;
    };
}

export interface CreateTaskForm {
    title: string;
    description: string;
    columnId: string;
    priority: string;
    assigneeId: string;
    startDate: string;
    dueDate: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    column_id: number;
    priority?: string;
    assignee_id?: number | null;
    start_date?: string | null;
    due_date?: string | null;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    column_id?: number;
    priority?: string;
    assignee_id?: number | null;
    start_date?: string | null;
    due_date?: string | null;
}