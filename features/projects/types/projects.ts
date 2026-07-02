export interface Projects {
    id: number;
    workspace_id: number;
    slug: string;
    name: string;
    color: string;
    status: string;
    priority: string;
    progress: number;
    due_date: string;
    member_id: number[];
    total_tasks: number;
}