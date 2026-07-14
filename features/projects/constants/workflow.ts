import type { WorkflowColumn } from "../types/workflow";

export const DEFAULT_WORKFLOW_COLUMNS: WorkflowColumn[] = [
    {
        id: "todo",
        name: "Todo",
        enabled: true,
    },
    {
        id: "in-progress",
        name: "In Progress",
        enabled: true,
    },
    {
        id: "review",
        name: "Review",
        enabled: true,
    },
    {
        id: "done",
        name: "Done",
        enabled: true,
    },
];