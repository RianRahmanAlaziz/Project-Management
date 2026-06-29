"use client";

import { KANBAN_COLUMNS } from "@/data/data";
import KanbanColumn from "./KanbanColumn";

const colColors: Record<string, string> = {
    Backlog: "text-muted-foreground",
    Todo: "text-blue-500",
    "In Progress": "text-warning",
    Review: "text-purple-500",
    Done: "text-success",
};

const colBg: Record<string, string> = {
    Backlog: "bg-muted/40",
    Todo: "bg-blue-500/5",
    "In Progress": "bg-amber-500/5",
    Review: "bg-purple-500/5",
    Done: "bg-green-500/5",
};

const COLUMN_STYLES = {
    Backlog: {
        text: "text-muted-foreground",
        bg: "bg-muted/40",
        border: "border-border",
        ring: "ring-ring",
        hoverBorder: "hover:ring-ring",
    },
    Todo: {
        text: "text-blue-500",
        bg: "bg-blue-500/5",
        border: "border-blue-500",
        ring: "ring-blue-500",
        hoverBorder: "hover:border-blue-500",
    },
    "In Progress": {
        text: "text-amber-500",
        bg: "bg-amber-500/5",
        border: "border-amber-500",
        ring: "ring-amber-500",
        hoverBorder: "hover:border-amber-500",
    },
    Review: {
        text: "text-purple-500",
        bg: "bg-purple-500/5",
        border: "border-purple-500",
        ring: "ring-purple-500",
        hoverBorder: "hover:border-purple-500",
    },
    Done: {
        text: "text-emerald-500",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500",
        ring: "ring-emerald-500",
        hoverBorder: "hover:border-emerald-500",
    },
} as const;

interface KanbanBoardProps {
    tasks: any[];
    draggingId: string | null;
    dragOverCol: string | null;

    setDraggingId: (id: string | null) => void;
    setDragOverCol: (col: string | null) => void;

    onDrop: (column: string) => void;
}

export default function KanbanBoard({
    tasks,
    draggingId,
    dragOverCol,
    setDraggingId,
    setDragOverCol,
    onDrop,
}: KanbanBoardProps) {
    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 p-4 ">
                {
                    KANBAN_COLUMNS.map((column) => (
                        <KanbanColumn
                            key={column}
                            column={column}
                            color={colColors[column]}
                            background={colBg[column]}
                            tasks={tasks.filter((t) => t.column === column)}
                            draggingId={draggingId}
                            dragOver={dragOverCol === column}
                            onDrop={() => onDrop(column)}
                            onDragOver={() => setDragOverCol(column)}
                            onDragLeave={() => setDragOverCol(null)}
                            setDraggingId={setDraggingId}
                            style={COLUMN_STYLES[column]}
                            clearDrag={() => {
                                setDraggingId(null);
                                setDragOverCol(null);
                            }}
                        />
                    ))
                }
            </div >
        </div >
    );
}