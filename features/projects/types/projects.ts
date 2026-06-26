export interface Projects {
    id: string;
    slug: string;
    name: string;
    color: string;
    status: string;
    priority: string;
    progress: number;
    tasks: number;
    dueDate: string;
    members: string[];
}