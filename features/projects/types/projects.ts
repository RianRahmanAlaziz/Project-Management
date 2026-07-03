export interface Projects {
    id: number;
    workspace_id: number;
    slug: string;
    name: string;
    initials: string;
    description: string;
    color: string;
    status: string;
    priority: string;
    progress: number;
    due_date: string;
    start_date: string;
    member_id: number[];
    total_tasks: number;
}