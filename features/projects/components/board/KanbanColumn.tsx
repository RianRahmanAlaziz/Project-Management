"use client";

import { Plus } from "lucide-react";
import {
    useDroppable,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
    TaskCard,
} from "@/features/tasks/components";

import type { Tasks } from "@/features/tasks/types/tasks";
import { WorkflowColumn } from "../../types/workflow";

interface KanbanColumnProps {
    column: WorkflowColumn;
    tasks: Tasks[];
    onCreateTask: (columnId: number) => void;
    onOpenTask: (task: Tasks) => void;
}

export default function KanbanColumn({
    column,
    tasks,
    onCreateTask,
    onOpenTask,
}: KanbanColumnProps) {
    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: `column-${column.id}`,

        data: {
            type: "column",
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={[
                "flex min-h-125 w-full flex-col rounded-xl border border-border",
                "bg-card transition-colors",
                isOver &&
                "ring-1 ring-primary",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-xl border-b border-border bg-card px-3 py-3">
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${column.color}`}
                    />

                    <span className={`text-sm font-semibold text-foreground`}>
                        {column.name}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        onCreateTask(column.id)
                    }
                    className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Plus size={18} />
                </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 overflow-y-auto p-2">
                <SortableContext
                    items={tasks.map(
                        (task) => task.id,
                    )}
                    strategy={
                        verticalListSortingStrategy
                    }
                >
                    <div className="space-y-2">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onClick={() =>
                                    onOpenTask(
                                        task,
                                    )
                                }
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}