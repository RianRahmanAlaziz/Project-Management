export const KANBAN_COLUMNS = [
    "Backlog",
    "Todo",
    "In Progress",
    "Review",
    "Done",
] as const;
export type KanbanColumn = typeof KANBAN_COLUMNS[number];