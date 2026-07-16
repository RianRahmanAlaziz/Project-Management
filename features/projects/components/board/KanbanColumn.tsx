import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
    TaskCard
} from "@/features/tasks/components";
import type { Tasks } from "@/features/tasks/types/tasks";

interface KanbanColumnProps {
    column: string;
    color: string;
    background: string;
    tasks: Tasks[];
    style: {
        text: string;
        bg: string;
        border: string;
        ring: string;
        hoverBorder: string;
    };
    onCreateTask: (column: string) => void;
    onOpenTask: (taskId: number) => void;
}

export default function KanbanColumn({
    column,
    color,
    background,
    tasks,
    style,
    onCreateTask,
    onOpenTask,
}: KanbanColumnProps) {

    const { setNodeRef, isOver, } = useDroppable({
        id: column,
        data: {
            type: "column",
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col w-full rounded-xl border border-border ${background} transition-colors ${isOver ? `${style.border} ring-1 ${style.ring}` : ""}`}
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

                <button
                    onClick={() => onCreateTask(column)}
                    className="cursor-pointer">
                    <Plus size={18} />
                </button>
            </div>

            <div
                className="flex-1 overflow-y-auto p-2"
            >
                <SortableContext
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                style={style}
                                onClick={() => onOpenTask(task.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>

            <div className="border-t border-border p-1 bg-card  rounded-b-xl">
                <button
                    onClick={() => onCreateTask(column)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-pointer">
                    <Plus size={14} />
                    Add task
                </button>
            </div>
        </div>
    );
}