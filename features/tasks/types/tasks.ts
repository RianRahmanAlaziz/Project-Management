export interface Tasks {
    id: number;
    project_id: number;
    title: string;
    status: string;
    priority: string;
    assignee_id: number
    due_date: string;
    labels: string[];
    attachments_count: number;
    comments_count: number;
}