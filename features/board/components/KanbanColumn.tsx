"use client";

import { Plus } from "lucide-react";

import TaskCard from "./TaskCard";

interface KanbanColumnProps {
    column: string;
    color: string;
    background: string;
    tasks: any[];
    draggingId: string | null;
    dragOver: boolean;
    style: {
        text: string;
        bg: string;
        border: string;
        ring: string;
        hoverBorder: string;
    };
    onDrop: () => void;
    onDragOver: () => void;
    onDragLeave: () => void;
    setDraggingId: (id: string) => void;
    clearDrag: () => void;
}

export default function KanbanColumn({
    column,
    color,
    background,
    tasks,
    draggingId,
    dragOver,
    style,
    onDrop,
    onDragOver,
    onDragLeave,
    setDraggingId,
    clearDrag,
}: KanbanColumnProps) {

    return (
        <div
            className={`flex flex-col w-full rounded-xl border border-border ${background} transition-colors ${dragOver ? `${style.border} ring-1 ${style.ring}` : ""}`}
            onDragOver={(e) => {
                e.preventDefault();
                onDragOver();
            }}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-card rounded-t-xl">
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-current ${color}`} />
                    <span className={`text-sm font-semibold ${color}`}>
                        {column}
                    </span>
                    <span className="rounded-full bg-muted px-2 text-sm">
                        {tasks.length}
                    </span>
                </div>

                <button className="cursor-pointer">
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex-1 space-y-2 p-2 overflow-y-auto">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        style={style}
                        dragging={draggingId === task.id}
                        onDragStart={() => setDraggingId(task.id)}
                        onDragEnd={clearDrag}
                    />
                ))}

                {tasks.length === 0 && (
                    <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
                        Drop tasks here
                    </div>
                )}

            </div>

            <div className="border-t border-border p-1 bg-card  rounded-b-xl">
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-pointer">
                    <Plus size={14} />
                    Add task
                </button>
            </div>
        </div>
    );
}