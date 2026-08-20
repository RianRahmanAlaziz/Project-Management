export interface WorkflowColumn {
    id: number;
    project_id: number;
    name: string;
    description: string;
    color: string;
    position: number;
    enabled: boolean;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateWorkflowColumnPayload {
    name: string;
    description: string;
    color: string;
    is_completed: boolean;
}

export interface UpdateProjectColumnData {
    name?: string;
    description?: string;
    color?: string;
    enabled?: boolean;
    is_completed?: boolean;
}